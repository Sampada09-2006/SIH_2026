# DRISHTI --- 100% FRESH BUILD --- ANTIGRAVITY MASTER PROMPT

## 0. CRITICAL INSTRUCTION: BUILD FROM ZERO

Create **DRISHTI as a completely new project from scratch**.

The previous DRISHTI/SIH project ZIP may exist in the workspace, but it
is **NOT the codebase for this build**.

### DO NOT:

-   modify the old project
-   repair the old project
-   refactor the old project
-   copy its components
-   copy its CSS
-   copy its JavaScript
-   copy its data files
-   copy its mock datasets
-   copy its old architecture
-   copy its old color scheme
-   inherit its UI
-   inherit its bugs
-   merge the old project with the new project

You may inspect the old project **ONLY to understand the SIH problem
requirements and identify mistakes that must not be repeated**.

Create a completely independent, clean project with a new folder
structure, new components, new services, new styling, new data
architecture and new implementation.

------------------------------------------------------------------------

# 1. PRODUCT

Build:

**DRISHTI**

**AI-Based Smart Logistics and Accessibility Intelligence Platform for
North Eastern Region**

Tagline:

**Know the Road Before You Take It.**

Problem Statement:

**SIH26002**

The platform is designed around road accessibility, disruption
intelligence, route optimization, essential-goods logistics, fleet
tracking, field reporting, alerts, emergency response and
low-connectivity operation across the North Eastern Region of India.

The final prototype should feel like a **credible real-world
logistics/GIS control platform**.

It must NOT look like: - a generic AI dashboard - a student template - a
gaming UI - a futuristic sci-fi interface - a crypto dashboard - a
marketing-only website - an AI-generated mockup

------------------------------------------------------------------------

# 2. DEVELOPMENT APPROACH

Build in this order:

1.  Project foundation
2.  Design system
3.  Landing page
4.  Application shell
5.  GIS/map layer
6.  Road intelligence
7.  Risk engine
8.  Route planner
9.  Fleet tracking
10. Alerts
11. Field reporting
12. Control Room
13. SOS
14. Offline synchronization
15. Multilingual architecture
16. Analytics
17. Demo scenario
18. Backend/API abstraction
19. Validation/testing
20. Final visual and data-integrity audit

Do not generate a giant monolithic file.

Keep the application modular.

------------------------------------------------------------------------

# 3. UI COLOR RULE --- ABSOLUTE

## THE ENTIRE WEBSITE MUST NEVER USE BLUE OR BLACK.

This is a strict global rule.

### NEVER USE:

-   black
-   near-black
-   navy
-   dark blue
-   blue
-   cyan-blue
-   blue gradients
-   black backgrounds
-   dark blue sidebars
-   black headers
-   blue buttons
-   blue links
-   blue icons
-   blue map controls
-   black cards
-   blue hover states

This applies to **every single page and component**.

### USE INSTEAD:

Primary base: - white - warm white - ivory - very light neutral gray

Text: - charcoal gray - dark neutral gray

Accent: - yellow - gold - saffron/golden yellow

Status: - muted green = verified / operational - amber/orange =
caution - red = critical / emergency

Use neutral gray rather than black for text.

Do not introduce purple or neon colors either.

### IMPORTANT

Third-party libraries may contain blue/black defaults.

Override their styling.

Before finalizing, visually inspect the entire application for any
accidental blue or black.

------------------------------------------------------------------------

# 4. ZERO EMOJIS

The website UI must contain **ZERO decorative emojis**.

Never use:

🚚 🚨 📍 🌧️ 🛣️ ⚠️ 📡 🛰️ 🔊 etc.

Do not use emoji characters for: - vehicles - roads - weather - alerts -
states - cargo - locations - emergency - users - navigation

Use professional SVG icons.

Use one consistent icon library such as Lucide or another professional
SVG icon system.

No random icon styles.

------------------------------------------------------------------------

# 5. REALISTIC VISUAL DESIGN

The application should resemble a:

-   logistics command center
-   GIS operations platform
-   transportation monitoring system
-   emergency coordination platform

### Design characteristics

