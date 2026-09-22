/**
 * DRISHTI - Live Weather Service
 * Fetches weather securely through the Vercel backend.
 */

export async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to fetch weather data");
    }

    return {
      ...data,
      isSimulated: false,
      source: "OpenWeather Live API"
    };

  } catch (error) {
    console.error("DRISHTI Weather Error:", error);

    return {
      error: true,
      message: error.message,
      isSimulated: false
    };
  }
}