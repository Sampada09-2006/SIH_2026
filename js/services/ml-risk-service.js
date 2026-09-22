/**
 * DRISHTI - ML Risk Prediction Service
 *
 * Connects the frontend to the Python Random Forest
 * risk prediction API.
 */

export class MLRiskService {

  /**
   * Send road/environment data to the Python ML API.
   *
   * @param {Object} inputs
   * @returns {Promise<Object>}
   */
  static async predictRisk(inputs = {}) {

    const payload = {

      rainfall:
        Number(
          inputs.rainfallMmPerHour ?? 0
        ),

      slope:
        Number(
          inputs.slopeInstability ?? 0
        ),

      road_condition:
        this.convertRoadCondition(
          inputs.roadCondition
        ),

      incidents:
        Number(
          inputs.verifiedIncidentsCount ?? 0
        ),

      congestion:
        Number(
          inputs.trafficCongestionIndex ?? 0
        ),

      data_age:
        Number(
          inputs.dataFreshnessMinutes ?? 0
        )

    };


    try {

      const response =
        await fetch(
          "/api/predict-risk",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(payload)
          }
        );


      if (!response.ok) {

        throw new Error(
          `ML API returned HTTP ${response.status}`
        );

      }


      const result =
        await response.json();


      if (!result.ok) {

        throw new Error(
          result.error ||
          "ML prediction failed"
        );

      }


      return result;

    }

    catch (error) {

      console.error(
        "DRISHTI ML Risk Service Error:",
        error
      );

      throw error;

    }

  }


  /**
   * Convert DRISHTI road grades
   * into the values expected by
   * the Python ML model.
   *
   * A = Excellent
   * B = Good
   * C = Degraded
   * D = Damaged
   */
  static convertRoadCondition(
    roadCondition
  ) {

    const mapping = {

      A: "excellent",
      B: "good",
      C: "degraded",
      D: "damaged",

      excellent: "excellent",
      good: "good",
      degraded: "degraded",
      damaged: "damaged"

    };


    return (
      mapping[roadCondition] ||
      "good"
    );

  }

}