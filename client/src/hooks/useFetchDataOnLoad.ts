import { useQuery } from "@tanstack/react-query";
import fetchData from "../services/apiData";

// Custom hook to fetch data on component mount using React Query
export const useFetchDataOnLoad = <T>(route: string, key: string) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData<T>(route),
    refetchOnWindowFocus: false, // Prevent refetching when the window is focused
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });
};
