/**
 * DRISHTI - Baseline Operational Scenario Dataset
 * Provides coherent, internally consistent initial state for fleet, incidents, alerts, and field reports.
 * Watermarked strictly as SIMULATED DEMO DATA per Data Honesty rules.
 */

export const INITIAL_FLEET = [
  {
    id: "MED-NER-101",
    plate: "SK-01-D-4891",
    driverName: "Tenzing Norbu",
    phone: "+91-98001-44219",
    cargoType: "Medicines",
    cargoCategory: "Critical Medical Supplies",
    cargoDetail: "Insulin vials, IV Fluids, Anti-Venom, High-Altitude Antibiotics (1,800 kg)",
    priority: "CRITICAL",
    origin: "Siliguri Medical Depot",
    destination: "District Hospital, Mangan (North Sikkim)",
    currentCorridor: "NH-10",
    corridorCode: "NH-10",
    coordinates: [26.9200, 88.4700],
    speedKmph: 28,
    headingDeg: 350,
    status: "EN_ROUTE",
    statusLabel: "En Route — Approaching Teesta Gorge",
    currentRisk: "MODERATE",
    etaFormatted: "2h 15m",
    delayMinutes: 15,
    lastGpsUpdateMinutesAgo: 1,
    provenance: "SIMULATED GPS — DEMO MODE",
    telemetry: {
      engineTemp: "88°C",
      fuelPct: 78,
      tirePressure: "Optimal (34 PSI)",
      cabinTemp: "18°C"
    },
    waypoints: [
      [26.7271, 88.3953],
      [26.8833, 88.4667],
      [26.9200, 88.4700],
      [27.0500, 88.4800],
      [27.1400, 88.5100],
      [27.2300, 88.5500],
      [27.3389, 88.6065]
    ],
    currentWaypointIndex: 2,
    rerouteAdvised: false,
    suggestedAlternate: "Lava - Algarah - Reshi - Rhenock Bypass"
  },
  {
    id: "FOOD-NER-204",
    plate: "AS-01-BC-8921",
    driverName: "Bhaben Kalita",
    phone: "+91-94350-12890",
    cargoType: "Food",
    cargoCategory: "PDS Essential Grain Supply",
    cargoDetail: "Fortified Rice & Wheat Flour (14 Metric Tonnes)",
    priority: "HIGH",
    origin: "Guwahati FCI Godown",
    destination: "Jorhat Central Storage",
    currentCorridor: "NH-27",
    corridorCode: "NH-27",
    coordinates: [26.2800, 92.4500],
    speedKmph: 58,
    headingDeg: 80,
    status: "EN_ROUTE",
    statusLabel: "En Route — On Schedule",
    currentRisk: "LOW",
    etaFormatted: "3h 40m",
    delayMinutes: 0,
    lastGpsUpdateMinutesAgo: 2,
    provenance: "SIMULATED GPS — DEMO MODE",
    telemetry: {
      engineTemp: "84°C",
      fuelPct: 82,
      tirePressure: "Optimal (36 PSI)",
      cabinTemp: "24°C"
    },
    waypoints: [
      [26.1445, 91.7362],
      [26.2100, 92.2000],
      [26.2800, 92.4500],
      [26.3400, 92.6800],
      [26.7500, 94.2200]
    ],
    currentWaypointIndex: 2,
    rerouteAdvised: false,
    suggestedAlternate: null
  },
  {
    id: "MED-NER-305",
    plate: "ML-05-E-7722",
    driverName: "Daphishisha Lyngdoh",
    phone: "+91-98630-99412",
    cargoType: "Medicines",
    cargoCategory: "Emergency Blood & Vaccines",
    cargoDetail: "Cold-chain Blood Units & Pediatric Vaccines (600 kg)",
    priority: "CRITICAL",
    origin: "NEIGRIHMS Shillong",
    destination: "Silchar Civil Hospital (Barak Valley)",
    currentCorridor: "NH-06",
    corridorCode: "NH-06",
    coordinates: [25.3200, 92.2800],
    speedKmph: 30,
    headingDeg: 120,
    status: "EN_ROUTE",
    statusLabel: "En Route — Slow Incline Passage",
    currentRisk: "MODERATE",
    etaFormatted: "3h 50m",
    delayMinutes: 25,
    lastGpsUpdateMinutesAgo: 1,
    provenance: "SIMULATED GPS — DEMO MODE",
    telemetry: {
      engineTemp: "90°C",
      fuelPct: 65,
      tirePressure: "Optimal (33 PSI)",
      cabinTemp: "4°C (Cold Storage Active)"
    },
    waypoints: [
      [25.5788, 91.8933],
      [25.4400, 92.2000],
      [25.3200, 92.2800],
      [25.1000, 92.4200],
      [24.9600, 92.5100],
      [24.8333, 92.7789]
    ],
    currentWaypointIndex: 2,
    rerouteAdvised: false,
    suggestedAlternate: "Guwahati - Lumding - Haflong - Silchar Spur"
  },
  {
    id: "CONV-NL-408",
    plate: "NL-07-A-3310",
    driverName: "Kevichusa Angami",
    phone: "+91-94360-55112",
    cargoType: "Food",
    cargoCategory: "Essential Baby Food & Milk Powder",
    cargoDetail: "Emergency Infant Nutrition Consignment (4,200 kg)",
    priority: "CRITICAL",
    origin: "Dimapur Railway Freight Terminal",
    destination: "Kohima Relief Distribution Center",
    currentCorridor: "NH-29",
    corridorCode: "NH-29",
    coordinates: [25.8100, 93.8600],
    speedKmph: 32,
    headingDeg: 110,
    status: "EN_ROUTE",
    statusLabel: "En Route — Approaching Pagal Pahar Corridor",
    currentRisk: "MODERATE",
    etaFormatted: "1h 10m",
    delayMinutes: 10,
    lastGpsUpdateMinutesAgo: 2,
    provenance: "SIMULATED GPS — DEMO MODE",
    telemetry: {
      engineTemp: "86°C",
      fuelPct: 74,
      tirePressure: "Optimal (35 PSI)",
      cabinTemp: "21°C"
    },
    waypoints: [
      [25.9060, 93.7270],
      [25.8200, 93.8500],
      [25.8100, 93.8600],
      [25.7400, 93.9900],
      [25.6740, 94.1100]
    ],
    currentWaypointIndex: 2,
    rerouteAdvised: false,
    suggestedAlternate: "Old Kohima - Niuland Bypass Road"
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: "INC-2026-091",
    title: "Rockfall & Mudflow Vulnerability at Sonapur Tunnel",
    type: "Landslide",
    corridorCode: "NH-06",
    roadName: "NH-06 (Shillong - Jowai - Silchar)",
    state: "Meghalaya",
    district: "East Jaintia Hills",
    coordinates: [25.1000, 92.4200],
    severity: "MODERATE",
    status: "VERIFIED",
    reportedAt: "45 mins ago",
    source: "Field Official (PWD Executive Engineer)",
    impactSummary: "Single-lane traffic movement; heavy convoys restricted during downpour",
    affectedFleets: ["MED-NER-305"],
    description: "Slurry runoff and mud accumulation at northern portal of Sonapur Tunnel following 42mm cloudburst."
  },
  {
    id: "INC-2026-088",
    title: "Subsidence & Road Settlement near Teesta 29th Mile",
    type: "Road Damage",
    corridorCode: "NH-10",
    roadName: "NH-10 (Siliguri - Gangtok)",
    state: "Sikkim & West Bengal Border",
    district: "Kalimpong",
    coordinates: [27.0500, 88.4800],
    severity: "HIGH",
    status: "VERIFIED",
    reportedAt: "1h 15m ago",
    source: "Border Roads Organisation (Swastik)",
    impactSummary: "Heavy freight restricted to 15 km/h; alternate bypass recommended for critical medical logistics",
    affectedFleets: ["MED-NER-101"],
    description: "Teesta river scouring caused 18-meter longitudinal crack in riverbank retaining wall."
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-901",
    title: "Monsoon Heavy Rainfall Alert: East Jaintia Hills Sector",
    severity: "CAUTION",
    category: "Severe Weather",
    state: "Meghalaya",
    district: "East Jaintia Hills",
    corridor: "NH-06",
    timestamp: "12 mins ago",
    source: "Explainable Risk Engine (IMD Radar Feed)",
    provenance: "DEMO WEATHER DATA",
    impact: "Potential flash mudflow at tunnel approaches",
    recommendedAction: "Advise transport dispatchers to throttle convoy speeds to <= 25 km/h"
  },
  {
    id: "ALT-902",
    title: "Single-File Heavy Axle Restriction on Teesta Sevoke Bridge",
    severity: "CAUTION",
    category: "Bridge Restriction",
    state: "Sikkim",
    district: "Kalimpong Gateway",
    corridor: "NH-10",
    timestamp: "28 mins ago",
    source: "BRO Bridge Safety Cell",
    provenance: "VERIFIED DATA RECORD",
    impact: "Convoys over 24T diverted to Lava-Rhenock route",
    recommendedAction: "Reroute multi-axle freight via alternative bypass"
  }
];