-   bright professional interface
-   white/ivory base
-   yellow/gold accent
-   charcoal-gray text
-   restrained borders
-   subtle shadows
-   realistic tables
-   useful filters
-   practical map controls
-   clear timestamps
-   source indicators
-   verification states
-   realistic spacing
-   professional typography

### AVOID

-   excessive glassmorphism
-   excessive rounded cards
-   giant glowing numbers
-   neon effects
-   excessive gradients
-   excessive shadows
-   floating decorative shapes
-   excessive animations
-   fake charts
-   fake activity feeds
-   fake counters
-   random statistics
-   random map markers

Every visual element must have a purpose.

------------------------------------------------------------------------

# 6. DATA HONESTY --- NON-NEGOTIABLE

Never present invented information as real.

Every operational data record must clearly belong to one of these
states.

## VERIFIED / LIVE

Only when connected to an actual source.

Show: - source - timestamp - freshness

## SIMULATED DEMO DATA

Used for controlled prototype scenarios.

Clearly label:

-   `SIMULATED DEMO DATA`
-   `SIMULATED GPS`
-   `DEMO WEATHER DATA`
-   `SIMULATED INCIDENT`
-   `DEMO SCENARIO`

## UNAVAILABLE / UNVERIFIED

When trustworthy data does not exist.

Display:

`UNAVAILABLE / UNVERIFIED`

Never fill missing information with invented values.

------------------------------------------------------------------------

# 7. NEVER FABRICATE GOVERNMENT INFORMATION

Do NOT invent:

-   government email addresses
-   government phone numbers
-   government officials
-   government APIs
-   government integrations
-   government statistics
-   official road closures
-   official emergency confirmations
-   authority delivery confirmations

If an integration is not actually connected:

`INTEGRATION NOT CONNECTED`

For demo functionality:

`DEMO MODE — NO LIVE GOVERNMENT CONNECTION`

------------------------------------------------------------------------

# 8. LANDING PAGE --- JUDGE FIRST

The application MUST open on the landing page.

Do not open directly into the dashboard.

The landing page should communicate immediately:

# DRISHTI

## Know the Road Before You Take It.

Supporting description:

**AI-powered road intelligence, accessibility monitoring and logistics
coordination for the North Eastern Region.**

Show the operational flow:

**DATA SOURCES → DATA VALIDATION → RISK ANALYSIS → ROAD INTELLIGENCE →
ROUTE & LOGISTICS DECISIONS → CONTROL ROOM ACTION**

Primary button:

**Enter Command Center**

Secondary button:

**View System Architecture**

Optional:

**Run Judge Demo**

The landing page should NOT be overloaded with charts.

No fake statistics.

No fake live map.

No emojis.

No blue.

No black.

------------------------------------------------------------------------

# 9. NORTHEASTERN REGION COVERAGE

Support all 8 states:

1.  Arunachal Pradesh
2.  Assam
3.  Manipur
4.  Meghalaya
5.  Mizoram
6.  Nagaland
7.  Sikkim
8.  Tripura

Provide state and district filtering.

Do not claim real-time coverage where actual data is unavailable.

------------------------------------------------------------------------

# 10. COMMAND CENTER

After `Enter Command Center`, show the main operational interface.

Header: - DRISHTI - global search - connectivity status - language
selector - user/role - emergency/SOS access

Navigation:

1.  Overview
2.  Regional Command Map
3.  Road Status
4.  Route Planner
5.  Fleet Tracking
6.  Alerts
7.  Field Reporting
8.  Control Room
9.  NER Analytics
10. Emergency / SOS
11. Offline Sync
12. SMS / USSD / IVR
13. Architecture / About

Make navigation responsive.

------------------------------------------------------------------------

# 11. REGIONAL GIS MAP

Build a genuine interactive GIS map.

Use a real map provider through a clean map-service abstraction.

Possible implementation: - Leaflet + OpenStreetMap - Google Maps if
properly configured

Do not display a screenshot pretending to be a live map.

Layers:

-   roads
-   corridors
-   districts
-   hazards
-   vehicles
-   field reports
-   risk zones
-   weather where actually available

Controls:

-   search
-   state filter
-   district filter
-   layer control
-   legend
-   zoom
-   reset
-   locate-me

