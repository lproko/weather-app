import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const DailySkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="flex justify-between">
          <Skeleton className="w-9 h-8" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="w-9 h-8" />
          <Skeleton className="w-9 h-8" />
          <Skeleton className="w-9 h-8" />
        </div>
      ))}
    </Card>
  );
};

export default DailySkeleton;
