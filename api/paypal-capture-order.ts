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

  const { orderId, payload } = req.body;

  if (!orderId || !payload) {
    return res.status(400).json({ error: 'Missing orderId or payload' });
  }

  try {
    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.VITE_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'PayPal credentials are not configured on the server.' });
    }

    // 1. Get Access Token
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch(`${apiUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      throw new Error(`Failed to get PayPal token: ${errText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Capture PayPal Order
    const captureResponse = await fetch(`${apiUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureResponse.ok) {
      const errText = await captureResponse.text();
      throw new Error(`Failed to capture order: ${errText}`);
    }

    const captureData = await captureResponse.json();

    if (captureData.status !== 'COMPLETED') {
      return res.status(400).json({ error: `PayPal order not completed. Status: ${captureData.status}` });
    }

    // 3. Trigger the n8n webhook (similar to Stripe webhook)
    const n8nWebhookUrl = process.env.VITE_N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      console.error('VITE_N8N_WEBHOOK_URL environment variable is missing.');
      return res.status(500).json({ error: 'N8N webhook endpoint is not configured.' });
    }

    // Add PayPal order ID as the reference id (n8n expects stripe_checkout_id to match)
    const n8nPayload = {
      ...payload,
      stripe_checkout_id: orderId, // use PayPal order ID as stripe_checkout_id
    };

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      throw new Error(`n8n webhook responded with status ${n8nResponse.status}: ${errorText}`);
    }

    console.log(`Successfully triggered n8n workflow for PayPal order: ${orderId}`);
    return res.status(200).json({ success: true, orderId });
  } catch (error: any) {
    console.error('Error capturing PayPal order:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
