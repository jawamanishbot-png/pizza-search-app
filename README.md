# 🍕 Pizza Search App

A modern web application to search for and discover pizza restaurants in New York using Google Maps and Google Places API.

## Features

✨ **Full Restaurant Search Functionality**
- 🔍 Search for pizza restaurants near New York using Google Places API
- 📍 Display restaurants on interactive Google Map
- 🎯 Numbered markers (1, 2, 3, 10, etc.) for easy identification
- 📊 Sort and filter restaurants by rating, price, availability
- 🚗 Calculate distance in miles from current location
- ⭐ Star ratings and review counts
- 🏷️ Category tags (Pizza, Italian, etc.)
- 📸 Restaurant photo carousel
- 📞 Click-to-call phone numbers
- 🔄 "Redo Search in This Area" button when map is dragged
- 📍 Filter buttons: Sort by Rating, Open Now, Price Level, Takeout Available
- 📱 Fully responsive design

## Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Google Maps API Key with:
  - Maps JavaScript API
  - Places API
  - Distance Matrix API

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza-search-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Copy `.env.example` to `.env.local`
     ```bash
     cp .env.example .env.local
     ```
   - Add your Google Maps API key:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

### Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API (optional, for advanced features)
4. Create an API key (Credentials → Create Credentials → API Key)
5. (Optional) Add API key restrictions for security

## Development

### Start Development Server
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in the browser.

### Build for Production
```bash
npm run build
```
Builds the app for production in the `build` folder.

### Run Tests
```bash
npm test
```

## Project Structure

```
src/
├── pages/
│   ├── Home.js           # Welcome screen
│   └── Map.js            # Main map view with search
├── components/
│   ├── Header.js         # Top navigation bar
│   ├── FilterBar.js      # Filter and sort buttons
│   ├── RestaurantCard.js # Restaurant details panel
│   └── NumberedMarker.js # Custom map markers
├── utils/
│   └── placesService.js  # Google Places API integration
├── styles/
│   ├── Home.css
│   ├── Map.css
│   ├── Header.css
│   ├── FilterBar.css
│   └── RestaurantCard.css
├── App.js
└── index.js
```

## How It Works

### 1. Initial Search
- App loads with default location (New York City)
- Automatically fetches nearby pizza restaurants using Google Places API

### 2. Interactive Map
- Each restaurant is marked with a numbered marker (1, 2, 3...)
- Click any marker to view detailed restaurant information

### 3. Restaurant Details
- Bottom card shows:
  - Photo carousel with navigation
  - Restaurant name and marker number
  - Distance (miles)
  - Star rating and review count
  - Full address
  - Price level and hours
  - Category tags
  - Contact number
  - "Order Now" button links to restaurant website

### 4. Filters & Sorting
- **Sort by Rating**: Order restaurants by highest rated
- **Open Now**: Show only currently open restaurants
- **Price Level**: Filter by budget
- **Takeout**: Show restaurants offering takeout

### 5. Map Interactions
- Drag the map to change your search area
- "Redo Search in This Area" button appears when map is dragged
- Click to search for restaurants in the new location

## Technologies Used

- **React 19** - UI framework
- **React Router v6** - Navigation
- **@react-google-maps/api** - Google Maps integration
- **CSS3** - Styling and animations
- **Google Places API** - Restaurant data
- **Google Maps JavaScript API** - Map rendering

## API Integration

The app uses the Google Places API for:
- **nearbySearch()** - Find restaurants near coordinates
- **getDetails()** - Get detailed restaurant information (hours, photos, reviews)

Distance calculations use the Haversine formula for accurate mile measurements.

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add Environment Variable**
   - In Vercel project settings
   - Add `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Performance

- Production build: ~101 KB gzipped
- Optimized images and lazy loading
- Responsive design for all devices
- Efficient API calls with result caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Requires valid Google Maps API key
- API key should have appropriate restrictions for production
- Free tier has rate limits; consider upgrading for production use
- Search radius is fixed at 5 km (adjustable in code)

## Future Enhancements

- [ ] User location detection (GPS)
- [ ] Advanced filtering (dietary preferences, delivery, etc.)
- [ ] User ratings and reviews
- [ ] Favorites/bookmarks
- [ ] Route planning (directions)
- [ ] Real-time availability updates
- [ ] Multiple search locations
- [ ] Dark mode

## Troubleshooting

### API Key Not Working
- Verify the key is enabled in Google Cloud Console
- Check that required APIs are enabled
- Confirm there are no IP/domain restrictions

### No Restaurants Found
- Check internet connection
- Verify Google Places API is enabled
- Try a different location or adjust search radius in code
- Check API usage in Google Cloud Console

### Map Not Showing
- Confirm `REACT_APP_GOOGLE_MAPS_API_KEY` is set in `.env.local`
- Clear browser cache and restart dev server
- Check browser console for errors

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Made with ❤️ for pizza lovers** 🍕
