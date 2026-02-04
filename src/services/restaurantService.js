/**
 * Restaurant Service
 * Handles search and fetching of restaurants from Google Places API
 */

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * Search for pizza restaurants near a location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in meters (default 5000)
 * @returns {Promise<Array>} Array of restaurant data
 */
export const searchRestaurants = async (lat, lng, radius = 5000) => {
  if (!API_KEY) {
    throw new Error('Google Maps API key not configured');
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
      throw new Error(`API Error: ${data.status}`);
    }

    // Transform results to our format
    const restaurants = (data.results || []).map((place, index) => ({
      id: place.place_id,
      placeId: place.place_id,
      number: index + 1, // Numbered marker (1, 2, 3, etc.)
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

    return restaurants;
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw error;
  }
};

/**
 * Get photo URL from photo reference
 * @param {string} photoReference - Photo reference from Google Places
 * @param {number} maxWidth - Maximum width (default 400)
 * @returns {string} Photo URL
 */
export const getPhotoUrl = (photoReference, maxWidth = 400) => {
  if (!API_KEY || !photoReference) {
    return null;
  }

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`;
};
