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

  const fileName = `reports/${token}.pdf`;
  const bucketName = 'client-reports';

  try {
    // 1. Try to download the cached PDF from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(bucketName)
      .download(fileName);

    if (fileData) {
      // PDF is cached! Stream it to the client
      const fileBuffer = Buffer.from(await fileData.arrayBuffer());
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="report-${token}.pdf"`);
      return res.send(fileBuffer);
    }

    // 2. Not cached. Check if the token is valid in the database before calling PDFShift
    const { data: reportExists, error: dbError } = await supabase
      .from('client_reports')
      .select('token')
      .eq('token', token)
      .single();

    if (dbError || !reportExists) {
      return res.status(404).json({ error: 'Report data not found in DB.' });
    }

    // 3. Call PDFShift API to generate the PDF
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const reportUrl = `${siteUrl}/api/report?token=${token}&html=true`;
    const pdfShiftKey = process.env.PDFSHIFT_API_KEY;

    if (!pdfShiftKey) {
      return res.status(500).json({ error: 'PDFSHIFT_API_KEY is not configured on the server.' });
    }

    const pdfShiftResponse = await fetch('https://api.pdfshift.co/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('api:' + pdfShiftKey).toString('base64'),
      },
      body: JSON.stringify({
        source: reportUrl,
        sandbox: false,
      }),
    });

    if (!pdfShiftResponse.ok) {
      const errorText = await pdfShiftResponse.text();
      throw new Error(`PDFShift error (${pdfShiftResponse.status}): ${errorText}`);
    }

    const pdfBuffer = Buffer.from(await pdfShiftResponse.arrayBuffer());

    // 4. Save the zippy PDF to Supabase Storage for future requests
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.warn('Could not cache PDF to Supabase Storage. (Ensure "client-reports" bucket exists):', uploadError);
    } else {
      // 5. Update database flag to pdf_generated = true
      await supabase
        .from('client_reports')
        .update({ pdf_generated: true })
        .eq('token', token);
    }

    // 6. Return the freshly baked PDF to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${token}.pdf"`);
    return res.send(pdfBuffer);

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
