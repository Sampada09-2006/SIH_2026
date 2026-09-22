/**
 * DRISHTI - Regional GIS Map View
 * Real interactive Leaflet map rendered with plain OpenStreetMap tiles and a warm CSS filter.
 * Zero Blue, Zero Black, Zero Emojis.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";
import { NER_STATES } from "../data/ner-geography.js";
import { DRISHTI_CONFIG } from "../config.js";

export class RegionalMapView {
  static mapInstance = null;
  static layerGroups = {
    corridors: null,
    bridges: null,
    hazards: null,
    fleets: null,
    fieldReports: null
  };
  static activeLayers = {
    corridors: true,
    bridges: true,
    hazards: true,
    fleets: true,
    fieldReports: true
  };

  static render() {
    const state = store.getState();

    return `
      <div class="view-header" style="margin-bottom: var(--space-4);">
        <div class="view-title-group">
          <h2>Regional GIS Command Map</h2>
          <p>Interactive spatial intelligence across all 8 Northeastern States with multi-layer telemetry.</p>
        </div>
        <div class="view-actions-group">
          <!-- State Filter -->
          <select id="map-state-filter" class="form-select" style="width: 180px; padding: 6px 10px; font-size: var(--text-xs);" onchange="window.drishtiApp.filterMapByState(this.value)">
            <option value="ALL">All 8 NER States</option>
            ${NER_STATES.map(s => `<option value="${s.id}" ${state.selectedStateFilter === s.id ? 'selected' : ''}>${s.name}</option>`).join("")}
          </select>

          <!-- Locate Me Button -->
          <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.locateUserOnMap()">
            ${renderIcon("navigation", { size: 14 })} Locate Me
          </button>
          
          <!-- Reset Map View -->
          <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.resetMapView()">
            ${renderIcon("refresh-cw", { size: 14 })} Reset View
          </button>
        </div>
      </div>

      <!-- Map Viewport Container -->
      <div class="map-container-wrapper">
        <div id="drishti-gis-map" class="map-viewport"></div>

        <!-- Floating Layer Control Panel -->
        <div class="map-floating-panel">
          <div style="font-size: var(--text-xs); font-weight: 700; color: var(--text-primary); margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between;">
            <span>${renderIcon("layers", { size: 14, color: "var(--accent-gold)" })} Spatial Layers</span>
            <span class="data-provenance-tag provenance-simulated" style="font-size: 0.6rem;">GIS Engine</span>
          </div>

          <div class="map-layer-toggles">
            <label class="map-layer-item">
              <span>Strategic Corridors</span>
              <input type="checkbox" id="layer-toggle-corridors" checked onchange="window.drishtiApp.toggleMapLayer('corridors', this.checked)">
            </label>
            <label class="map-layer-item">
              <span>Bridges & Infrastructure</span>
              <input type="checkbox" id="layer-toggle-bridges" checked onchange="window.drishtiApp.toggleMapLayer('bridges', this.checked)">
            </label>
            <label class="map-layer-item">
              <span>Hazards & Disruption Zones</span>
              <input type="checkbox" id="layer-toggle-hazards" checked onchange="window.drishtiApp.toggleMapLayer('hazards', this.checked)">
            </label>
            <label class="map-layer-item">
              <span>Logistics Convoys</span>
              <input type="checkbox" id="layer-toggle-fleets" checked onchange="window.drishtiApp.toggleMapLayer('fleets', this.checked)">
            </label>
            <label class="map-layer-item">
              <span>Field Reports</span>
              <input type="checkbox" id="layer-toggle-reports" checked onchange="window.drishtiApp.toggleMapLayer('fieldReports', this.checked)">
            </label>
          </div>
        </div>

        <!-- Bottom Legend Bar -->
        <div class="map-legend-bar">
          <div class="legend-chip">
            <div class="legend-dot" style="background: #16A34A;"></div>
            <span>Operational</span>
          </div>
          <div class="legend-chip">
            <div class="legend-dot" style="background: #D97706;"></div>
            <span>Caution</span>
          </div>
          <div class="legend-chip">
            <div class="legend-dot" style="background: #DC2626;"></div>
            <span>Critical / Disrupted</span>
          </div>
          <div class="legend-chip">
            <div class="legend-dot" style="background: var(--accent-gold);"></div>
            <span>Essential Convoy</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Google Maps loader. The key is read from js/config.js so it is easy to
   * configure locally without putting a credential into source control.
   */
  static googleMapsPromise = null;
  static googleLibraries = null;
  static infoWindow = null;

  static loadGoogleMaps() {
    if (this.googleMapsPromise) return this.googleMapsPromise;

    this.googleMapsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-drishti-google-maps="true"]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', () => reject(new Error('Google Maps failed to load.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(DRISHTI_CONFIG.GOOGLE_MAPS_API_KEY)}&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;
      script.dataset.drishtiGoogleMaps = 'true';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Google Maps failed to load. Check the API key and Maps JavaScript API.'));
      document.head.appendChild(script);
    });

    return this.googleMapsPromise;
  }

  static async initMap() {
    const container = document.getElementById('drishti-gis-map');
    if (!container) return;

    if (DRISHTI_CONFIG.GOOGLE_MAPS_API_KEY === 'PASTE_YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      container.innerHTML = `
        <div style="height:100%;display:flex;align-items:center;justify-content:center;padding:32px;text-align:center;background:#f6f3ed;color:#3f3b35;">
          <div style="max-width:520px;background:#fff;padding:24px;border:1px solid #ddd5c7;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.08);">
            <strong style="display:block;font-size:18px;margin-bottom:8px;">Google Maps API key required</strong>
            <span style="font-size:13px;line-height:1.6;">Open <code>js/config.js</code> and replace <code>PASTE_YOUR_GOOGLE_MAPS_API_KEY_HERE</code> with the API key you created in Google Cloud.</span>
          </div>
        </div>`;
      return;
    }

    try {
      await this.loadGoogleMaps();
      if (!window.google?.maps) throw new Error('Google Maps JavaScript API is unavailable.');

      this.googleLibraries = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker')
      ]);

      if (this.mapInstance) {
        this.clearMapObjects();
      }

      this.mapInstance = new google.maps.Map(container, {
        center: { lat: 26.2006, lng: 92.9376 },
        zoom: 7,
        minZoom: 5,
        maxZoom: 18,
        mapId: 'DEMO_MAP_ID',
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy',
        styles: [
          { elementType: 'geometry', stylers: [{ saturation: -15 }, { lightness: 8 }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#5b554c' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#f6f3ed' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#d9d6ce' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#e8e3d9' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#d4c8b5' }] },
          { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }
        ]
      });

      // Compatibility helper: the existing DRISHTI app calls Leaflet's flyTo.
      this.mapInstance.flyTo = (coords, zoom, options = {}) => {
        const target = Array.isArray(coords)
          ? { lat: Number(coords[0]), lng: Number(coords[1]) }
          : coords;
        this.mapInstance.panTo(target);
        if (typeof zoom === 'number') this.mapInstance.setZoom(zoom);
      };

      this.infoWindow = new google.maps.InfoWindow();
      this.layerGroups = {
        corridors: [],
        bridges: [],
        hazards: [],
        fleets: [],
        fieldReports: []
      };

      this.renderAllLayers();
    } catch (error) {
      console.error('DRISHTI Google Maps error:', error);
      container.innerHTML = `
        <div style="height:100%;display:flex;align-items:center;justify-content:center;padding:32px;text-align:center;background:#f6f3ed;color:#3f3b35;">
          <div style="max-width:560px;background:#fff;padding:24px;border:1px solid #ddd5c7;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.08);">
            <strong style="display:block;font-size:18px;margin-bottom:8px;">Google Maps could not load</strong>
            <span style="font-size:13px;line-height:1.6;">Check that the API key is correct, billing is enabled, and <b>Maps JavaScript API</b> is enabled for your Google Cloud project.</span>
          </div>
        </div>`;
    }
  }

  static clearMapObjects() {
    Object.values(this.layerGroups || {}).flat().forEach(obj => {
      if (obj && typeof obj.setMap === 'function') obj.setMap(null);
    });
    this.layerGroups = {
      corridors: [],
      bridges: [],
      hazards: [],
      fleets: [],
      fieldReports: []
    };
    if (this.infoWindow) this.infoWindow.close();
  }

  static toLatLng(coords) {
    return { lat: Number(coords[0]), lng: Number(coords[1]) };
  }

  static makeAdvancedMarker(position, html, title) {
    const { AdvancedMarkerElement } = this.googleLibraries[1];
    const content = document.createElement('div');
    content.className = 'google-advanced-marker';
    content.innerHTML = html;
    content.title = title || '';
    const marker = new AdvancedMarkerElement({
      map: this.mapInstance,
      position: this.toLatLng(position),
      content,
      title: title || ''
    });
    return marker;
  }

  static bindInfo(marker, html) {
    marker.addListener('click', () => {
      this.infoWindow.setContent(html);
      this.infoWindow.open({ map: this.mapInstance, anchor: marker });
    });
  }

  static renderAllLayers() {
    if (!this.mapInstance) return;

    this.clearMapObjects();
    const state = store.getState();

    // 1. Strategic Corridors
    state.corridors.forEach(corridor => {
      let strokeColor = '#16A34A';
      let dashPattern = null;
      if (corridor.status === 'DISRUPTED' || corridor.status === 'CLOSED') {
        strokeColor = '#DC2626';
      } else if (corridor.status === 'CAUTION') {
        strokeColor = '#D97706';
      } else if (corridor.status === 'UNKNOWN') {
        strokeColor = '#6B7280';
        dashPattern = '6 8';
      }

      const polyline = new google.maps.Polyline({
        map: this.mapInstance,
        path: corridor.coordinates.map(this.toLatLng),
        geodesic: true,
        strokeColor,
        strokeOpacity: 0.85,
        strokeWeight: 5,
        icons: dashPattern ? [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 }, offset: '0', repeat: '14px' }] : undefined
      });

      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header"><span class="map-popup-title">${corridor.code}: ${corridor.name}</span></div>
          <div class="map-popup-body">
            <div class="map-popup-row"><span>State / District:</span><strong>${corridor.state} (${corridor.district})</strong></div>
            <div class="map-popup-row"><span>Status:</span><span class="badge ${corridor.status === 'DISRUPTED' ? 'badge-red' : (corridor.status === 'CAUTION' ? 'badge-amber' : 'badge-green')}">${corridor.status}</span></div>
            <div class="map-popup-row"><span>Explainable Risk:</span><strong>${corridor.riskScore}/100 (${corridor.riskBand})</strong></div>
            <div class="map-popup-row"><span>Freshness:</span><span class="text-muted font-mono">${corridor.dataFreshness || 'Fresh'}</span></div>
          </div>
          <div class="map-popup-footer"><button class="btn btn-primary btn-sm" onclick="window.drishtiApp.inspectCorridor('${corridor.code}')">Road Intelligence</button></div>
        </div>`;

      polyline.addListener('click', event => {
        this.infoWindow.setContent(popupHtml);
        this.infoWindow.setPosition(event.latLng);
        this.infoWindow.open({ map: this.mapInstance });
      });
      this.layerGroups.corridors.push(polyline);
    });

    // 2. Bridges
    state.bridges.forEach(bridge => {
      const marker = this.makeAdvancedMarker(
        bridge.coordinates,
        `<div class="bridge-marker-box">${renderIcon('building', { size: 16, color: 'var(--text-primary)' })}</div>`,
        bridge.name
      );
      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header"><span class="map-popup-title">${bridge.name}</span></div>
          <div class="map-popup-body">
            <div class="map-popup-row"><span>River:</span><strong>${bridge.river}</strong></div>
            <div class="map-popup-row"><span>Connected:</span><strong>${bridge.connectedRoad}</strong></div>
            <div class="map-popup-row"><span>Max Weight:</span><strong>${bridge.maxWeightTonnes} Tonnes</strong></div>
            <div class="map-popup-row"><span>Flood Clearance:</span><strong>${bridge.floodClearanceMeters}m</strong></div>
            <div class="map-popup-row"><span>Status:</span><span class="badge ${bridge.status === 'RESTRICTED' ? 'badge-amber' : 'badge-green'}">${bridge.status}</span></div>
          </div>
        </div>`;
      this.bindInfo(marker, popupHtml);
      this.layerGroups.bridges.push(marker);
    });

    // 3. Hazards & incidents
    state.incidents.forEach(inc => {
      const isCritical = inc.severity === 'CRITICAL' || inc.severity === 'HIGH';
      const marker = this.makeAdvancedMarker(
        inc.coordinates,
        `<div class="incident-marker-box ${isCritical ? 'severity-critical' : 'severity-moderate'}">${renderIcon('alert-triangle', { size: 16, color: isCritical ? '#DC2626' : '#D97706' })}</div>`,
        inc.title
      );
      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header"><span class="map-popup-title">${inc.type}: ${inc.roadName}</span></div>
          <div class="map-popup-body">
            <div class="map-popup-row"><span>Severity:</span><span class="badge ${isCritical ? 'badge-red' : 'badge-amber'}">${inc.severity}</span></div>
            <div class="map-popup-row"><span>Source:</span><span class="data-provenance-tag provenance-verified">${inc.source}</span></div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:6px;">${inc.impactSummary}</div>
          </div>
          <div class="map-popup-footer"><button class="btn btn-primary btn-sm" onclick="window.drishtiApp.navigate('routePlanner')">Plan Detour</button></div>
        </div>`;
      this.bindInfo(marker, popupHtml);
      this.layerGroups.hazards.push(marker);
    });

    // 4. Logistics convoys
    state.fleet.forEach(vehicle => {
      const isDelayed = vehicle.status === 'DELAYED' || vehicle.status === 'AT_RISK';
      const marker = this.makeAdvancedMarker(
        vehicle.coordinates,
        `<div class="vehicle-marker-box ${isDelayed ? 'status-at-risk' : ''}">${renderIcon('truck', { size: 14, color: 'var(--accent-gold-dark)' })}<span>${vehicle.id}</span></div>`,
        `${vehicle.id}: ${vehicle.cargoCategory}`
      );
      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header"><span class="map-popup-title">${vehicle.id} (${vehicle.plate})</span></div>
          <div class="map-popup-body">
            <div class="map-popup-row"><span>Cargo:</span><strong>${vehicle.cargoDetail}</strong></div>
            <div class="map-popup-row"><span>Priority:</span><span class="badge ${vehicle.priority === 'CRITICAL' ? 'badge-red' : 'badge-gold'}">${vehicle.priority}</span></div>
            <div class="map-popup-row"><span>Speed / Heading:</span><strong>${vehicle.speedKmph} km/h (${vehicle.headingDeg || 0}°)</strong></div>
            <div class="map-popup-row"><span>ETA:</span><strong>${vehicle.etaFormatted}</strong></div>
            <div class="map-popup-row"><span>Telemetry:</span><span class="data-provenance-tag provenance-simulated">${vehicle.provenance}</span></div>
          </div>
          <div class="map-popup-footer"><button class="btn btn-primary btn-sm" onclick="window.drishtiApp.inspectVehicle('${vehicle.id}')">Fleet Details</button></div>
        </div>`;
      this.bindInfo(marker, popupHtml);
      this.layerGroups.fleets.push(marker);
    });

    Object.entries(this.activeLayers).forEach(([name, visible]) => {
      this.layerGroups[name].forEach(obj => obj.setMap(visible ? this.mapInstance : null));
    });
  }

  static toggleLayer(layerName, isVisible) {
    this.activeLayers[layerName] = isVisible;
    if (!this.layerGroups[layerName]) return;
    this.layerGroups[layerName].forEach(obj => obj.setMap(isVisible ? this.mapInstance : null));
  }

  static focusCorridor(corridorCode) {
    const state = store.getState();
    const corridor = state.corridors.find(c => c.code === corridorCode);
    if (corridor && this.mapInstance) this.mapInstance.flyTo(corridor.coordinates[0], 10, { duration: 1.2 });
  }

  static focusVehicle(vehicleId) {
    const state = store.getState();
    const vehicle = state.fleet.find(v => v.id === vehicleId);
    if (vehicle && this.mapInstance) this.mapInstance.flyTo(vehicle.coordinates, 12, { duration: 1.2 });
  }
}