Do not place random markers.

Every marker must represent an actual data record or a clearly labelled
simulation.

------------------------------------------------------------------------

# 12. ROAD ACCESSIBILITY

Road records should contain:

-   Road ID
-   Road name
-   State
-   District
-   Road type
-   status
-   risk score
-   risk factors
-   last verified
-   freshness
-   incidents
-   source
-   verification status

Statuses:

-   Operational
-   Caution
-   Restricted
-   Disrupted
-   Closed
-   Unknown / Unverified

Do not communicate status through color alone.

------------------------------------------------------------------------

# 13. BRIDGE ACCESSIBILITY

Treat bridges as first-class infrastructure.

Show:

-   bridge ID
-   bridge name
-   connected roads
-   state
-   district
-   status
-   risk
-   last verified
-   source
-   restrictions

Support bridge-related incidents:

-   structural damage
-   flooding
-   weight restriction
-   closure
-   traffic restriction

------------------------------------------------------------------------

# 14. DISRUPTION PREDICTION

Support prediction/intelligence for:

-   landslides
-   floods
-   heavy rainfall
-   road damage
-   bridge damage
-   traffic congestion
-   severe weather
-   field incidents
-   slope instability
-   poor road condition

Create a clear intelligence service.

Do not claim a trained ML model unless a genuine trained model exists.

For prototype intelligence, call it:

**Explainable Risk Engine**

or

**Rule-Based Risk Intelligence**

------------------------------------------------------------------------

# 15. RISK ENGINE

Risk inputs:

-   rainfall
-   precipitation
-   severe weather
-   slope instability
-   road condition
-   traffic
-   field reports
-   verified incidents
-   data freshness

Output:

-   0--100 score
-   risk band
-   contributing factors
-   explanation
-   freshness/confidence indicator

Example:

`Risk Score: 78 — HIGH`

Contributors:

-   Rainfall --- High contribution
-   Slope instability --- Moderate contribution
-   Verified incident --- High contribution
-   Traffic --- Low contribution

Never show only a number without explanation.

------------------------------------------------------------------------

# 16. PRINCIPLE: SILENCE IS NOT SAFETY

If fresh data is unavailable, do not show:

`SAFE`

Instead show:

`UNKNOWN / UNVERIFIED`

or

`DATA STALE`

This principle must appear in the application's operational logic.

------------------------------------------------------------------------

# 17. ROUTE PLANNER

Inputs:

-   origin
-   destination
-   cargo
-   priority
-   vehicle type
-   departure/time constraints

Compare alternative routes.

Show:

-   route
-   distance
-   ETA
-   estimated delay
-   risk
-   disrupted segments
-   reason
-   data freshness

Example:

### Route A

Risk: High Delay: 45 min

### Route B

Risk: Moderate Delay: 20 min

Do not simply call a route "safe" when data is stale.

If the calculation uses simulation:

`ROUTE ANALYSIS — SIMULATED DEMO SCENARIO`

------------------------------------------------------------------------

# 18. ESSENTIAL SUPPLY LOGISTICS

Support cargo categories:

-   medicines
-   food/essential commodities
-   agricultural produce
-   construction materials

Priority:

-   Critical
-   High
-   Normal

Route and fleet decisions should take cargo priority into account.

------------------------------------------------------------------------

# 19. FLEET TRACKING

Vehicle fields:

-   Vehicle ID
-   cargo
-   priority
-   current location
-   destination
-   speed
-   heading
-   ETA
-   route
-   route risk
-   delivery status
-   telemetry freshness

Statuses:

-   En Route
-   Delayed
-   At Risk
-   Rerouted
-   Delivered
-   GPS Unavailable

For simulation:

`SIMULATED GPS — DEMO MODE`

Never imply synthetic telemetry is real.

------------------------------------------------------------------------

# 20. AUTOMATED ALERTS

Alert categories:

-   blocked road
-   inaccessible region
-   delayed delivery
-   high-risk corridor
-   severe weather
-   route disruption
-   vehicle deviation
-   bridge restriction
-   verified incident

Each alert must contain:

