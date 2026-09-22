"""
DRISHTI - Local Development & Presentation Server
North Eastern Region Logistics Platform
"""

import functools
import http.server
import json
import os
import smtplib
import socketserver
import ssl
import sys
import urllib.request
from datetime import datetime
from email.message import EmailMessage

from ml.predict import predict_risk


# ============================================================
# SERVER SETTINGS
# ============================================================

PORT = int(os.environ.get("PORT", "8080"))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


# ============================================================
# OPTIONAL ENVIRONMENT VARIABLES
# ============================================================

SMTP_HOST = os.environ.get("SMTP_HOST", "").strip()
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "").strip()
SMTP_PASS = os.environ.get("SMTP_PASS", "").strip()

SOS_FROM = os.environ.get(
    "SOS_FROM",
    SMTP_USER or "drishti-emergency@ner-demo.gov.in"
)

GEMINI_API_KEY = os.environ.get(
    "GEMINI_API_KEY",
    ""
).strip()

SOS_TEST_RECIPIENT = os.environ.get(
    "SOS_TEST_RECIPIENT",
    ""
).strip()


# ============================================================
# SOS FALLBACK TEMPLATE
# ============================================================

def fallback_template_draft(payload):

    coords = payload.get("coords") or {}

    if coords:
        loc = (
            f"Latitude {coords.get('lat')}, "
            f"Longitude {coords.get('lng')} "
            f"(Accuracy ~{coords.get('accuracyM', 25)}m)\n"
            f"Map URL: https://www.google.com/maps?"
            f"q={coords.get('lat')},{coords.get('lng')}"
        )
    else:
        loc = "GPS unavailable on reporting device."

    return (
        "URGENT DISTRESS BROADCAST — DRISHTI PLATFORM\n"
        f"Reference ID   : {payload.get('sosId')}\n"
        f"Timestamp      : {payload.get('raisedAtIso')}\n"
        f"Calamity Type  : {payload.get('emergencyType')}\n"
        f"State / Region : {payload.get('stateLabel')}\n"
        f"Persons At Risk: {payload.get('peopleCount', 1)}\n"
        f"Reported By    : {payload.get('contactName')} "
        f"({payload.get('contactPhone')})\n\n"
        f"GEOLOCATION:\n{loc}\n\n"
        "SITUATION DESCRIPTION:\n"
        f"{payload.get('description', 'Immediate rescue requested.')}\n\n"
        "ACTION REQUIRED:\n"
        "Immediate dispatch of emergency response team and "
        "heavy highway clearance machinery.\n\n"
        "— Autonomous Emergency Dispatch, DRISHTI Platform"
    )


# ============================================================
# GEMINI / TEMPLATE DRAFTING
# ============================================================

def generate_distress_email(payload):

    if not GEMINI_API_KEY:
        return (
            fallback_template_draft(payload),
            "Deterministic Template"
        )

    prompt = (
        "You are the Emergency Dispatch Officer of DRISHTI, "
        "an AI logistics and accessibility platform for India's "
        "North Eastern Region. Write a formal, factual, "
        "high-priority distress alert to government disaster "
        "authorities requesting immediate rescue. Do not invent "
        "facts. Include the exact coordinates, Google Maps link, "
        "reference ID, and a clear one-line ask for action.\n\n"
        + json.dumps(payload, ensure_ascii=False)
    )

    url = (
        "https://generativelanguage.googleapis.com/"
        "v1beta/models/gemini-2.0-flash:generateContent"
        f"?key={GEMINI_API_KEY}"
    )

    body = json.dumps({
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }).encode("utf-8")

    request = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": "application/json"
        }
    )

    try:

        with urllib.request.urlopen(
            request,
            timeout=12
        ) as response:

            data = json.loads(
                response.read().decode("utf-8")
            )

        text = (
            data["candidates"][0]
            ["content"]["parts"][0]["text"]
            .strip()
        )

        return (
            text or fallback_template_draft(payload),
            "Gemini AI Engine"
        )

    except Exception as e:

        print(
            f"[SOS] Gemini error: {e}"
        )

        return (
            fallback_template_draft(payload),
            "Deterministic Template (AI Fallback)"
        )


# ============================================================
# SMTP
# ============================================================

