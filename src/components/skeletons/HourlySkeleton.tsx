import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const HourlySkeleton = () => {
  return (
    <Card
      title="Hourly Forecast (48 hours)"
      childrenClassName="flex p-2 gap-6 overflow-x-scroll"
    >
      {Array.from({ length: 48 }).map((_, idx) => {
        return (
          <div key={idx} className="flex flex-col gap-2 items-center p-2">
            <Skeleton className="w-8 h-6" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="w-8 h-6" />
          </div>
        );
      })}
    </Card>
  );
};

export default HourlySkeleton;
