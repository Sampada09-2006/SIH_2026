import os
import random
import pickle

from sklearn.ensemble import RandomForestClassifier


# =========================================================
# DRISHTI AI/ML RISK PREDICTION MODEL
# =========================================================

# Find the main SIH__2026 folder
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Location where the trained model will be saved
MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "risk_model.pkl"
)


# =========================================================
# GENERATE TRAINING DATA
# =========================================================

def generate_training_data(samples=2000):

    X = []
    y = []

    # Convert road condition into numbers
    road_conditions = {
        "excellent": 1,
        "good": 2,
        "degraded": 3,
        "damaged": 4
    }

    for _ in range(samples):

        # Rainfall in mm
        rainfall = random.uniform(0, 100)

        # Slope value from 0 to 1
        slope = random.uniform(0, 1)

        # Road condition
        road_condition = random.choice(
            list(road_conditions.keys())
        )

        # Number of previous incidents
        incidents = random.randint(0, 3)

        # Traffic/congestion from 0 to 1
        congestion = random.uniform(0, 1)

        # Age of data in minutes
        data_age = random.uniform(0, 120)

        road_value = road_conditions[
            road_condition
        ]

        # =================================================
        # CALCULATE PROTOTYPE RISK
        # =================================================

        risk = 0

        # Rainfall
        if rainfall > 75:
            risk += 35

        elif rainfall > 50:
            risk += 28

        elif rainfall > 25:
            risk += 20

        elif rainfall > 10:
            risk += 10

        else:
            risk += 2

        # Slope
        risk += slope * 30

        # Previous incidents
        risk += incidents * 15

        # Road condition
        risk += (road_value - 1) * 5

        # Traffic
        risk += congestion * 10

        # Older information = more uncertainty
        if data_age > 90:
            risk += 20

        elif data_age > 60:
            risk += 12

        elif data_age > 30:
            risk += 5

        # Small random variation
        risk += random.uniform(-5, 5)

        # Keep risk between 0 and 100
        risk = max(
            0,
            min(100, risk)
        )

        # =================================================
        # RISK CLASS
        # =================================================

        if risk >= 75:
            label = "CRITICAL"

        elif risk >= 50:
            label = "HIGH"

        elif risk >= 25:
            label = "MODERATE"

        else:
            label = "LOW"

        # Features given to ML model
        X.append([
            rainfall,
            slope,
            road_value,
            incidents,
            congestion,
            data_age
        ])

        # Expected output
        y.append(label)

    return X, y


# =========================================================
# TRAIN MODEL
# =========================================================

def train_model():

    print("\n")
    print("=" * 60)
    print("DRISHTI AI/ML MODEL TRAINING")
    print("=" * 60)

    print("\nGenerating training data...")

    X, y = generate_training_data()

    print(
        f"Training samples: {len(X)}"
    )

    # Create Random Forest model
    model = RandomForestClassifier(
        n_estimators=150,
        max_depth=12,
        random_state=42,
        class_weight="balanced"
    )

    print("\nTraining Random Forest model...")

    model.fit(X, y)

    # Create models folder automatically
    os.makedirs(
        MODEL_DIR,
        exist_ok=True
    )

    # Save trained model
    with open(
        MODEL_PATH,
        "wb"
    ) as file:

        pickle.dump(
            model,
            file
        )

    # Training accuracy
    accuracy = model.score(
        X,
        y
    )

    print("\nModel trained successfully!")

    print(
        f"Training accuracy: "
        f"{accuracy * 100:.2f}%"
    )

    print("\nModel saved at:")

    print(MODEL_PATH)

    print("\nRisk classes:")

    print("LOW")
    print("MODERATE")
    print("HIGH")
    print("CRITICAL")

    print("\n")
    print("=" * 60)


# =========================================================
# START PROGRAM
# =========================================================

if __name__ == "__main__":

    train_model()