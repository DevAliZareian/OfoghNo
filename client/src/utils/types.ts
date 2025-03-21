export interface Barber {
  slug: string;
  fullname: string;
  is_shop: boolean;
  avatar: string;
  address: string;
  lat: number;
  lon: number;
  rate: number;
  distance: number;
  is_bookmarked: boolean;
  phone_number: string;
  reviews_count: number;
  services: string[];
}

export interface BarberResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Barber[];
}
