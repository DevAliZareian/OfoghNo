import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import fetchData from "../services/apiData";
import { BASE_URL } from "../utils/constants";
import { BarberResponse } from "../utils/types";

const useBarbers = (services: string[], searchText: string) => {
  const queryClient = useQueryClient();

  // Main query: if there's no search text, fetch barbers using the "services" parameter if available.
  const {
    data: barbers = { count: 0, next: null, previous: null, results: [] },
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<BarberResponse>({
    queryKey: ["barbers", services],
    queryFn: () => {
      const baseUrl = "barbers/";
      // If services array is not empty, call the API with the services query param.
      const url = services.length > 0 ? `${baseUrl}?services=${services.join(",")}` : baseUrl;
      return fetchData(url);
    },
    enabled: !searchText,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  // When a search text is provided, debounce a search query using axios.
  useEffect(() => {
    if (!searchText) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      axios
        .get(`${BASE_URL}/barbers/?search=${searchText}`, {
          signal: controller.signal,
        })
        .then((response) => {
          // Update the query cache with the search result
          queryClient.setQueryData(["barbers", services], response.data);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Failed to fetch barbers by name:", error);
          }
        });
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchText, services, queryClient]);

  useEffect(() => {
    refetch();
  }, [services, searchText, refetch]);

  return { barbers, isLoading, isFetching, isError };
};

export default useBarbers;
