export default async function handler(req, res) {
  // Only allow POST for new API
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 5000 } = req.body;

  // Validate parameters
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = 'https://places.googleapis.com/v1/places:searchNearby';
    
    const payload = {
      location: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      },
      radius: parseInt(radius),
      includedTypes: ['restaurant'],
      textQuery: 'pizza',
      maxResultCount: 20,
      languageCode: 'en-US',
    };

    console.log('[search.js] Calling Places API v1...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[search.js] API Error:', data);
      return res.status(response.status).json({ error: `API Error: ${data.error?.message || 'Unknown error'}` });
    }

    // Transform results
    const restaurants = (data.places || []).map((place, index) => {
      const photos = place.photos || [];
      const photoRef = photos[0]?.name; // New API uses 'name' instead of 'photo_reference'
      
      console.log(`[search.js] Restaurant: ${place.displayName?.text}, Photos: ${photos.length}, Has photo: ${!!photoRef}`);
      
      return {
        id: place.name, // Use the place ID from new API
        placeId: place.name,
        number: index + 1,
        name: place.displayName?.text || 'Unknown',
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0,
        address: place.formattedAddress || 'Address not available',
        rating: place.rating || 0,
        reviews: place.userRatingCount || 0,
        isOpen: place.businessStatus === 'OPERATIONAL',
        photo: photoRef, // Photo URI for new API
        photos: photos,
        photoUrls: photos.map(p => p.name), // Store photo URIs
        types: place.types || [],
      };
    });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('[search.js] Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
