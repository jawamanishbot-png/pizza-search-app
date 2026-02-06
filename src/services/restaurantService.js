/**
 * Restaurant Service
 * Handles search and fetching of restaurants via backend API
 */

/**
 * Search for restaurants near a location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} query - Search query (restaurant type, name, cuisine)
 * @param {number} radius - Search radius in meters (default 5000)
 * @returns {Promise<Array>} Array of restaurant data
 */
export const searchRestaurants = async (lat, lng, query = 'restaurants', radius = 5000) => {
  try {
    const params = new URLSearchParams({
      lat,
      lng,
      query,
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
