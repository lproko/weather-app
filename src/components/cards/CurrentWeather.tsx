import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {};

const CurrentWeather = ({}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, long: 60 }),
  });
  return (
    <Card
      childrenClassName="flex flex-col gap-6 items-center"
      title="Current Weather"
    >
      <h1 className="text-6xl font-semibold items-center">
        {Math.round(data?.current.temp)}°C
      </h1>
      <WeatherIcon className="size-16" icon={data?.current.weather[0].icon} />
      <h3 className="capitalize text-xl">
        {data?.current.weather[0].description}
      </h3>
      <p className="text-xl">Local Time</p>
      <h1 className="font-semibold">
        {" "}
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(data?.current.dt * 1000))}{" "}
      </h1>
      <div className="flex gap-4">
        <div>Hum : {Math.round(data?.current.humidity)}%</div>
        <div> Feels Like: {Math.round(data?.current.feels_like)}°C</div>
        <div> Wind: {Math.round(data?.current.wind_speed)} km/h</div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
