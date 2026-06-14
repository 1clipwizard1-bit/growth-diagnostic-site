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

  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token is required and must be a string' });
  }

  // Increment view counter if NOT requested by PDFShift (avoids double counting)
  const isPDFShift = req.query.source === 'pdfshift';
  if (!isPDFShift) {
    try {
      await supabase.rpc('increment_report_views', { report_token: token });
    } catch (rpcErr) {
      console.error('Error calling increment_report_views RPC:', rpcErr);
    }
  }

  try {
    const { data, error } = await supabase
      .from('client_reports')
      .select('report_data')
      .eq('token', token)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = data.report_data;

    // If html format requested, return the raw HTML string
    if (req.query.format === 'html' || req.query.html === 'true') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(report.html);
    }

    return res.status(200).json(report);
  } catch (error: any) {
    console.error('Error fetching report:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
