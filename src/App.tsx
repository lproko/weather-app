import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./type";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCodes } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AditionalInfoSkeleton from "./components/skeletons/AditionalInfoSkeleton";
import SidePanel from "./components/SidePanel";

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
    <>
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
        <div className="relative">
          <MapLegend mpaType={mapType} />
          <Map
            coords={coords}
            setCordinates={handleChangeCoordinates}
            mapType={mapType}
          />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
        </Suspense>
      </div>
      <SidePanel coords={coords} />
    </>
  );
}

export default App;