-   title
-   severity
-   state
-   district
-   road/corridor
-   issue
-   timestamp
-   updated time
-   source
-   verification
-   impact
-   recommended action

Do not generate random alerts.

------------------------------------------------------------------------

# 21. FIELD REPORTING

Create a realistic field-report workflow.

Form:

-   incident type
-   description
-   GPS
-   timestamp
-   photo
-   road/corridor
-   severity
-   reporter role

Incident types:

-   Landslide
-   Flood
-   Road Damage
-   Bridge Damage
-   Traffic Blockage
-   Accident
-   Fallen Tree
-   Weather Obstruction
-   Other

Workflow:

**Submit → Pending Verification → Review → Verify/Reject → Intelligence
Update**

A field report must NOT automatically become a verified closure.

------------------------------------------------------------------------

# 22. CONTROL ROOM

Control Room should show:

-   active disruptions
-   critical corridors
-   vehicles at risk
-   delayed deliveries
-   pending field reports
-   high-risk routes
-   stale data
-   emergency/SOS events

Actions:

-   Verify
-   Reject
-   Escalate
-   Mark Disrupted
-   Recommend Reroute
-   Notify Fleet
-   Resolve

Actions must update application state.

------------------------------------------------------------------------

# 23. SOS / EMERGENCY

Include a real SOS workflow in the prototype.

Capture:

-   emergency type
-   GPS if permission is granted
-   timestamp
-   description
-   optional photo
-   vehicle/user context where available

In demo mode:

**DEMO ONLY --- NOT SENT TO AUTHORITIES**

The prototype may create an SOS payload and queue it.

Never claim an authority received it unless a real notification provider
confirms delivery.

Never invent government recipients.

------------------------------------------------------------------------

# 24. OFFLINE / LOW CONNECTIVITY

Support low-network operation.

Display:

-   Online
-   Offline
-   Syncing
-   Last Sync
-   Pending Sync
-   Sync Failed

Offline queue:

-   field reports
-   SOS events
-   relevant local updates

On reconnection, synchronize.

Never display fake successful synchronization.

------------------------------------------------------------------------

# 25. SMS / USSD / IVR FALLBACK

Include prototype simulators for:

-   SMS
-   USSD
-   IVR

Clearly display:

`SIMULATOR — DEMO MODE`

Show realistic message/flow previews.

Do not claim actual messages were sent without a real provider.

------------------------------------------------------------------------

# 26. MULTILINGUAL ARCHITECTURE

Create structured locale files.

Architecture should support:

-   English
-   Hindi
-   Assamese
-   Bengali
-   Bodo
-   Meitei/Manipuri
-   Khasi
-   Garo
-   Mizo
-   Nagamese
-   Nepali
-   Kokborok

Do not fake "official" translations.

If a translation has not been reviewed:

`REVIEW REQUIRED`

Language selector should work at least for the implemented translations.

------------------------------------------------------------------------

# 27. WEATHER INTEGRATION

Create a service abstraction such as:

`WeatherProvider`

If a real weather API is configured:

-   fetch actual data
-   display provider
-   display timestamp
-   display freshness
-   validate values
-   feed relevant values into risk engine

If not:

`Weather data unavailable`

Never silently substitute fake weather.

------------------------------------------------------------------------

# 28. DATA PROVIDER ARCHITECTURE

Separate data providers from business logic.

Architecture:

``` text
UI
 ↓
API / Service Layer
 ↓
Validation
 ↓
Data Providers
 ↓
Risk / Route Intelligence
 ↓
Database / Cache
```

Potential production integrations can be designed for:

-   MoRTH
-   NHAI
-   NHIDCL
-   State PWD departments
-   State transport departments
-   BRO
-   district/local authorities
-   weather providers
-   traffic providers
-   GPS providers

These must be treated as **integration targets**, not claimed as
connected unless actually connected.

------------------------------------------------------------------------

# 29. BACKEND ARCHITECTURE

Design the project to support a secure backend.

Entities:

-   users
-   roles
-   roads
-   bridges
-   districts
-   corridors
-   incidents
-   field_reports
-   vehicles
-   telemetry
-   alerts
-   routes
-   deliveries
-   sos_events
-   sync_queue
-   audit_logs

