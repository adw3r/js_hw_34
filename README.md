## Weather Forecast (React + Vite)

React app that shows weather forecast with a 2-hour request throttle (caching in `localStorage`) and a mock fallback for UI using `src/mocks/fetch.json`.

## Quick start

1. Install dependencies:
   - `npm i`
2. Configure API key in `src/config.js`:
   - `const API_KEY = 'YOUR_WEATHERAPI_KEY'; export default API_KEY;`
3. Run dev server:
   - `npm run dev`

## Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run preview`: preview built app
- `npm run lint`: run ESLint

## Weather API

- Provider: WeatherAPI (`https://api.weatherapi.com/v1/forecast.json`)
- Key stored in `src/config.js`.
- The API client lives in `src/api.js` and exposes `api.getWeather(query = 'Kyiv')`.

## 2-hour caching (throttling)

- Cache storage key: `weather_cache_v1` in `localStorage`.
- Per-query caching: data is cached independently for each `query`.
- TTL: 2 hours. Re-visits within 2 hours are served from cache without new requests.
- To reset: clear `localStorage.weather_cache_v1` via DevTools.

## Mock data (UI fallback)

- On network or API failure, the app loads `src/mocks/fetch.json` and renders it.
- The mock is also cached under the same key/TTL, so the UI stays consistent on refresh.

## UI

- Renders: location (city, country), current temperature, condition icon/text, feels like, wind, humidity.
- Main component: `src/App.jsx`.

## Notes

- Aliases in Vite: `@` → `src` (see `vite.config.js`).
- Node 18+ recommended.
