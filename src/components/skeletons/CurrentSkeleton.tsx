import React from "react";
import Card from "../cards/Card";
import WeatherIcon from "../cards/WeatherIcon";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const CurrentSkeleton = (props: Props) => {
  return (
    <Card
      childrenClassName="flex flex-col gap-6 items-center"
      title="Current Weather"
    >
      <Skeleton className="w-30 h-15" />
      <Skeleton className="size-14 rounded-full" />
      <Skeleton className="w-36 h-7" />
      <p className="text-xl">Local Time</p>
      <Skeleton className="w-36 h-15" />
      <div className="flex gap-4">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-16 h-6" />
      </div>
    </Card>
  );
};

export default CurrentSkeleton;
