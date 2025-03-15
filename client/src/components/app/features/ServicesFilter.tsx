import { useCallback } from "react";
import { useFetchDataOnLoad } from "../../../hooks/useFetchDataOnLoad";

interface Service {
  slug: string;
  title: string;
  icon: string | null;
}

interface ServiceResponse {
  results: Service[];
}

type ServicesProps = {
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
};

interface ServiceItemProps {
  service: Service;
  toggleService: (slug: string) => void;
}

const ServiceItem = ({ service, toggleService }: ServiceItemProps) => (
  <div className="flex items-center">
    <input type="checkbox" id={service.slug} value={service.slug} onChange={() => toggleService(service.slug)} />
    <label htmlFor={service.slug} className="ml-1">
      {service.title}
    </label>
  </div>
);

export default function ServicesFilter({ setServices }: ServicesProps) {
  const { data, error } = useFetchDataOnLoad<ServiceResponse>("services", "services");

  const toggleService = useCallback(
    (slug: string) => {
      setServices((prevServices) => (prevServices.includes(slug) ? prevServices.filter((s) => s !== slug) : [...prevServices, slug]));
    },
    [setServices]
  );

  if (error) return <div className="text-white self-center">Error loading services</div>;

  return (
    <div className="self-start flex items-center text-white text-sm gap-2 flex-wrap">
      {data?.results.map((service) => (
        <ServiceItem key={service.slug} service={service} toggleService={toggleService} />
      ))}
    </div>
  );
}
