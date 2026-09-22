/**
 * DRISHTI - Data Provider Architecture & Factory
 * Separates Demo Simulation Providers from Production Live Providers.
 * Clear Data Provenance: Never mixes mock data with production logic.
 */

export class DataProviderFactory {
  static getProvider(type = "DEMO") {
    if (type === "LIVE") {
      return new LiveProvider();
    }

    return new DemoProvider();
  }
}


/**
 * DEMO PROVIDER
 * Used when live APIs are unavailable.
 * Clearly marked as simulated data.
 */
class DemoProvider {
  constructor() {
    this.provenance = "SIMULATED DEMO DATA";
    this.isLive = false;
  }

  getWeather(corridorCode) {
    return {
      source: "Simulated IMD Weather Feed (Demo Mode)",
      precipitationMmH:
        corridorCode === "NH-29"
          ? 48
          : (corridorCode === "NH-10" ? 22 : 4),

      temperatureC: 22,
      windKmph: 14,

      condition:
        corridorCode === "NH-29"
          ? "Heavy Monsoon Downpour"
          : "Scattered Showers",

      timestamp: "3 mins ago",
      isSimulated: true
    };
  }

  getTraffic(corridorCode) {
    return {
      source: "Synthetic Telemetry Simulator",

      congestionIndex:
        corridorCode === "NH-29"
          ? 0.75
          : 0.25,

      avgSpeedKmph:
        corridorCode === "NH-29"
          ? 22
          : 48,

      isSimulated: true
    };
  }
}


/**
 * LIVE PROVIDER
 * Fetches real weather data through the secure backend.
 *
 * Browser
 *    ↓
 * /api/weather
 *    ↓
 * OpenWeather API
 *
 * The OpenWeather API key is NEVER exposed to the browser.
 */
class LiveProvider {
  constructor() {
    this.provenance = "VERIFIED LIVE / PRODUCTION";
    this.isLive = true;
  }

  async getWeather(corridorCode) {

    /*
     * Representative coordinates for major NER corridors.
     *
     * These are used to obtain weather conditions
     * around important corridor locations.
     */
    const corridorLocations = {

      // NH-29 — Dimapur / Kohima / Imphal corridor
      "NH-29": {
        lat: 25.6740,
        lon: 94.1100
      },

      // NH-10 — Sikkim corridor
      "NH-10": {
        lat: 27.1400,
        lon: 88.5100
      },

      // NH-27 — Assam corridor
      "NH-27": {
        lat: 26.1445,
        lon: 91.7362
      },

      // NH-06 — Meghalaya / Mizoram corridor
      "NH-06": {
        lat: 25.1000,
        lon: 92.4200
      },

      // NH-13 — Arunachal Pradesh corridor
      "NH-13": {
        lat: 28.1400,
        lon: 95.8300
      }
    };


    const location = corridorLocations[corridorCode];


    /*
     * If the requested corridor does not yet
     * have coordinates configured.
     */
    if (!location) {
      return {
        source: "OpenWeather Live API",
        rainfallMmPerHour: 0,
        temperatureC: 0,
        windKmph: 0,
        condition: "LOCATION UNAVAILABLE",
        isSimulated: false,
        error: true,
        message: `No weather location configured for ${corridorCode}`
      };
    }


    try {

      /*
       * Call our own backend endpoint.
       *
       * IMPORTANT:
       * The OpenWeather API key is NOT placed here.
       */
      const response = await fetch(
        `/api/weather?lat=${encodeURIComponent(location.lat)}&lon=${encodeURIComponent(location.lon)}`
      );


      const data = await response.json();


      /*
       * Handle backend/API errors.
       */
      if (!response.ok) {
        throw new Error(
          data.error || "Weather API request failed"
        );
      }


      /*
       * Convert the backend response into the
       * format expected by the DRISHTI system.
       */
      return {

        source: "OpenWeather Live API",

        /*
         * IMPORTANT:
         * RiskEngine expects this exact property name.
         */
        rainfallMmPerHour: data.rainfall || 0,

        temperatureC: data.temperature,

        /*
         * OpenWeather gives wind speed in m/s.
         * Convert to km/h.
         */
        windKmph: (data.windSpeed || 0) * 3.6,

        condition:
          data.description ||
          data.weather ||
          "Unknown",

        humidity: data.humidity,

        pressure: data.pressure,

        location: data.location,

        timestamp: data.timestamp,

        isSimulated: false,

        error: false
      };


    } catch (error) {

      console.error(
        `DRISHTI Live Weather Error for ${corridorCode}:`,
        error
      );


      /*
       * Do NOT silently pretend this is live data.
       * Clearly tell the UI that live data is unavailable.
       */
      return {

        source: "OpenWeather Live API",

        rainfallMmPerHour: 0,

        temperatureC: 0,

        windKmph: 0,

        condition: "LIVE DATA UNAVAILABLE",

        isSimulated: false,

        error: true,

        message: error.message
      };
    }
  }


  async getTraffic(corridorCode) {

    /*
     * Production integration hook for
     * FASTag / MoRTH / traffic telemetry.
     *
     * This remains unconnected until a real
     * traffic data source is integrated.
     */
    return {

      source:
        "INTEGRATION NOT CONNECTED (Roadmap Feature)",

      congestionIndex: 0,

      avgSpeedKmph: 0,

      isSimulated: false
    };
  }
}