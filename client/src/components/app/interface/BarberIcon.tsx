import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure skeleton styles are applied
import { Barber } from "../../../utils/types"; // Adjust the import path as needed

interface BarberProps {
  item: Barber;
  openServiceId: string | null;
  setOpenServiceId: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

export default function BarberIcon({ item, openServiceId, setOpenServiceId, isLoading }: BarberProps) {
  return (
    <div key={item.slug} className="text-white flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden relative">
          {item.avatar ? <img src={item.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <Skeleton circle={true} height={48} width={48} baseColor="#4A90E2" />}
        </div>
        <div className="flex flex-col gap-1.5 relative">
          <p className="text-lg shrink">
            {isLoading ? <Skeleton width={100} /> : item.fullname} -{" "}
            <span
              className="text-[#4A90E2] text-xs cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setOpenServiceId(item.slug);
              }}
            >
              Services
              {openServiceId === item.slug && (
                <div className="z-50 absolute top-full mt-2 left-0 p-2 bg-white shadow-md border border-gray-300 rounded-lg">
                  {item.services && item.services.length > 0 ? item.services.map((service, index) => <p key={index}>{service}</p>) : <Skeleton count={3} />}
                </div>
              )}
            </span>
          </p>
          <p className="text-xs">{isLoading ? <Skeleton width={150} /> : item.address}</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <p className="shrink-0">
          {isLoading ? (
            <Skeleton width={50} />
          ) : (
            <>
              {item.rate} <span className="text-xs text-[#B0B0B0]">({item.reviews_count})</span>
            </>
          )}
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
  );
}
