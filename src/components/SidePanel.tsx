import { getAirPollution } from "@/api";
import type { Coords } from "@/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";

type Props = {
  coords: Coords;
};

const SidePanel = (props: Props) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1001 py-8 px-4">
      <Suspense>
        <AirPollution coord={props.coords} />
      </Suspense>
    </div>
  );
};

export default SidePanel;

const AirPollution = ({ coord }: { coord: Coords }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coord],
    queryFn: () => getAirPollution({ lat: coord.lat, long: coord.lon }),
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Polution</h1>
      <h1 className="text-5xl font-semibold">{data?.list[0].main.aqi}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {Object.entries(data.list[0].components).map(([item, value]) => {
        return (
          <Card
            key={item}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
          >
            <div className="flex justify-between ">
              <span className="text-lg font-bold capitalize">{item}</span>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider min={0} disabled />
          </Card>
        );
      })}
    </div>
  );
};

type Range = {
  min: number;
  max: number | null; // null = no upper limit (e.g. ≥350)
};

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO";

type AQLevel = {
  title: string;
  index: number;
  ranges: Record<Pollutant, Range>;
};

export const AirQualityTable: AQLevel[] = [
  {
    title: "Good",
    index: 1,
    ranges: {
      SO2: { min: 0, max: 20 },
      NO2: { min: 0, max: 40 },
      PM10: { min: 0, max: 20 },
      PM2_5: { min: 0, max: 10 },
      O3: { min: 0, max: 60 },
      CO: { min: 0, max: 4400 },
    },
  },
  {
    title: "Fair",
    index: 2,
    ranges: {
      SO2: { min: 20, max: 80 },
      NO2: { min: 40, max: 70 },
      PM10: { min: 20, max: 50 },
      PM2_5: { min: 10, max: 25 },
      O3: { min: 60, max: 100 },
      CO: { min: 4400, max: 9400 },
    },
  },
  {
    title: "Moderate",
    index: 3,
    ranges: {
      SO2: { min: 80, max: 250 },
      NO2: { min: 70, max: 150 },
      PM10: { min: 50, max: 100 },
      PM2_5: { min: 25, max: 50 },
      O3: { min: 100, max: 140 },
      CO: { min: 9400, max: 12400 },
    },
  },
  {
    title: "Poor",
    index: 4,
    ranges: {
      SO2: { min: 250, max: 350 },
      NO2: { min: 150, max: 200 },
      PM10: { min: 100, max: 200 },
      PM2_5: { min: 50, max: 75 },
      O3: { min: 140, max: 180 },
      CO: { min: 12400, max: 15400 },
    },
  },
  {
    title: "Very Poor",
    index: 5,
    ranges: {
      SO2: { min: 350, max: null },
      NO2: { min: 200, max: null },
      PM10: { min: 200, max: null },
      PM2_5: { min: 75, max: null },
      O3: { min: 180, max: null },
      CO: { min: 15400, max: null },
    },
  },
];
