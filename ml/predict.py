import os
import pickle


# =========================================================
# DRISHTI AI RISK PREDICTION
# =========================================================

# Find main project folder
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Find trained model
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "risk_model.pkl"
)


# =========================================================
# LOAD TRAINED MODEL
# =========================================================

with open(
    MODEL_PATH,
    "rb"
) as file:

    model = pickle.load(file)


# =========================================================
# PREDICT RISK
# =========================================================

def predict_risk(
    rainfall,
    slope,
    road_condition,
    incidents,
    congestion,
    data_age
):

    road_conditions = {
        "excellent": 1,
        "good": 2,
        "degraded": 3,
        "damaged": 4
    }

    road_value = road_conditions.get(
        road_condition.lower(),
        2
    )

    # Same feature order used during training
    features = [[
        float(rainfall),
        float(slope),
        road_value,
        int(incidents),
        float(congestion),
        float(data_age)
    ]]

    # ML prediction
    prediction = model.predict(
        features
    )[0]

    # Prediction confidence
    probabilities = model.predict_proba(
        features
    )[0]

    confidence = max(
        probabilities
    ) * 100

    return {
        "risk": prediction,
        "confidence": round(
            confidence,
            2
        )
    }


# =========================================================
# TEST THE MODEL
# =========================================================

if __name__ == "__main__":

    result = predict_risk(
        rainfall=70,
        slope=0.8,
        road_condition="degraded",
        incidents=2,
        congestion=0.5,
        data_age=10
    )

    print("\nDRISHTI AI PREDICTION")
    print("-" * 40)

    print(
        "Risk:",
        result["risk"]
    )

    print(
        "Confidence:",
        result["confidence"],
        "%"
    )

    print("-" * 40)