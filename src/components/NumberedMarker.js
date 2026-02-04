/**
 * Create a numbered marker for Google Maps
 * Uses SVG to create a marker with a number inside
 */
export function createNumberedMarkerIcon(number) {
  const svg = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Marker shape -->
      <path d="M20,0 C10,0 0,10 0,25 C0,40 20,50 20,50 C20,50 40,40 40,25 C40,10 30,0 20,0 Z" fill="#667eea" stroke="#fff" stroke-width="2"/>
      <!-- Number inside -->
      <text x="20" y="32" font-size="18" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">
        ${number}
      </text>
    </svg>
  `;

  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);

  return {
    url: url,
    scaledSize: new window.google.maps.Size(40, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 50),
  };
}

/**
 * Create a hover state marker icon (highlighted)
 */
export function createHighlightedMarkerIcon(number) {
  const svg = `
    <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="25" cy="58" rx="20" ry="4" fill="rgba(0,0,0,0.2)"/>
      <!-- Marker shape -->
      <path d="M25,0 C12,0 2,10 2,28 C2,45 25,60 25,60 C25,60 48,45 48,28 C48,10 38,0 25,0 Z" fill="#764ba2" stroke="#fff" stroke-width="3"/>
      <!-- Number inside -->
      <text x="25" y="38" font-size="22" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">
        ${number}
      </text>
    </svg>
  `;

  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);

  return {
    url: url,
    scaledSize: new window.google.maps.Size(50, 60),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 60),
  };
}

// Named exports are preferred; use them directly
