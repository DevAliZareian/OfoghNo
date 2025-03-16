import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ShimmerEffect() {
  return (
    <SkeletonTheme baseColor="#4A90E2" highlightColor="#fff">
      <div className="text-white flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <Skeleton circle={true} height={48} width={48} />
          </div>
          <div className="flex flex-col gap-1.5 relative">
            <p className="text-lg shrink">
              <Skeleton width={100} />
            </p>
            <p className="text-xs">
              <Skeleton width={150} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <p className="shrink-0">
            <Skeleton width={50} />
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4A90E2" className="w-4">
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </SkeletonTheme>
  );
}
