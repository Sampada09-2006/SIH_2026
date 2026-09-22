# DRISHTI startup fix

The frontend was failing because `js/app.js` referenced an older `components/` and `data/` architecture that no longer existed in the project.

Changes made:
- Rebuilt `js/app.js` around the current `state/`, `services/`, `data/`, and `views/` architecture.
- Added the application shell/navigation and view routing.
- Added controller methods used by the current views (maps, route planner, field reports, control room, SOS, offline mode, and 2G simulator).
- Removed the obsolete Leaflet script from `index.html`; the current regional map view uses Google Maps.
- Added `sw.js` so service-worker registration does not create a missing-file request.
- Removed an accidental duplicate malformed `js/data/js/state/store.js` file.
- Verified all local ES-module imports resolve.
- Verified JavaScript syntax with Node.js.

Run:

```powershell
python server.py
```

Then open:

`http://localhost:8080/`

If port 8080 is already occupied by another application, stop that process first and restart `server.py`.