def attempt_smtp_dispatch(
    recipients,
    subject,
    body
):

    if not (
        SMTP_HOST
        and SMTP_USER
        and SMTP_PASS
    ):
        return (
            False,
            "SMTP not configured; using simulated dispatch."
        )

    target_recipients = (
        [SOS_TEST_RECIPIENT]
        if SOS_TEST_RECIPIENT
        else [
            r.get("email")
            for r in recipients
            if r.get("email")
        ]
    )

    if not target_recipients:

        return (
            False,
            "No valid recipient email addresses."
        )

    message = EmailMessage()

    message["Subject"] = subject
    message["From"] = SOS_FROM
    message["To"] = ", ".join(target_recipients)

    message.set_content(body)

    try:

        if SMTP_PORT == 465:

            context = ssl.create_default_context()

            with smtplib.SMTP_SSL(
                SMTP_HOST,
                SMTP_PORT,
                context=context,
                timeout=15
            ) as smtp:

                smtp.login(
                    SMTP_USER,
                    SMTP_PASS
                )

                smtp.send_message(message)

        else:

            with smtplib.SMTP(
                SMTP_HOST,
                SMTP_PORT,
                timeout=15
            ) as smtp:

                smtp.starttls(
                    context=ssl.create_default_context()
                )

                smtp.login(
                    SMTP_USER,
                    SMTP_PASS
                )

                smtp.send_message(message)

        return (
            True,
            f"Delivered via live SMTP to "
            f"{len(target_recipients)} recipient(s)."
        )

    except Exception as e:

        print(
            f"[SOS] SMTP error: {e}"
        )

        return (
            False,
            str(e)
        )


# ============================================================
# REQUEST HANDLER
# ============================================================

