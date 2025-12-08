import { getAirPollution } from "@/api";
import type { Coords } from "@/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import InfoIcon from "../assets/info-icon.svg";
import LeftIcon from "../assets/chevronLeft.svg?react";
import SideCardSkeleton from "./skeletons/SideCardSkeleton";

type Props = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const SidePanel = (props: Props) => {
  const { isSidePanelOpen, setIsSidePanelOpen } = props;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-auto transition-transform duration-300 lg:translate-x-0!",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)}>
        <LeftIcon className="size-8 invert -ml-2 lg:hidden" />
      </button>
      <Suspense fallback={<SideCardSkeleton />}>
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
      <div className="flex items-center gap-3 ">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <img src={InfoIcon} alt="Info Icon" className="size-5 invert" />
          </TooltipTrigger>
          <TooltipContent className="z-2000">
            <p className="max-w-xs">
              Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good,
              2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {Object.entries(data.list[0].components).map(([item, value]) => {
        const polution =
          AirQualityTable[4].ranges[
            item.toUpperCase() as keyof Record<Pollutant, Range>
          ];
        const max = Math.max(polution?.min, value);
        return (
          <Card
            key={item}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
          >
            <div className="flex justify-between ">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{item}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      src={InfoIcon}
                      alt="Info Icon"
                      className="size-5 invert"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="z-2000">
                    <p className="max-w-xs">
                      Concentration of{" "}
                      {
                        PollutantNames[
                          item.toUpperCase() as keyof Record<Pollutant, string>
                        ]
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between ">
              {AirQualityTable.map((polution) => {
                if (
                  item.toUpperCase() === "NH3" ||
                  item.toUpperCase() === "NO"
                ) {
                  console.log(polution);
                  console.log(item.toUpperCase());
                }

                const min =
                  polution.ranges[
                    item.toUpperCase() as keyof Record<Pollutant, Range>
                  ].min;
                const max =
                  polution.ranges[
                    item.toUpperCase() as keyof Record<Pollutant, Range>
                  ].max === null
                    ? polution.ranges[
                        item.toUpperCase() as keyof Record<Pollutant, Range>
                      ].min
                    : polution.ranges[
                        item.toUpperCase() as keyof Record<Pollutant, Range>
                      ].max;

                const currnetLevel = value >= min && (max ? value < max : true);
                const currentStatus = currnetLevel ? polution.title : "";
                const qulityColor = () => {
                  switch (currentStatus) {
                    case "Good":
                      return "bg-green-500";
                    case "Fair":
                      return "bg-yellow-500";
                    case "Moderate":
                      return "bg-orange-500";
                    case "Poor":
                      return "bg-red-500";
                    case "Very Poor":
                      return "bg-purple-500";
                    default:
                      return "bg-zinc-500";
                  }
                };
                return (
                  <span
                    className={clsx(
                      "px-2 py-1 rounded-md text-xs font-medium",
                      currnetLevel
                        ? qulityColor()
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {polution.title}
                  </span>
                );
              })}
            </div>
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

type Pollutant = "SO2" | "NO" | "NO2" | "NH3" | "PM10" | "PM2_5" | "O3" | "CO";

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
      NH3: { min: 0, max: 40 },
      NO: { min: 0, max: 20 },
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
      NH3: { min: 40, max: 70 },
      NO: { min: 20, max: 40 },
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
      NH3: { min: 70, max: 150 },
      NO: { min: 40, max: 60 },
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
      NH3: { min: 150, max: 200 },
      NO: { min: 60, max: 80 },
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
      NH3: { min: 200, max: null },
      NO: { min: 100, max: null },
      NO2: { min: 200, max: null },
      PM10: { min: 200, max: null },
      PM2_5: { min: 75, max: null },
      O3: { min: 180, max: null },
      CO: { min: 15400, max: null },
    },
  },
];

const PollutantNames: Record<Pollutant, string> = {
  SO2: "Sulfur Dioxide",
  NO2: "Nitrogen Dioxide",
  NO: "Nitric Oxide",
  PM10: "Particulate Matter 10µm",
  PM2_5: "Particulate Matter 2.5µm",
  O3: "Ozone",
  CO: "Carbon Monoxide",
  NH3: "Ammonia",
};
