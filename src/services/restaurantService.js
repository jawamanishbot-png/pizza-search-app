/**
 * Restaurant Service
 * Handles search and fetching of restaurants via backend API
 */

/**
 * Search for pizza restaurants near a location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in meters (default 5000)
 * @returns {Promise<Array>} Array of restaurant data
 */
export const searchRestaurants = async (lat, lng, radius = 5000) => {
  try {
    const params = new URLSearchParams({
      lat,
      lng,
      radius,
    });

    const response = await fetch(`/api/search?${params}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch restaurants');
    }

    const restaurants = await response.json();
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
