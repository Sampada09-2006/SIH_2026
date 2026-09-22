/**
 * DRISHTI - Strategic NER Highway Corridors & Road Network Data
 * Coherent dataset across the 8 Northeastern states with geo-polylines.
 */

export const NER_CORRIDORS = [
  {
    code: "NH-29",
    name: "Dimapur - Kohima - Imphal Highway",
    state: "Nagaland & Manipur",
    district: "Chümoukedima / Kohima",
    category: "National Highway (Critical Lifeline)",
    status: "OPERATIONAL",
    statusLabel: "Operational — Moderate Monitoring",
    riskScore: 42,
    riskBand: "MODERATE",
    riskFactors: [
      { name: "Slope Instability (Pagal Pahar)", contribution: "Moderate", score: 25 },
      { name: "Precipitation (Current 8mm/h)", contribution: "Low", score: 10 },
      { name: "Heavy Freight Congestion", contribution: "Low", score: 7 }
    ],
    lengthKm: 216,
    avgSpeedKmph: 35,
    lastVerified: "14 mins ago",
    dataFreshness: "Fresh (< 20m)",
    verificationState: "VERIFIED",
    source: "Field Operations & Sensor Network",
    coordinates: [
      [25.9060, 93.7270], // Dimapur
      [25.8200, 93.8500], // Medziphema
      [25.7400, 93.9900], // Pagal Pahar sector
      [25.6740, 94.1100], // Kohima
      [25.5000, 94.0200], // Maram
      [25.2600, 93.9600], // Senapati
      [24.8170, 93.9368]  // Imphal
    ],
    alternateBypass: "NH-02 via Wokha - Mokokchung detour (+48 km)"
  },
  {
    code: "NH-10",
    name: "Siliguri - Sevoke - Teesta - Gangtok Lifeline",
    state: "Sikkim & West Bengal",
    district: "Pakyong / Gangtok",
    category: "National Highway (Mountain Lifeline)",
    status: "CAUTION",
    statusLabel: "Caution — Sinking Sector at 29th Mile",
    riskScore: 68,
    riskBand: "HIGH",
    riskFactors: [
      { name: "Active Landslide Zone (29th Mile)", contribution: "High", score: 35 },
      { name: "Teesta River High Water Level", contribution: "Moderate", score: 20 },
      { name: "Heavy Cloudburst Alert", contribution: "Moderate", score: 13 }
    ],
    lengthKm: 114,
    avgSpeedKmph: 26,
    lastVerified: "8 mins ago",
    dataFreshness: "Fresh (< 10m)",
    verificationState: "VERIFIED",
    source: "BRO Swastik & Traffic Post",
    coordinates: [
      [26.7271, 88.3953], // Siliguri
      [26.8833, 88.4667], // Sevoke Bridge
      [27.0500, 88.4800], // Teesta Bazaar
      [27.1400, 88.5100], // Rangpo
      [27.2300, 88.5500], // Singtam
      [27.3389, 88.6065]  // Gangtok
    ],
    alternateBypass: "Lava - Algarah - Reshi - Rhenock Route (+32 km)"
  },
  {
    code: "NH-27",
    name: "East-West Corridor (Guwahati - Nagaon - Silchar Spur)",
    state: "Assam",
    district: "Kamrup / Nagaon / Dima Hasao",
    category: "Four-Lane National Highway",
    status: "OPERATIONAL",
    statusLabel: "Operational — Unrestricted",
    riskScore: 18,
    riskBand: "LOW",
    riskFactors: [
      { name: "Pavement Quality (Grade A)", contribution: "Low", score: 5 },
      { name: "Drainage & Flood Barrier Active", contribution: "Low", score: 5 },
      { name: "Traffic Flow Normal", contribution: "Low", score: 8 }
    ],
    lengthKm: 340,
    avgSpeedKmph: 62,
    lastVerified: "4 mins ago",
    dataFreshness: "Live (< 5m)",
    verificationState: "VERIFIED",
    source: "NHAI Highway Management System",
    coordinates: [
      [26.1445, 91.7362], // Guwahati
      [26.2100, 92.2000], // Jagiroad
      [26.3400, 92.6800], // Nagaon
      [25.8600, 92.9800], // Lumding
      [25.1800, 93.0100], // Haflong
      [24.8333, 92.7789]  // Silchar
    ],
    alternateBypass: "SH-18 via Morigaon"
  },
  {
    code: "NH-06",
    name: "Shillong - Jowai - Ratacherra - Silchar Highway",
    state: "Meghalaya & Assam",
    district: "East Jaintia Hills",
    category: "Hilly National Corridor",
    status: "CAUTION",
    statusLabel: "Caution — Sonapur Tunnel Mudflow Risk",
    riskScore: 56,
    riskBand: "MODERATE",
    riskFactors: [
      { name: "Heavy Downpour (Cherra belt)", contribution: "High", score: 30 },
      { name: "Mudflow vulnerability at Sonapur", contribution: "Moderate", score: 18 },
      { name: "Single-lane bottleneck", contribution: "Low", score: 8 }
    ],
    lengthKm: 215,
    avgSpeedKmph: 32,
    lastVerified: "22 mins ago",
    dataFreshness: "Moderate (< 30m)",
    verificationState: "VERIFIED",
    source: "Meghalaya Police Patrol & Field EOC",
    coordinates: [
      [25.5788, 91.8933], // Shillong
      [25.4400, 92.2000], // Jowai
      [25.2600, 92.3500], // Lad Rymbai
      [25.1000, 92.4200], // Sonapur Tunnel
      [24.9600, 92.5100], // Ratacherra
      [24.8333, 92.7789]  // Silchar
    ],
    alternateBypass: "Guwahati - Lumding - Haflong - Silchar (NH-27 spur)"
  },
  {
    code: "NH-13",
    name: "Trans-Arunachal Highway (Pasighat - Roing - Tezu)",
    state: "Arunachal Pradesh",
    district: "East Siang / Lower Dibang Valley",
    category: "Strategic Border Highway",
    status: "OPERATIONAL",
    statusLabel: "Operational — Bridge Clearances Nominal",
    riskScore: 28,
    riskBand: "LOW",
    riskFactors: [
      { name: "River Water Levels Normal", contribution: "Low", score: 12 },
      { name: "Hill Slopes Stable", contribution: "Low", score: 8 },
      { name: "Low Density Traffic", contribution: "Low", score: 8 }
    ],
    lengthKm: 180,
    avgSpeedKmph: 45,
    lastVerified: "35 mins ago",
    dataFreshness: "Acceptable (< 1h)",
    verificationState: "VERIFIED",
    source: "BRO Project Brahmank",
    coordinates: [
      [28.0667, 95.3333], // Pasighat
      [28.1400, 95.5500], // Mebo
      [28.1400, 95.8300], // Roing
      [27.9200, 96.1600]  // Tezu
    ],
    alternateBypass: "Lohit River Ferry Crossing (Restricted)"
  },
  {
    code: "NH-306",
    name: "Silchar - Vairengte - Kolasib - Aizawl Lifeline",
    state: "Assam & Mizoram",
    district: "Cachar / Kolasib",
    category: "Mizoram Solo Lifeline",
    status: "OPERATIONAL",
    statusLabel: "Operational — Heavy Vehicle Caution",
    riskScore: 48,
    riskBand: "MODERATE",
    riskFactors: [
      { name: "Steep Incline & Single-lane sections", contribution: "Moderate", score: 22 },
      { name: "Soil Subsidence at Kawnpui", contribution: "Moderate", score: 18 },
      { name: "Light Fog at Ridge Passes", contribution: "Low", score: 8 }
    ],
    lengthKm: 180,
    avgSpeedKmph: 28,
    lastVerified: "18 mins ago",
    dataFreshness: "Fresh (< 20m)",
    verificationState: "VERIFIED",
    source: "Mizoram Transport & PWD",
    coordinates: [
      [24.8333, 92.7789], // Silchar
      [24.5000, 92.7500], // Vairengte
      [24.2200, 92.6800], // Kolasib
      [24.0100, 92.7100], // Kawnpui
      [23.7271, 92.7176]  // Aizawl
    ],
    alternateBypass: "Sairang - Lengpui bypass spur"
  }
];