Roles:

-   Admin
-   Control Room Operator
-   Field Official
-   Logistics Dispatcher
-   Viewer

Use role-based access where authentication exists.

------------------------------------------------------------------------

# 30. SECURITY

Never expose:

-   API keys
-   passwords
-   private tokens
-   secrets

Use environment variables.

Provide:

`.env.example`

with placeholders only.

Validate user input.

Validate uploaded files.

Do not expose secrets in browser logs.

------------------------------------------------------------------------

# 31. AUDIT LOGS

Record important operational actions:

-   actor
-   role
-   action
-   record
-   timestamp
-   previous state
-   new state

Examples:

`Field report verified`

`Route recommendation generated`

`Vehicle marked at risk`

`SOS queued offline`

------------------------------------------------------------------------

# 32. DATA FRESHNESS

Operational records must show freshness.

Examples:

`Updated 3 min ago`

`Last verified 18 min ago`

`Data stale`

`Source unavailable`

For simulations:

`SIMULATED DEMO DATA`

Do not use fake LIVE badges.

------------------------------------------------------------------------

# 33. ANALYTICS

Include useful analytics only:

-   state-wise connectivity
-   risk distribution
-   incidents by type
-   route disruptions
-   fleet status
-   delayed deliveries
-   verification queue
-   data freshness

If data is simulated:

`SIMULATED DEMO DATA`

Do not fabricate impressive percentages.

------------------------------------------------------------------------

# 34. JUDGE DEMO

Create a controlled end-to-end demonstration.

Scenario:

1.  Medicine convoy starts.
2.  Vehicle appears on map as `SIMULATED GPS`.
3.  Heavy rainfall scenario begins.
4.  Risk increases.
5.  Field official submits a landslide report.
6.  Report enters `PENDING VERIFICATION`.
7.  Control Room verifies report.
8.  Road becomes disrupted.
9.  Route Planner recalculates alternatives.
10. ETA/delay changes.
11. Fleet receives simulated reroute notification.
12. Control Room monitors new route.
13. Offline mode is demonstrated.
14. Audit history records the actions.

Every simulated event must display:

`DEMO MODE`

The complete story:

**SEE → UNDERSTAND → PREDICT → REROUTE → TRACK → ALERT → RESPOND**

------------------------------------------------------------------------

# 35. ARCHITECTURE PAGE

Include:

``` text
Field / Weather / Traffic / Transport Data
                ↓
          Data Validation
                ↓
        Risk & Accessibility
             Engine
                ↓
       GIS + Route Intelligence
                ↓
       Fleet + Logistics Layer
                ↓
          Control Room
                ↓
      Alerts / Field Response
                ↓
       Offline / SMS / USSD
```

Clearly separate:

### Implemented

### Simulated Demo

### Production Roadmap

Never overclaim.

------------------------------------------------------------------------

# 36. PRODUCTION ROADMAP

Show future integrations honestly:

-   live weather APIs
-   live traffic feeds
-   government transport integrations
-   real GPS telemetry
-   persistent database
-   cloud deployment
-   WebSocket/SSE real-time updates
-   trained ML predictive model
-   historical-data analytics
-   production authentication
-   production authorization

Roadmap features must NOT appear as implemented features.

------------------------------------------------------------------------

# 37. RESPONSIVE DESIGN

Test the fresh build at:

-   mobile
-   tablet
-   laptop
-   desktop
-   large desktop

Check:

-   no horizontal overflow
-   map resizing
-   usable tables
-   usable filters
-   accessible SOS
-   responsive navigation
-   multilingual text
-   touch targets

------------------------------------------------------------------------

# 38. ACCESSIBILITY

Implement:

-   semantic HTML
-   form labels
-   keyboard navigation
-   visible focus states
-   ARIA labels where necessary
-   `aria-live` for important updates
-   correct language attributes
-   readable contrast
-   reduced-motion support

Never communicate critical information through color alone.

------------------------------------------------------------------------

# 39. ANIMATION

Only subtle meaningful animations:

-   landing reveal
-   route recalculation
-   alert transitions
-   map updates
-   loading states

No:

