import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  const payload = req.body;

  if (!payload || !payload.email) {
    return res.status(400).json({ error: 'Missing required payload fields or customer email' });
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return res.status(500).json({ error: 'STRIPE_PRICE_ID is not configured on the server.' });
    }

    // Map all payload properties to Stripe metadata as strings
    const metadata: Record<string, string> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value !== null && value !== undefined) {
        metadata[key] = String(value);
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: payload.email,
      metadata,
      success_url: `${siteUrl}/diagnostic?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/diagnostic`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating Stripe session:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
