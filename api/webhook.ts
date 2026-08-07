import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export const config = {
  api: {
    bodyParser: false, // Disable body parser to get raw body for Stripe signature verification
  },
};

async function getRawBody(readable: any): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing stripe-signature or webhook secret' });
  }

  let event: any;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (error: any) {
    console.error('Error verifying Stripe webhook signature:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const stripeCheckoutId = session.id;
    const metadata = session.metadata || {};

    // Reconstruct payload for n8n
    const n8nPayload = {
      // Step 1
      businessType: metadata.businessType,
      leadSource: metadata.leadSource,
      adSpend: metadata.adSpend === 'null' ? null : metadata.adSpend,
      exactAdSpend: metadata.exactAdSpend && metadata.exactAdSpend !== 'null' ? parseInt(metadata.exactAdSpend, 10) : null,
      // Step 3 (Seasonality)
      isSeasonal: metadata.isSeasonal || null,
      seasonStatus: metadata.seasonStatus || null,
      // Step 2
      monthlyLeads: parseInt(metadata.monthlyLeads || '0', 10),
      callsBooked: parseInt(metadata.callsBooked || '0', 10),
      callsCompleted: parseInt(metadata.callsCompleted || '0', 10),
      customersClosed: parseInt(metadata.customersClosed || '0', 10),
      // Step 3
      dealSize: parseInt(metadata.dealSize || '0', 10),
      profitMargin: metadata.profitMargin,
      salesCycle: metadata.salesCycle,
      totalRevenue: metadata.totalRevenue && metadata.totalRevenue !== 'null' ? parseInt(metadata.totalRevenue, 10) : null,
      // Step 4
      responseTime: metadata.responseTime,
      trackingQuality: metadata.trackingQuality,
      followUpSystem: metadata.followUpSystem,
      email: metadata.email,
      // Meta
      submittedAt: metadata.submittedAt || new Date().toISOString(),
      isCustomRequest: metadata.isCustomRequest === 'true',
      // Stripe ID reference
      stripe_checkout_id: stripeCheckoutId,
    };

    const n8nWebhookUrl = process.env.VITE_N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.error('VITE_N8N_WEBHOOK_URL environment variable is missing.');
      return res.status(500).json({ error: 'N8N webhook endpoint is not configured.' });
    }

    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(n8nPayload),
      });

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        throw new Error(`n8n webhook responded with status ${n8nResponse.status}: ${errorText}`);
      }

      console.log(`Successfully triggered n8n workflow for checkout session: ${stripeCheckoutId}`);
    } catch (n8nError: any) {
      console.error('Error triggering n8n webhook:', n8nError);
      return res.status(500).json({ error: 'Failed to process report generation', details: n8nError.message });
    }
  }

  return res.status(200).json({ received: true });
}