class DrishtiHandler(
    http.server.SimpleHTTPRequestHandler
):

    extensions_map = {
        "": "application/octet-stream",
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg"
    }


    # ========================================================
    # HEADERS
    # ========================================================

    def end_headers(self):

        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )

        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
        )

        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )

        self.send_header(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        )

        super().end_headers()


    # ========================================================
    # OPTIONS
    # ========================================================

    def do_OPTIONS(self):

        self.send_response(200)
        self.end_headers()


    # ========================================================
    # GET
    # ========================================================

    def do_GET(self):

        clean_path = (
            self.path.split("?")[0]
        )

        print(
            f"[DEBUG] GET path: {repr(clean_path)}"
        )

        # ---------------- HEALTH ----------------

        if clean_path == "/api/health":

            response = {
                "status": "HEALTHY",
                "platform": "DRISHTI",
                "version": "1.0.0",
                "smtpConfigured": bool(
                    SMTP_HOST
                    and SMTP_USER
                    and SMTP_PASS
                ),
                "aiDraftingConfigured": bool(
                    GEMINI_API_KEY
                ),
                "serverTime": datetime.now().isoformat()
            }

            self.send_response(200)

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(
                json.dumps(response).encode("utf-8")
            )

            return

        return super().do_GET()


    # ========================================================
    # POST
    # ========================================================

    def do_POST(self):

        clean_path = (
            self.path.split("?")[0]
        )

        print(
            f"[DEBUG] POST path: {repr(clean_path)}"
        )


        # ====================================================
        # AI / ML RISK PREDICTION
        # ====================================================

        if clean_path == "/api/predict-risk":

            print(
                "[ML] Risk prediction request received"
            )

            length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            raw_body = self.rfile.read(
                length
            ).decode("utf-8")

            print(
                f"[ML] Request body: {raw_body}"
            )

            try:

                payload = json.loads(
                    raw_body
                )

            except Exception as e:

                print(
                    f"[ML] JSON error: {e}"
                )

                self.send_response(400)

                self.send_header(
                    "Content-Type",
                    "application/json"
                )

                self.end_headers()

                self.wfile.write(
                    json.dumps({
                        "ok": False,
                        "error": "Invalid JSON body"
                    }).encode("utf-8")
                )

                return


            # --------------------------------------------
            # PREDICT
            # --------------------------------------------

            try:

                result = predict_risk(

                    rainfall=payload.get(
                        "rainfall",
                        0
                    ),

                    slope=payload.get(
                        "slope",
                        0
                    ),

                    road_condition=payload.get(
                        "road_condition",
                        "good"
                    ),

                    incidents=payload.get(
                        "incidents",
                        0
                    ),

                    congestion=payload.get(
                        "congestion",
                        0
                    ),

                    data_age=payload.get(
                        "data_age",
                        0
                    )
                )


                response_data = {

                    "ok": True,

                    "prediction": result["risk"],

                    "confidence": result["confidence"],

                    "model": "Random Forest",

                    "source": "DRISHTI ML Risk Model"

                }


                print(
                    "[ML] Prediction:",
                    result["risk"]
                )

                print(
                    "[ML] Confidence:",
                    result["confidence"],
                    "%"
                )


                self.send_response(200)

                self.send_header(
                    "Content-Type",
                    "application/json"
                )

                self.end_headers()

                self.wfile.write(
                    json.dumps(
                        response_data
                    ).encode("utf-8")
                )

                return


            except Exception as e:

                print(
                    f"[ML] Prediction error: {e}"
                )

                self.send_response(500)

                self.send_header(
                    "Content-Type",
                    "application/json"
                )

                self.end_headers()

                self.wfile.write(
                    json.dumps({
                        "ok": False,
                        "error": str(e)
                    }).encode("utf-8")
                )

                return


        # ====================================================
        # SOS
        # ====================================================

        elif clean_path == "/api/sos":

            length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            raw_body = self.rfile.read(
                length
            ).decode("utf-8")

            try:

                payload = json.loads(
                    raw_body
                )

            except Exception:

                self.send_response(400)

                self.send_header(
                    "Content-Type",
                    "application/json"
                )

                self.end_headers()

                self.wfile.write(
                    json.dumps({
                        "ok": False,
                        "error": "Invalid JSON body"
                    }).encode("utf-8")
                )

                return


            email_body, drafting_engine = (
                generate_distress_email(
                    payload
                )
            )


            subject = (
                f"[URGENT SOS - "
                f"{payload.get('sosId')}] "
                f"{payload.get('emergencyType')} "
                f"in {payload.get('stateLabel')}"
            )


            smtp_success, smtp_msg = (
                attempt_smtp_dispatch(
                    payload.get(
                        "recipients",
                        []
                    ),
                    subject,
                    email_body
                )
            )


            delivery_mode = (
                "LIVE_SMTP"
                if smtp_success
                else "SIMULATED_DISPATCH"
            )


            response_data = {

                "ok": True,

                "sosId": payload.get(
                    "sosId"
                ),

                "deliveryMode":
                    delivery_mode,

                "status": (
                    "TRANSMITTED"
                    if smtp_success
                    else
                    "SIMULATED_DISPATCH_RECORDED"
                ),

                "draftingEngine":
                    drafting_engine,

                "emailBody":
                    email_body,

                "sentTo": [
                    r.get("email")
                    for r in payload.get(
                        "recipients",
                        []
                    )
                ],

                "smtpMessage":
                    smtp_msg,

                "timestamp":
                    datetime.now().isoformat()
            }


            self.send_response(200)

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(
                json.dumps(
                    response_data
                ).encode("utf-8")
            )

            print(
                f"[SOS] Processed "
                f"{payload.get('sosId')} "
                f"-> {delivery_mode}"
            )

            return


        # ====================================================
        # FIELD REPORT
        # ====================================================

        elif clean_path == "/api/field-report":

            length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            raw_body = self.rfile.read(
                length
            ).decode("utf-8")


            try:

                report = json.loads(
                    raw_body
                )

            except Exception:

                report = {}


            response_data = {

                "ok": True,

                "status":
                    "QUEUED_IN_CONTROL_ROOM",

                "report":
                    report
            }


            self.send_response(200)

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(
                json.dumps(
                    response_data
                ).encode("utf-8")
            )

            print(
                "[FIELD REPORT] Received"
            )

            return


        # ====================================================
        # UNKNOWN POST
        # ====================================================

        print(
            f"[ERROR] Unknown POST route: "
            f"{repr(clean_path)}"
        )

        self.send_response(404)

        self.send_header(
            "Content-Type",
            "application/json"
        )

        self.end_headers()

        self.wfile.write(
            json.dumps({
                "ok": False,
                "error": "Unknown POST route",
                "pathReceived": clean_path
            }).encode("utf-8")

        )


# ============================================================
# THREADED SERVER
# ============================================================

class ThreadedHTTPServer(
    socketserver.ThreadingMixIn,
    http.server.HTTPServer
):

    daemon_threads = True


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":

    handler_class = functools.partial(
        DrishtiHandler,
        directory=DIRECTORY
    )

    server = ThreadedHTTPServer(
        ("", PORT),
        handler_class
    )

    print(
        "============================================================="
    )

    print(
        f"DRISHTI Web Platform running on "
        f"http://localhost:{PORT}"
    )

    print(
        "AI/ML Risk Prediction API enabled"
    )

    print(
        "============================================================="
    )


    try:

        server.serve_forever()

    except KeyboardInterrupt:

        print(
            "\nStopping DRISHTI Server."
        )

        server.server_close()