export const INITIAL_PENDING_REPORTS = [
  {
    id: "REP-FIELD-704",
    incidentType: "Landslide",
    state: "Nagaland",
    district: "Chümoukedima",
    corridor: "NH-29 (Dimapur - Kohima)",
    coordinates: [25.7400, 93.9900],
    locationName: "Pagal Pahar Sinking Zone, KM 42",
    severity: "CRITICAL",
    reporterRole: "Field Official (Disaster Response Cell)",
    reporterName: "Inspector R. Jamir",
    reporterPhone: "+91-94360-11223",
    timestamp: "5 mins ago",
    description: "Sudden boulder slide and debris block covering 35 meters of both carriage lanes following intense rainfall. Immediate road disruption required.",
    photoUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'><rect width='400' height='240' fill='%23F5F4EF'/><path d='M40 180 L180 80 L280 140 L360 60 L380 200 Z' fill='%23C8C4B8'/><circle cx='120' cy='60' r='24' fill='%23D97706'/><text x='200' y='210' font-family='sans-serif' font-size='14' font-weight='bold' fill='%232C2D31' text-anchor='middle'>GEO-TAGGED EVIDENCE PHOTO: NH-29 DEBRIS</text></svg>",
    status: "PENDING_VERIFICATION",
    provenance: "SIMULATED FIELD SUBMISSION"
  }
];
