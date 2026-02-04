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
    console.log('[photo.js] Fetching from Google Maps Photo API...');
    
    const response = await fetch(photoUrl);

    console.log('[photo.js] Google response status:', response.status);

    if (!response.ok) {
      console.log('[photo.js] ERROR: Google returned', response.status);
      return res.status(response.status).json({ error: `Google API returned ${response.status}` });
    }

    // Set appropriate headers for image
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    console.log('[photo.js] SUCCESS: Serving photo with type:', contentType);
    
    // Pipe the image response
    response.body.pipe(res);
  } catch (error) {
    console.error('[photo.js] ERROR:', error.message);
    res.status(500).json({ error: 'Failed to fetch photo', message: error.message });
  }
}
