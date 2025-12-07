import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const AditionalInfoSkeleton = () => {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="w-16 h-8" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <span>
            <Skeleton className="w-8 h-8" />
          </span>
        </div>
      ))}
    </Card>
  );
};

export default AditionalInfoSkeleton;
