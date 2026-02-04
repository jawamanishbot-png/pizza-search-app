export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 5000 } = req.query;

  // Validate parameters
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    
    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: radius,
      type: 'restaurant',
      keyword: 'pizza',
      key: API_KEY,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      return res.status(400).json({ error: `API Error: ${data.status}` });
    }

    // Transform results
    const restaurants = (data.results || []).map((place, index) => ({
      id: place.place_id,
      placeId: place.place_id,
      number: index + 1,
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      address: place.vicinity || 'Address not available',
      rating: place.rating || 0,
      reviews: place.user_ratings_total || 0,
      isOpen: place.opening_hours?.open_now,
      photo: place.photos?.[0]?.photo_reference,
      types: place.types || [],
    }));

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
