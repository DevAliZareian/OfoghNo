import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";

// Generic function to fetch data from an API with type safety
export default async function fetchData<T>(route: string): Promise<T> {
  try {
    const response = await axios.get<T>(`${BASE_URL}/${route}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Error fetching data");
  }
}
