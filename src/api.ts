import { GeocodeSchema } from "./schemas/geocodeSchema";
import { weatherApiResponseSchema } from "./schemas/weatherSchema";

export async function getWeather({ lat, long }: { lat: number; long: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely,alerts&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();
  return weatherApiResponseSchema.parse(data);
}

export async function getGeoCodes(location: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = await res.json();

  return GeocodeSchema.parse(data);
}
