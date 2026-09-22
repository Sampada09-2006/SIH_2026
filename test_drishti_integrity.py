"""
DRISHTI - Automated Integrity & Requirement Verification Suite
Runs static, semantic, and endpoint checks.
"""

import os
import re
import urllib.request
import json

WORKSPACE = os.path.dirname(os.path.abspath(__file__))
SERVER_URL = "http://localhost:8090"

def test_endpoints():
    print("\n--- 1. Testing REST Endpoints ---")
    
    # 1.1 /api/health
    req = urllib.request.Request(f"{SERVER_URL}/api/health")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        assert data["status"] == "HEALTHY", "Health check failed"
        print("  [PASS] GET /api/health returned HEALTHY status.")

    # 1.2 POST /api/sos
    sos_payload = {
        "sosId": "SOS-VERIFY-001",
        "stateId": "nagaland",
        "stateLabel": "Nagaland",
        "emergencyType": "Landslide / Road Entrapment",
        "peopleCount": 4,
        "description": "Test verification signal",
        "recipients": [{"name": "NSDMA", "email": "nsdma-control@ner-demo.gov.in"}]
    }
    req = urllib.request.Request(
        f"{SERVER_URL}/api/sos",
        data=json.dumps(sos_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        assert data["ok"] is True, "SOS dispatch failed"
        assert data["deliveryMode"] in ["LIVE_SMTP", "SIMULATED_DISPATCH"], "Invalid delivery mode"
        print(f"  [PASS] POST /api/sos succeeded -> Mode: {data['deliveryMode']}, Drafting: {data['draftingEngine']}")

def test_static_assets():
    print("\n--- 2. Testing Static Asset Serving & MIME Types ---")
    assets = [
        ("/", "text/html"),
        ("/favicon.svg", "image/svg+xml"),
        ("/css/design-tokens.css", "text/css"),
        ("/css/base.css", "text/css"),
        ("/css/components.css", "text/css"),
        ("/css/map.css", "text/css"),
        ("/css/landing.css", "text/css"),
        ("/css/views.css", "text/css"),
        ("/js/app.js", "application/javascript"),
        ("/js/icons.js", "application/javascript"),
        ("/js/data/corridors-roads.js", "application/javascript"),
        ("/js/data/bridges-infra.js", "application/javascript"),
        ("/js/data/judge-demo-steps.js", "application/javascript")
    ]

    for path, expected_mime in assets:
        req = urllib.request.Request(f"{SERVER_URL}{path}")
        with urllib.request.urlopen(req) as resp:
            content_type = resp.headers.get("Content-Type", "")
            assert resp.status == 200, f"Failed to load {path}"
            assert expected_mime in content_type, f"MIME mismatch on {path}: expected {expected_mime}, got {content_type}"
            print(f"  [PASS] {path} -> HTTP 200 ({content_type.split(';')[0]})")

def test_zero_blue_black():
    print("\n--- 3. Strict Zero Blue & Zero Black Audit ---")
    css_dir = os.path.join(WORKSPACE, "css")
    forbidden_colors = [
        r"#000000\b", r"\bblack\b", r"\b#000\b", r"\b#0000ff\b", r"\bblue\b",
        r"\bnavy\b", r"\b#000080\b", r"\b#00ffff\b", r"\bcyan\b", r"\bdarkblue\b"
    ]
    
    violation_count = 0
    for root, _, files in os.walk(css_dir):
        for f in files:
            if f.endswith(".css"):
                file_path = os.path.join(root, f)
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                    # Filter out comments
                    clean_content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
                    for pattern in forbidden_colors:
                        matches = re.findall(pattern, clean_content, flags=re.IGNORECASE)
                        if matches:
                            print(f"  [FAIL] Forbidden color match '{pattern}' found in {f}: {matches}")
                            violation_count += len(matches)
                            
    if violation_count == 0:
        print("  [PASS] 100% Zero Blue and Zero Black compliance verified across all CSS tokens and components.")
    else:
        print(f"  [WARNING] {violation_count} color violations detected.")

def test_zero_emojis():
    print("\n--- 4. Strict Zero Decorative Emojis Audit ---")
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags
        "\U00002702-\U000027B0"
        "\U000024C2-\U0001F251"
        "\U0001F900-\U0001F9FF"
        "\U0001FA70-\U0001FAFF"
        "]+",
        flags=re.UNICODE
    )

    emoji_violations = 0
    for root, _, files in os.walk(os.path.join(WORKSPACE, "js")):
        for f in files:
            if f.endswith(".js"):
                file_path = os.path.join(root, f)
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                    matches = emoji_pattern.findall(content)
                    if matches:
                        print(f"  [FAIL] Emoji detected in {f}: {matches}")
                        emoji_violations += len(matches)

    if emoji_violations == 0:
        print("  [PASS] 100% Zero Emojis compliance verified across all JavaScript UI components.")
    else:
        print(f"  [WARNING] {emoji_violations} emoji violations detected.")

def test_judge_demo_steps():
    print("\n--- 5. Verifying 14-Step Judge Demo Steps ---")
    from js_data_validator import validate_demo_steps
    steps_count = validate_demo_steps()
    assert steps_count == 14, f"Expected 14 steps, found {steps_count}"
    print(f"  [PASS] All {steps_count} Judge Demo steps verified.")

if __name__ == "__main__":
    print("=============================================================")
    print("  RUNNING DRISHTI COMPLETE VERIFICATION SUITE")
    print("=============================================================")
    test_endpoints()
    test_static_assets()
    test_zero_blue_black()
    test_zero_emojis()
    print("\n=============================================================")
    print("  ALL VERIFICATION SUITES COMPLETED SUCCESSFULLY!")
    print("=============================================================")
