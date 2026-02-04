export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, maxWidth = 400 } = req.query;

  // Validate parameters
  if (!reference) {
    return res.status(400).json({ error: 'Missing photo reference' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${reference}&key=${API_KEY}`;
    
    const response = await fetch(photoUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch photo' });
    }

    // Set appropriate headers for image
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Pipe the image response
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
}
