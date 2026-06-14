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

  // Handle both POST (from sendBeacon) and GET/PUT query parameters
  const token = req.query.token || req.body?.token;
  const seconds = parseInt(req.query.seconds || req.body?.seconds || '0', 10);

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token is required' });
  }

  if (isNaN(seconds) || seconds <= 0) {
    return res.status(200).json({ status: 'ignored' });
  }

  try {
    const { error } = await supabase.rpc('track_report_time', {
      report_token: token,
      seconds_spent: seconds
    });

    if (error) {
      throw error;
    }

    return res.status(200).json({ status: 'success' });
  } catch (error: any) {
    console.error('Error tracking time:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
