import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

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

  const { session_id } = req.query;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    // Query client_reports by stripe_checkout_id to retrieve the generated token
    const { data, error } = await supabase
      .from('client_reports')
      .select('token')
      .eq('stripe_checkout_id', session_id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data && data.token) {
      return res.status(200).json({ status: 'completed', token: data.token });
    }

    return res.status(200).json({ status: 'pending' });
  } catch (error: any) {
    console.error('Error checking checkout session:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
