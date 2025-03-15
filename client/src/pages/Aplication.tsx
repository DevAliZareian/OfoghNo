import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Search } from "lucide-react";
import Services from "../components/Services";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useBarbers from "../hooks/useBarbers";
import { Barber } from "../utils/types";

type FilterType = "all" | "shops" | "hairStylists";

export default function Aplication() {
  //const { data, isLoading, error } = useFetchDataOnLoad<BarberResponse>("barbers", "barbers");
  const { search } = useParams();
  // State for the search text and selected services
  const [searchText, setSearchText] = useState(search || "");
  const [services, setServices] = useState<string[]>([]);

  const [filter, setFilter] = useState<FilterType>("all");

  // Use the custom hook to fetch barbers
  const { barbers, isLoading, isError } = useBarbers(services, searchText);

  const barberList: Barber[] = Array.isArray(barbers) ? barbers : barbers?.results || [];

  // Filter the list based on the selected filter.
  const filteredBarbers = useMemo(() => {
    if (!barbers) return [];
    switch (filter) {
      case "shops":
        return barberList.filter((barber: Barber) => barber.is_shop);
      case "hairStylists":
        return barberList.filter((barber: Barber) => !barber.is_shop);
      default:
        return barberList;
    }
  }, [barbers, filter]);

  const [openServiceId, setOpenServiceId] = useState("");

  return (
    <div onClick={() => setOpenServiceId("")} className="p-4 w-full min-h-screen bg-[#121212] flex flex-col items-center justify-start">
      <h1 className="text-4xl text-[#4A90E2] mt-4 transform flex items-center justify-center mb-8">Ali Zareian</h1>
      <main className="max-w-screen-md w-full flex flex-col items-center justify-center gap-4">
        <div className="relative w-full">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent border border-white text-[#E0E0E0] placeholder-[#E0E0E0] px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] transition-all duration-300 ease-in-out"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
        </div>

        <div className="flex items-center justify-between w-full">
          <h2 className="text-3xl text-[#4A90E2]">Barbers</h2>
          <select
            className="bg-transparent border border-white text-white rounded-lg w-max px-4 py-2 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "shops" | "hairStylists")}
          >
            <option value="all" className="text-black">
              All
            </option>
            <option value="shops" className="text-black">
              Shops
            </option>
            <option value="hairStylists" className="text-black">
              Hairstylists
            </option>
          </select>
        </div>

        <div className="w-full border border-[#4A90E2] mb-2"></div>

        <Services setServices={setServices} />

        <section className="flex flex-col gap-4 items-start justify-start w-full">
          {isLoading ? (
            <SkeletonTheme baseColor="#4A90E2" highlightColor="#fff">
              <p>
                <Skeleton width={100} />
              </p>
            </SkeletonTheme>
          ) : (
            filteredBarbers?.map((item: Barber) => (
              <div key={item.slug} className="text-white flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <img src={item.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1.5 relative">
                    <p className="text-lg shrink">
                      {item.fullname} -{" "}
                      <span
                        className="text-[#4A90E2] text-xs cursor-pointer relative"
                        onClick={(e) => {
                          e.stopPropagation(), setOpenServiceId(item.slug);
                        }}
                      >
                        Services
                        {/* Render the popup only if this item is open */}
                        {openServiceId === item.slug && (
                          <div className="z-50 absolute top-full mt-2 left-0 p-2 bg-white shadow-md border border-gray-300 rounded-lg">
                            {item.services.map((service, index) => (
                              <p key={index}>{service}</p>
                            ))}
                          </div>
                        )}
                      </span>
                    </p>

                    <p className="text-xs">{item.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <p className="shrink-0">
                    {item.rate} <span className="text-xs text-[#B0B0B0]">({item.reviews_count})</span>
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
            ))
          )}
        </section>
      </main>
    </div>
  );
}