-   bouncing UI
-   excessive spinning
-   neon glow
-   distracting parallax
-   unnecessary motion

Respect:

`prefers-reduced-motion`

------------------------------------------------------------------------

# 40. ICON SYSTEM

Use one professional SVG icon system.

Recommended:

**Lucide**

or another consistent SVG library.

No emojis.

No mixed icon styles.

------------------------------------------------------------------------

# 41. EMPTY / ERROR STATES

Every major feature needs meaningful states.

Examples:

`No verified incidents available.`

`Weather source unavailable.`

`Fleet GPS unavailable.`

`No matching routes.`

`No pending reports.`

`Map provider unavailable.`

`Translation unavailable — English fallback active.`

`Offline — updates will be queued.`

Never replace errors with invented data.

------------------------------------------------------------------------

# 42. NO RANDOM DATA

This is especially important.

Do not populate the application with meaningless random:

-   vehicles
-   roads
-   incidents
-   alerts
-   weather
-   statistics
-   users
-   GPS points
-   delivery numbers

If demo data is needed, create a **small, coherent scenario dataset**
specifically designed for the judge demonstration and label it clearly
as simulated.

The simulated records must be internally consistent.

Example:

If a simulated landslide affects a road, the same road should: - appear
on the map - show the incident - have increased risk - affect route
planning - affect relevant fleet routes - generate the corresponding
alert

Do not create disconnected fake features.

------------------------------------------------------------------------

# 43. NO FAKE LIVE MAP

Do not label the map:

`LIVE`

unless genuine live data is connected.

Instead use:

`GIS MAP`

and display individual data states.

Example:

`SIMULATED VEHICLE`

`VERIFIED INCIDENT`

`DATA UNAVAILABLE`

------------------------------------------------------------------------

# 44. NO FAKE COUNTERS

Never create numbers such as:

`1,284 active vehicles`

`98.7% connectivity`

`43 live incidents`

unless those values actually come from a real dataset or a clearly
labelled simulated dataset.

------------------------------------------------------------------------

# 45. NO FAKE GOVERNMENT BRANDING

Do not use official government logos unless properly sourced and
permitted.

Do not create fake government seals.

Do not imply endorsement.

------------------------------------------------------------------------

# 46. DESIGN SYSTEM

Create reusable design tokens for:

-   background
-   surface
-   border
-   text
-   muted text
-   primary yellow/gold
-   success
-   warning
-   danger
-   spacing
-   typography
-   radius
-   shadows

Ensure the tokens contain **no blue or black**.

------------------------------------------------------------------------

# 47. COMPONENT ARCHITECTURE

Use reusable components such as:

-   Header
-   Sidebar
-   PageHeader
-   StatusBadge
-   DataFreshness
-   SourceBadge
-   VerificationBadge
-   RiskScore
-   RiskFactorList
-   MapView
-   MapLegend
-   RoadTable
-   RouteCard
-   VehicleCard
-   AlertCard
-   FieldReportForm
-   IncidentDetails
-   ControlRoomPanel
-   SOSPanel
-   OfflineStatus
-   LanguageSelector
-   EmptyState
-   ErrorState
-   LoadingState
-   DemoModeBanner

Adapt names to the chosen framework.

------------------------------------------------------------------------

# 48. SERVICE ARCHITECTURE

Separate:

-   map service
-   weather service
-   route service
-   fleet service
-   alert service
-   field-report service
-   SOS service
-   offline service
-   translation service
-   risk engine
-   authentication service

Demo providers should be separate from real providers.

Example:

``` text
WeatherProvider
 ├── RealWeatherProvider
 └── DemoWeatherProvider
```

The UI should know whether the provider is real or simulated.

------------------------------------------------------------------------

# 49. REAL VS DEMO PROVIDERS

Use a clear provider architecture.

For example:

``` text
DataProvider
    ↓
ProviderFactory
    ├── LiveProvider
    └── DemoProvider
```

Never mix demo data directly into production service logic.

------------------------------------------------------------------------

# 50. ERROR HANDLING

Handle:

-   API failure
-   network failure
-   timeout
-   invalid response
-   stale data
-   unavailable map
-   GPS permission denied
-   GPS unavailable
-   offline mode
-   failed sync
-   failed photo upload

