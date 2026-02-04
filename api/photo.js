export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, maxWidth = 400 } = req.query;

  if (!reference) {
    return res.status(400).json({ error: 'Missing photo reference' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Old Maps API photo endpoint
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${reference}&key=${API_KEY}`;
    
    const response = await fetch(photoUrl, {
      redirect: 'follow',  // Automatically follow redirects
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[photo.js] Google API error: ${response.status} - ${text.substring(0, 100)}`);
      // Return error but don't set content-type as JSON
      return res.status(response.status).send(text);
    }

    // Get the content type from Google's response
    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();
    
    // Set response headers
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send the image buffer
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('[photo.js] Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch photo', message: error.message });
  }
}
