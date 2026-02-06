export default async function handler(req, res) {
  // Accept both GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get params from query or body
  const params = req.method === 'GET' ? req.query : req.body;
  const { lat, lng, radius = 5000, query = 'restaurants' } = params;

  // Validate parameters
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Using Nearby Search API with dynamic keyword
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    
    const queryParams = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: radius,
      type: 'restaurant',
      keyword: query,
      key: API_KEY,
    });

    console.log('[search.js] Calling Maps API Nearby Search...');

    const response = await fetch(`${url}?${queryParams}`);
    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      console.error('[search.js] API Error:', data.status, data);
      return res.status(400).json({ error: `API Error: ${data.status}` });
    }

    // Transform results
    const restaurants = (data.results || []).map((place, index) => {
      const photos = place.photos || [];
      const photoRef = photos[0]?.photo_reference;
      
      console.log(`[search.js] Restaurant: ${place.name}, Photos: ${photos.length}, Ref: ${photoRef ? 'YES' : 'NO'}`);
      
      return {
        id: place.place_id,
        placeId: place.place_id,
        number: index + 1,
        name: place.name || 'Unknown',
        lat: place.geometry?.location?.lat || 0,
        lng: place.geometry?.location?.lng || 0,
        address: place.vicinity || 'Address not available',
        rating: place.rating || 0,
        reviews: place.user_ratings_total || 0,
        isOpen: place.opening_hours?.open_now,
        photo: photoRef, // Photo reference for old API
        photos: photos,
        types: place.types || [],
      };
    });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('[search.js] Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
