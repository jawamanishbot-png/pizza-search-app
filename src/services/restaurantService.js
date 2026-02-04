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
    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat,
        lng,
        radius,
      }),
    });
    
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
