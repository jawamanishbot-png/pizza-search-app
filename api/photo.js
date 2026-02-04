export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    console.log('[photo.js] Non-GET request');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, maxWidth = 400 } = req.query;

  console.log('[photo.js] Photo request - Reference:', reference ? 'provided' : 'MISSING');

  // Validate parameters
  if (!reference) {
    console.log('[photo.js] ERROR: Missing photo reference');
    return res.status(400).json({ error: 'Missing photo reference' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    console.log('[photo.js] ERROR: API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Old Maps API photo endpoint
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${reference}&key=${API_KEY}`;
    console.log(`[photo.js] Reference length: ${reference.length}, First 30 chars: ${reference.substring(0, 30)}`);
    console.log('[photo.js] Fetching from Google Maps Photo API...');
    
    const response = await fetch(photoUrl);

    console.log('[photo.js] Google response status:', response.status);
    console.log('[photo.js] Response headers:', {
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length'),
      location: response.headers.get('location'),
    });

    // Handle redirects (Google often redirects photo requests)
    if (response.status === 301 || response.status === 302) {
      const redirectUrl = response.headers.get('location');
      console.log('[photo.js] Following redirect to:', redirectUrl?.substring(0, 50) + '...');
      const redirectResponse = await fetch(redirectUrl);
      
      if (!redirectResponse.ok) {
        console.error('[photo.js] Redirect response failed:', redirectResponse.status);
        return res.status(500).json({ error: 'Photo redirect failed' });
      }

      const contentType = redirectResponse.headers.get('content-type');
      res.setHeader('Content-Type', contentType || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      console.log('[photo.js] SUCCESS (redirect): Serving photo');
      return redirectResponse.body.pipe(res);
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('[photo.js] ERROR: Google returned', response.status);
      console.error('[photo.js] Response body:', text.substring(0, 200));
      return res.status(500).json({ error: `Google API returned ${response.status}` });
    }

    // Set appropriate headers for image
    const contentType = response.headers.get('content-type');
    console.log('[photo.js] Content-Type:', contentType);
    
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    console.log('[photo.js] SUCCESS: Serving photo');
    
    // Pipe the image response
    response.body.pipe(res);
  } catch (error) {
    console.error('[photo.js] CATCH ERROR:', error.message);
    console.error('[photo.js] Stack:', error.stack);
    return res.status(500).json({ error: 'Failed to fetch photo', message: error.message });
  }
}
