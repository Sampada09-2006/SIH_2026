# DRISHTI — Google Maps setup

The Regional GIS page now uses the Google Maps JavaScript API instead of OpenStreetMap/Leaflet.

## 1. Put your API key in the project

Open:

`js/config.js`

Replace:

`PASTE_YOUR_GOOGLE_MAPS_API_KEY_HERE`

with the API key you created in Google Cloud.

Example:

```js
export const DRISHTI_CONFIG = {
  GOOGLE_MAPS_API_KEY: "YOUR_KEY_HERE"
};
```

Do not commit a real key to a public Git repository. Because browser map keys are sent to the browser, restrict the key in Google Cloud by HTTP referrer/domain and API.

## 2. Google Cloud APIs

Enable at least:

- Maps JavaScript API

If you later connect real road routing, traffic-aware routes, geocoding, or other Google Maps services, enable only the additional APIs actually used by that feature.

## 3. Run DRISHTI

Use the existing local server:

```bash
python server.py
```

Then open:

`http://localhost:8080`

## 4. What is live right now?

The map is a real Google map. Fleet positions still come from DRISHTI's existing demo telemetry service (`fleet-service.js`), which moves vehicles every 3 seconds along demo waypoints.

A Google Maps API key does **not** provide the real-world GPS position of your vehicles.

For genuine live fleet tracking, the next integration is:

`Vehicle GPS / Driver phone -> backend API/WebSocket -> DRISHTI -> Google Maps vehicle marker`

The current code is structured so that the demo telemetry can later be replaced by real GPS coordinates without changing the map UI.
