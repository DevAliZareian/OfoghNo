import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useBarbers from "../hooks/useBarbers";
import { Barber } from "../utils/types";
import ServicesFilter from "../components/app/features/ServicesFilter";
import Form from "../components/app/interface/Form";
import SearchBar from "../components/app/features/SearchBar";
import ShopFilter from "../components/app/features/ShopFilter";
import BarberIcon from "../components/app/interface/BarberIcon";
import BarberSection from "../components/app/interface/BarberSection";

type FilterType = "all" | "shops" | "hairStylists";

function Application() {
  const { search } = useParams();

  const [searchText, setSearchText] = useState(search || "");
  const [services, setServices] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [openServiceId, setOpenServiceId] = useState("");

  // Fetch barbers using the custom hook.
  const { barbers, isLoading, isError, isFetching } = useBarbers(services, searchText);

  // Derive the barber list safely.
  const barberList: Barber[] = useMemo(() => {
    if (!barbers) return [];
    return Array.isArray(barbers) ? barbers : barbers.results || [];
  }, [barbers]);

  // Filter the list based on the selected filter.
  const filteredBarbers = useMemo(() => {
    switch (filter) {
      case "shops":
        return barberList.filter((barber: Barber) => barber.is_shop);
      case "hairStylists":
        return barberList.filter((barber: Barber) => !barber.is_shop);
      default:
        return barberList;
    }
  }, [barberList, filter]);

  if (isError) {
    return <div>Error loading barbers</div>;
  }

  return (
    <Form onClick={() => setOpenServiceId("")}>
      <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ShopFilter value={filter} onChange={(e) => setFilter(e.target.value as FilterType)} />
      <ServicesFilter setServices={setServices} />

      <BarberSection isFetching={isFetching}>
        {filteredBarbers.length > 0 ? (
          filteredBarbers.map((item: Barber) => <BarberIcon key={item.slug} item={item} openServiceId={openServiceId} setOpenServiceId={setOpenServiceId} isLoading={isLoading} />)
        ) : (
          <div>No barbers found</div>
        )}
      </BarberSection>
    </Form>
  );
}

export default Application;
