export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    console.log('[photo.js] Non-GET request');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { uri, maxWidth = 400 } = req.query;

  console.log('[photo.js] Photo request - URI:', uri ? 'provided' : 'MISSING');

  // Validate parameters
  if (!uri) {
    console.log('[photo.js] ERROR: Missing photo URI');
    return res.status(400).json({ error: 'Missing photo URI' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    console.log('[photo.js] ERROR: API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // New Places API v1 uses media endpoint with photo URI
    const photoUrl = `https://places.googleapis.com/v1/${decodeURIComponent(uri)}/media?key=${API_KEY}&max_height_px=${maxWidth}`;
    console.log('[photo.js] Fetching from Google Places Media API...');
    
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
