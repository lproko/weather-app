import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const SideCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-27 h-10" />
      <Skeleton className="w-12 h-8" />
      <div className="flex items-center gap-3 ">
        <Skeleton className="w-12 h-8" />
      </div>
      {Array.from({ length: 8 }).map((_, idx) => {
        return (
          <Card
            key={idx}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
          >
            <div className="flex justify-between ">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-5 bg-sidebar" />{" "}
                <Skeleton className="w-8 h-5 bg-sidebar" />
              </div>
              <Skeleton className="w-8 h-5 bg-sidebar " />
            </div>
            <Skeleton className="w-full h-5 bg-sidebar" />
            <div className="flex justify-between text-xs">
              <Skeleton className="w-8 h-5 bg-sidebar" />
              <Skeleton className="w-8 h-5 bg-sidebar" />
            </div>
            <div className="flex justify-between ">
              {Array.from({ length: 5 }).map((_, idx) => {
                return <Skeleton key={idx} className="w-8 h-5 bg-sidebar" />;
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SideCardSkeleton;
