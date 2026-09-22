export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: "Latitude and longitude are required"
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Weather API key is not configured"
      });
    }

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${encodeURIComponent(lat)}` +
      `&lon=${encodeURIComponent(lon)}` +
      `&appid=${apiKey}` +
      `&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return res.status(response.status).json({
        error: errorData.message || "Weather API request failed"
      });
    }

    const data = await response.json();

    return res.status(200).json({
      location: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      rainfall: data.rain?.["1h"] || 0,
      weather: data.weather?.[0]?.main || "Unknown",
      description: data.weather?.[0]?.description || "",
      timestamp: Date.now()
    });

  } catch (error) {
    console.error("Weather API error:", error);

    return res.status(500).json({
      error: "Unable to fetch weather data"
    });
  }
}