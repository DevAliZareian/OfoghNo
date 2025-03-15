import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useBarbers from "../hooks/useBarbers";
import { Barber } from "../utils/types";
import ServicesFilter from "../components/app/features/ServicesFilter";
import Form from "../components/app/interface/Form";
import SearchBar from "../components/app/features/SearchBar";
import ShopFilter from "../components/app/features/ShopFilter";

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
    <Form onClick={() => setOpenServiceId("")}>
      <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ShopFilter value={filter} onChange={(e) => setFilter(e.target.value as FilterType)} />
      <ServicesFilter setServices={setServices} />

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
    </Form>
  );
}
