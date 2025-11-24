import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./type";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCodes } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";

function App() {
  const [cordinates, setCoords] = useState<Coords>({ lat: 30, lon: 50 });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeoCodes(location),
  });
  const coords =
    location === "custom"
      ? cordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };
  const handleChangeCoordinates = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8 mt-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Location</h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Map Type</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>

      <Map
        coords={coords}
        setCordinates={handleChangeCoordinates}
        mapType={mapType}
      />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}

export default App;
