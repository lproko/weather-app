import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "./WeatherIcon";

type Props = {};

const HourlyForecast = ({}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 30, long: 50 }),
  });

  return (
    <Card
      title="Hourly Forecast (48 hours)"
      childrenClassName="flex p-2 gap-6 overflow-x-scroll"
    >
      {data?.hourly.map((hours) => (
        <div key={hours.dt} className="flex flex-col gap-2 items-center p-2">
          <div>
            {new Date(hours.dt * 1000).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>

          <WeatherIcon icon={hours.weather[0].icon} />
          <div>{Math.round(hours.temp)}°C</div>
        </div>
      ))}
    </Card>
  );
};

export default HourlyForecast;
