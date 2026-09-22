/**
 * DRISHTI - Explainable Risk Engine
 * Computes deterministic, transparent multi-factor risk scores (0-100)
 * Adheres to: "Never show a risk number without an explanation" and "Silence is Not Safety".
 */

export class RiskEngine {
  /**
   * Calculate composite risk score for a road corridor or transport segment
   * @param {Object} inputs
   * @param {number} inputs.rainfallMmPerHour - Precipitation intensity
   * @param {number} inputs.slopeInstability - Slope vulnerability index (0 to 1)
   * @param {string} inputs.roadCondition - 'A' (Excellent) | 'B' (Good) | 'C' (Degraded) | 'D' (Damaged)
   * @param {number} inputs.verifiedIncidentsCount - Number of confirmed blocking incidents
   * @param {number} inputs.trafficCongestionIndex - Traffic density index (0 to 1)
   * @param {number} inputs.dataFreshnessMinutes - Minutes since last sensor/field verification
   */
  static evaluateSegmentRisk(inputs = {}) {
    const {
      rainfallMmPerHour = 0,
      slopeInstability = 0.2,
      roadCondition = 'B',
      verifiedIncidentsCount = 0,
      trafficCongestionIndex = 0.3,
      dataFreshnessMinutes = 10
    } = inputs;

    const factors = [];

    // 1. Rainfall / Cloudburst Factor (Weight: up to 35 pts)
    let rainScore = 0;
    if (rainfallMmPerHour > 50) rainScore = 35;
    else if (rainfallMmPerHour > 25) rainScore = 25;
    else if (rainfallMmPerHour > 10) rainScore = 15;
    else if (rainfallMmPerHour > 0) rainScore = 5;

    factors.push({
      factor: "Precipitation / Rainfall",
      contribution: rainScore >= 25 ? "High" : (rainScore >= 10 ? "Moderate" : "Low"),
      points: rainScore,
      description: `${rainfallMmPerHour} mm/h precipitation recorded in mountain sector.`
    });

    // 2. Slope Instability & Landslide Susceptibility (Weight: up to 30 pts)
    const slopeScore = Math.round(slopeInstability * 30);
    factors.push({
      factor: "Slope Instability & Topography",
      contribution: slopeScore >= 20 ? "High" : (slopeScore >= 10 ? "Moderate" : "Low"),
      points: slopeScore,
      description: `Geotechnical vulnerability index rated at ${(slopeInstability * 100).toFixed(0)}%.`
    });

    // 3. Verified Field Incidents (Weight: up to 40 pts)
    let incidentScore = Math.min(40, verifiedIncidentsCount * 25);
    if (verifiedIncidentsCount > 0) {
      factors.push({
        factor: "Verified Field Incidents",
        contribution: "Critical",
        points: incidentScore,
        description: `${verifiedIncidentsCount} active verified incident(s) reported on this segment.`
      });
    }

    // 4. Pavement & Infrastructure Quality (Weight: up to 15 pts)
    let roadScore = 0;
    if (roadCondition === 'D') roadScore = 15;
    else if (roadCondition === 'C') roadScore = 10;
    else if (roadCondition === 'B') roadScore = 4;
    else roadScore = 1;

    factors.push({
      factor: "Pavement & Drainage Condition",
      contribution: roadScore >= 10 ? "Moderate" : "Low",
      points: roadScore,
      description: `Surface rating Grade ${roadCondition}.`
    });

    // 5. Data Freshness Penalty ("Silence is Not Safety") (Weight: up to 20 pts)
    let freshnessPenalty = 0;
    let freshnessStatus = "FRESH";
    if (dataFreshnessMinutes > 60) {
      freshnessPenalty = 20;
      freshnessStatus = "DATA_STALE";
    } else if (dataFreshnessMinutes > 30) {
      freshnessPenalty = 10;
      freshnessStatus = "MODERATE_FRESHNESS";
    }

    if (freshnessPenalty > 0) {
      factors.push({
        factor: "Data Freshness Uncertainty",
        contribution: "Caution",
        points: freshnessPenalty,
        description: `Last verified ${dataFreshnessMinutes}m ago. Uncertainty penalty applied per 'Silence is Not Safety' rule.`
      });
    }

    // Calculate total score capped at 100
    const rawTotal = rainScore + slopeScore + incidentScore + roadScore + freshnessPenalty + Math.round(trafficCongestionIndex * 10);
    const totalScore = Math.min(100, Math.max(0, rawTotal));

    // Determine Risk Band
    let riskBand = "LOW";
    let colorHex = "#16A34A"; // Muted Green
    if (totalScore >= 75) {
      riskBand = "CRITICAL";
      colorHex = "#DC2626"; // Red
    } else if (totalScore >= 50) {
      riskBand = "HIGH";
      colorHex = "#EA580C"; // Orange
    } else if (totalScore >= 25) {
      riskBand = "MODERATE";
      colorHex = "#D97706"; // Amber
    }

    return {
      score: totalScore,
      riskBand,
      colorHex,
      factors,
      freshnessStatus,
      confidencePct: Math.max(50, 100 - (dataFreshnessMinutes > 30 ? 30 : 5)),
      provenance: "EXPLAINABLE RISK ENGINE — COMPUTED"
    };
  }
}
