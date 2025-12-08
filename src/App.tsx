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
import Menu from "./assets/menu.svg?react";
import MobileHeader from "./components/MobileHeader";
import LightDarkToggle from "./components/LightDarkToggle";

function App() {
  const [cordinates, setCoords] = useState<Coords>({ lat: 30, lon: 50 });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className="flex flex-col gap-8 pt-4 md:pt-8 p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1200px]">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Location</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Map Type</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="ml-auto flex gap-4 items-center">
            <LightDarkToggle />
            {!isSidePanelOpen && (
              <button
                className="hidden md:block"
                onClick={() => setIsSidePanelOpen(true)}
              >
                <Menu className="size-8 invert  lg:hidden" />
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative  h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <MapLegend mpaType={mapType} />
            <Map
              coords={coords}
              setCordinates={handleChangeCoordinates}
              mapType={mapType}
            />
          </div>
          <div className="col-span-1 md:col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5 2xl:">
            <Suspense fallback={<AditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
