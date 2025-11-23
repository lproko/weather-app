import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import Cloud from "../../assets/cloud.svg?react";
import Wind from "../../assets/wind.svg?react";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Uv from "../../assets/uv.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import Uparrow from "../../assets/uparrow.svg?react";

type Props = {};

const AdditionalInfo = ({}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, long: 60 }),
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map(({ label, value, Icon }) => (
        <div key={value} className="flex justify-between">
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8 invert" />
          </div>
          <span>
            {<FormatComponent value={value} number={data?.current[value]} />}
          </span>
        </div>
      ))}
    </Card>
  );
};

export default AdditionalInfo;

const FormatComponent = ({
  value,
  number,
}: {
  value: string;
  number: number;
}) => {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  if (value === "wind_deg")
    return (
      <Uparrow
        className="size-8 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );

  return number;
};

const rows = [
  { label: "Sunrise", value: "sunrise", Icon: Sunrise },
  { label: "Sunset", value: "sunset", Icon: Sunset },
  { label: "Pressure", value: "pressure", Icon: Pressure },
  { label: "UV Index", value: "uvi", Icon: Uv },
  { label: "Wind Direction", value: "wind_deg", Icon: Wind },
  { label: "Cloud Coverage", value: "clouds", Icon: Cloud },
] as const;
