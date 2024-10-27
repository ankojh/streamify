export function DashboardSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="flex md:flex gap-8 mb-8">
        <div className="animate-pulse w-[240px] h-[150px] bg-gray-200 rounded-md"></div>
        <div className="animate-pulse w-[240px] h-[150px] bg-gray-200 rounded-md"></div>
        <div className="animate-pulse w-[240px] h-[150px] bg-gray-200 rounded-md"></div>
        <div className="animate-pulse w-[240px] h-[150px] bg-gray-200 rounded-md"></div>
        <div className="animate-pulse w-[240px] h-[150px] bg-gray-200 rounded-md"></div>
      </div>
      <div className="w-full mb-8 animate-pulse h-[500px] bg-gray-200 rounded-md"></div>
      <div className="flex md:flex-row flex-col gap-8 mb-8">
        <div className="animate-pulse flex-1  h-[350px] bg-gray-200 rounded-md"></div>
        <div className="animate-pulse flex-1  h-[350px] bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
