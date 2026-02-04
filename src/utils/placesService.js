/**
 * Google Places API Service
 * Handles all restaurant searches and place details
 */

/**
 * Search for pizza restaurants near a location
 */
export async function searchRestaurants(center, radius = 5000, filters = {}) {
  if (!window.google || !window.google.maps) {
    throw new Error('Google Maps API not loaded');
  }

  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );

  return new Promise((resolve, reject) => {
    const request = {
      location: new window.google.maps.LatLng(center.lat, center.lng),
      radius: radius,
      type: 'restaurant',
      keyword: 'pizza',
    };

    // Add filters
    if (filters.openNow) {
      request.openNow = true;
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results || []);
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Places API error: ${status}`));
      }
    });
  });
}

/**
 * Get detailed information about a restaurant
 */
export async function getPlaceDetails(placeId) {
  if (!window.google || !window.google.maps) {
    throw new Error('Google Maps API not loaded');
  }

  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId: placeId,
        fields: [
          'name',
          'rating',
          'review_count',
          'formatted_address',
          'photos',
          'opening_hours',
          'price_level',
          'types',
          'business_status',
          'geometry',
          'url',
          'website',
          'formatted_phone_number',
        ],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(new Error(`Place details error: ${status}`));
        }
      }
    );
  });
}

/**
 * Calculate distance in miles from current location
 */
export function calculateDistance(from, to) {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return parseFloat(distance.toFixed(1));
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Format price level as currency symbols
 */
export function formatPriceLevel(level) {
  const priceMap = {
    1: '$',
    2: '$$',
    3: '$$$',
    4: '$$$$',
  };
  return priceMap[level] || 'N/A';
}

/**
 * Get opening hours status
 */
export function getHoursStatus(openingHours) {
  if (!openingHours) return 'Hours not available';
  if (openingHours.open_now === undefined) return 'Hours not available';
  return openingHours.open_now ? 'Open' : 'Closed';
}

/**
 * Get opening hours for today
 */
export function getTodayHours(openingHours) {
  if (!openingHours || !openingHours.weekday_text) return null;
  const today = new Date().getDay();
  return openingHours.weekday_text[today] || null;
}

/**
 * Extract restaurant type/category
 */
export function getRestaurantType(types) {
  if (!types) return [];
  const categoryMap = {
    pizza: '🍕 Pizza',
    italian_restaurant: '🇮🇹 Italian',
    restaurant: '🍽️ Restaurant',
    cafe: '☕ Café',
    fast_food: '⚡ Fast Food',
    bar: '🍷 Bar',
    bakery: '🥐 Bakery',
  };

  const categories = [];
  for (let type of types) {
    if (categoryMap[type]) {
      categories.push(categoryMap[type]);
    }
  }
  return categories.slice(0, 3); // Return first 3 categories
}