Do not silently fail.

------------------------------------------------------------------------

# 51. TESTING

Before completion:

-   run build
-   inspect console
-   test every navigation item
-   test forms
-   test route workflow
-   test field report workflow
-   test verification workflow
-   test SOS workflow
-   test offline queue
-   test language switch
-   test responsive layout
-   test map
-   test demo scenario

Fix broken imports and console errors.

------------------------------------------------------------------------

# 52. FINAL VISUAL AUDIT

Before declaring complete, check the ENTIRE website.

### MUST PASS:

-   [ ] Zero blue
-   [ ] Zero black
-   [ ] Zero emojis
-   [ ] No neon
-   [ ] No unnecessary gradients
-   [ ] No fake counters
-   [ ] No random data
-   [ ] No fake government contacts
-   [ ] No fake government integrations
-   [ ] No fake official statistics
-   [ ] No fake live GPS
-   [ ] No fake live weather
-   [ ] No fake delivery confirmations
-   [ ] No fake SOS delivery confirmations
-   [ ] No fake LIVE labels
-   [ ] No random map markers
-   [ ] No fake government logos
-   [ ] Professional SVG icons
-   [ ] White/ivory professional interface
-   [ ] Yellow/gold accent
-   [ ] Charcoal-gray text
-   [ ] Green/amber/red status colors only where meaningful
-   [ ] Consistent typography
-   [ ] Realistic control-room appearance

------------------------------------------------------------------------

# 53. FINAL SIH REQUIREMENT AUDIT

Confirm implementation coverage for:

-   [ ] Real-time road accessibility architecture
-   [ ] Bridge accessibility
-   [ ] District monitoring
-   [ ] Remote-location monitoring
-   [ ] Landslide disruption
-   [ ] Flood disruption
-   [ ] Heavy rainfall
-   [ ] Road damage
-   [ ] Traffic congestion
-   [ ] Disruption prediction
-   [ ] Alternate route recommendation
-   [ ] ETA/delay estimation
-   [ ] Essential commodity logistics
-   [ ] GPS vehicle tracking architecture
-   [ ] Automated alerts
-   [ ] Field geo-tagged reports
-   [ ] Photograph evidence
-   [ ] Verification workflow
-   [ ] Central dashboard
-   [ ] Logistics bottlenecks
-   [ ] Supply-chain gaps
-   [ ] Emergency/disaster routes
-   [ ] Delivery movement/status
-   [ ] Multilingual support
-   [ ] Offline synchronization
-   [ ] Weather integration architecture
-   [ ] GIS architecture
-   [ ] Secure backend architecture
-   [ ] SOS/emergency workflow
-   [ ] SMS/USSD/IVR fallback architecture

------------------------------------------------------------------------

# 54. FINAL IMPLEMENTATION RULE

Do not try to impress the judge by adding hundreds of superficial
features.

Build a smaller number of **deeply connected, believable workflows**.

The most important demonstration should be:

**Road disruption → verification → risk increase → route impact →
alternate route → fleet reroute → alert → control-room response →
offline fallback**

The system should communicate:

**SEE → UNDERSTAND → PREDICT → REROUTE → TRACK → ALERT → RESPOND**

------------------------------------------------------------------------

# 55. FINAL INSTRUCTION

Build this as a **100% fresh DRISHTI application**.

Do not reuse the previous project's implementation.

Do not inherit its styling.

Do not inherit its data.

Do not inherit its architecture.

Do not inherit its fake/placeholder information.

Use the old project only as background reference if necessary.

The final application must be:

**credible, clean, operational, honest, modular, responsive, accessible,
SIH-aligned and visually professional.**

Most importantly:

> **Never make the prototype look real by pretending simulated
> information is real. Make it look real through architecture, UX,
> coherent workflows, data provenance, timestamps, verification states
> and honest demo labeling.**

At the end, provide a concise implementation report:

1.  Project structure
2.  Files created
3.  Dependencies
4.  Environment variables
5.  Implemented features
6.  Simulated features
7.  Unavailable integrations
8.  Production roadmap
9.  Test/build result
10. Known limitations

