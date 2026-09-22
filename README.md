# DRISHTI — AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region

**Problem Statement ID:** SIH26002  
**Tagline:** *Know the Road Before You Take It.*  
**Operational Loop:** $\text{SEE} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{PREDICT} \longrightarrow \text{REROUTE} \longrightarrow \text{TRACK} \longrightarrow \text{ALERT} \longrightarrow \text{RESPOND}$

---

## 1. Executive Summary & Design Principles

DRISHTI is an operational GIS and logistics intelligence platform specifically designed for the extreme terrain, monsoon flash floods, landslide vulnerabilities, and connectivity constraints of India's **8 North Eastern States** (*Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura*).

### Strict Aesthetic & Design Rules
1. **Zero Blue & Zero Black (Absolute Constraint)**:
   - Built on a warm ivory base (`#FAF9F6`), crisp white surfaces (`#FFFFFF`), warm saffron/golden yellow accents (`#D97706`, `#EAB308`), charcoal text (`#2C2D31`, `#595D66`), and operational status colors (green/amber/red).
   - Plain OpenStreetMap tiles are overlaid with a custom warm CSS filter (`sepia(18%) saturate(85%) hue-rotate(5deg) contrast(95%) brightness(101%)`) eliminating blue waters and black lines.
2. **Zero Decorative Emojis**:
   - 100% crisp pure SVG icon engine with 45+ domain icons.
3. **Data Honesty & Provenance**:
   - Every operational record displays its provenance badge (`VERIFIED / LIVE`, `SIMULATED DEMO DATA`, `SIMULATED GPS`, `UNAVAILABLE / UNVERIFIED`).
   - "Silence is Not Safety" principle when data is missing or stale.

---

## 2. Core Functional Modules (13 Interactive Views)

1. **Judge First Landing Page**: High-impact introduction with operational pipeline visualizer and quick CTAs.
2. **Command Overview**: High-level situational picture, KPI metrics, active disruption feed, and highway status.
3. **Regional GIS Map**: Full interactive Leaflet map with multi-layer filtering (Corridors, Bridges, Hazards, Convoys, Field Reports).
4. **Road & Bridge Status**: Comprehensive 8-state highway and first-class bridge infrastructure database with weight limits and flood clearances.
5. **Route Planner**: Multi-factor route comparison prioritizing critical cold-chain medicines, essential food supplies, and agricultural produce.
6. **Fleet Tracking**: Logistics convoy monitoring with live simulated GPS movement (3s tick, speed/heading progression).
7. **Automated Alerts**: Automated hazard notifications and recommended dispatcher responses.
8. **Field Reporting**: Geo-tagged incident submission form with photo evidence upload and verification queue integration.
9. **Control Room**: Operator triage console with reactive action triggers (`Verify`, `Reject`, `Escalate`, `Mark Disrupted`, `Recommend Reroute`).
10. **NER Analytics**: State-by-state vulnerability indices and hazard distribution charts.
11. **Emergency SOS**: Distress console broadcasting GPS coordinates to SDMA & NDMA authorities with live SMTP / safe simulated degradation.
12. **Offline Sync**: Low-connectivity monitor with simulated network drop and automatic queue flushing.
13. **2G Fallback Simulator**: Interactive feature phone simulator for SMS queries (`STATUS NH29`), USSD speed dials (`*999*29#`), and IVR regional voice prompts.
14. **Architecture & About**: End-to-end data pipeline diagram and live cryptographic audit ledger.

---

## 3. Quick Start & Execution

### Prerequisites
- Python 3.8+ (No Node.js or npm build dependencies required; uses modern native ES Modules).

### Launching the Platform
```bash
# 1. Clone or navigate to the project directory
cd d:/SIH__2026

# 2. Run the high-performance threaded server
python server.py
```
Open your browser and navigate to: **`http://localhost:8080`**

---

## 4. Emergency SOS Configuration & Safe Degradation

DRISHTI is engineered with **safe degradation**:
- **Default Safe Mode (Zero Setup)**: If no SMTP variables are set in `.env`, triggering the SOS will automatically perform a `SIMULATED DISPATCH (DEMO MODE)` using safe placeholder addresses (`@ner-demo.gov.in`). It will **never** throw, hang, or send unauthorized emails.
- **Optional Live SMTP**: To test live email delivery to a test inbox:
  ```powershell
  $env:SMTP_HOST="smtp.gmail.com"
  $env:SMTP_PORT="587"
  $env:SMTP_USER="your-email@gmail.com"
  $env:SMTP_PASS="your-16-char-app-password"
  $env:SOS_TEST_RECIPIENT="your-evaluation-inbox@example.com"
  python server.py
  ```

---

## 5. 14-Step Interactive Judge Demonstration

Click **"Run Judge Demonstration"** on the landing page or sidebar to trigger the step-by-step evaluation workflow:
1. Convoy `CONV-NL-408` initializes with CRITICAL infant nutrition cargo on NH-29.
2. Live telemetry verified as `SIMULATED GPS` on GIS Map.
3. Heavy monsoon rainfall surge simulated in Pagal Pahar sector.
4. Explainable Risk Engine elevates risk score to 84/100 with factor breakdown.
5. Field official submits geo-tagged landslide report with photo evidence.
6. Report enters `PENDING_VERIFICATION` in Control Room.
7. Operator inspects evidence and authorizes `VERIFY INCIDENT`.
8. Strategic corridor NH-29 marked `DISRUPTED` across GIS maps.
9. Route Planner calculates alternative bypass via Niuland / NH-02 Spur.
10. ETA and delay recalculated in real time.
11. Convoy `CONV-NL-408` receives simulated digital reroute notification.
12. Control Room live tracks active vehicle progression on detour.
13. Low-connectivity offline sync demonstrated with local queue storage.
14. Cryptographic audit log displays permanent verifiable trail.
