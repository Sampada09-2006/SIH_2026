# DRISHTI — Addendum to implementation_plan.md

Apply these two additional corrections on top of the current implementation_plan.md
(the "Updated" version with tile provider, fleet-service porting, SOS dispatch, and
legacy file removal already incorporated). Do not regenerate the rest of the plan.

## 1. SMTP is optional — must degrade safely, not silently
`.env.example` lists `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` as optional.
Confirm explicitly in `server.py` and `sos-service.js`:
- If any SMTP variable is missing/unset, the SOS flow MUST automatically fall back
  to `SIMULATED DISPATCH (DEMO MODE)` — never throw, never hang, never silently
  no-op.
- The UI status indicator on the SOS console must make it obvious at a glance
  whether the last dispatch was `LIVE SMTP TRANSMISSION` or `SIMULATED DISPATCH`,
  not just log it to console.
- Document in README.md exactly which .env values are required to flip SOS from
  simulated to live, so this isn't discovered for the first time on demo day.

## 2. Authority contact addresses must default to safe placeholders
`js/data/ner-geography.js` defines SDMA/NDMA/MoRTH contact emails used by the SOS
service. Explicitly require:
- All contact emails shipped in the repo by default must be placeholder/demo
  addresses (e.g. a test inbox the team controls) — NOT real government
  disaster-management authority addresses — unless the team deliberately
  substitutes verified real addresses themselves.
- Add a code comment / README note at the contact-list definition warning that
  swapping in real authority addresses will cause live SOS test triggers to
  reach real agencies, and that this should only be done intentionally, not by
  default.

