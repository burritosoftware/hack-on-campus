export interface Site {
  id: string;
  name: string;
  slug: string;
  unit_id: string;
  active: boolean;
  live: boolean;
  customer_login: boolean;
}

// Represents the entire response from the API endpoint.
export interface SitesResponse {
  status: string;
  request_time: number;
  records: number;
  sites: Site[];
}

// Represents the status object for each location.
export interface Status {
  label: string;
  message: string;
  color: string;
}

// Represents the address object for each location.
export interface Address {
  street: string;
  metadata: string | null;
  city: string;
  state: string;
  zip_code: string;
  lat: number;
  lon: number;
  phone: string | null;
  dst: boolean;
  gmt: number;
  phone_formatted: string | null;
  ext_formatted: string | null;
  gmt_offset: number;
  coordinates: [number, number];
  manual_coords: (number | null)[];
  abbreviation: string | null;
  zone_name: string | null;
}

// Represents each location in the locations array.
export interface Location {
  id: string;
  name: string;
  open: boolean;
  status: Status;
  occupancy: string;
  address: Address | null;
}

// Represents the entire response from the /locations/status endpoint.
export interface LocationsStatusResponse {
  status: string;
  request_time: number;
  records: number;
  locations: Location[];
}

// Represents individual nutrient information.
interface Nutrient {
  id: string;
  name: string;
  value: string;
  uom: string;
  value_numeric: string;
}

// Represents individual filter information (allergens, labels).
interface Filter {
  id: string;
  name: string;
  type: string;
  icon: boolean;
  remote_file_name: string | null;
  sector_icon_id: string | null;
  custom_icons: any[];
}

// Represents a single menu item with its details.
interface MenuItem {
  id: string;
  name: string;
  mrn: number;
  rev: string | null;
  mrn_full: string;
  desc: string | null;
  webtrition_id: string | null;
  sort_order: number;
  portion: string;
  qty: string | null;
  ingredients: string;
  nutrients: Nutrient[];
  filters: Filter[];
  custom_allergens: any | null;
  calories: string;
}

// Represents categories within a menu period.
interface Category {
  id: string;
  name: string;
  sort_order: number;
  items: MenuItem[];
}

// Represents menu periods (e.g., Breakfast, Lunch).
interface Period {
  id: string;
  sort_order: number;
  name: string;
}

// Represents the menu object with all periods and their categories.
interface Menu {
  id: number;
  date: string;
  name: string | null;
  from_date: string | null;
  to_date: string | null;
  periods: {
    name: string;
    id: string;
    sort_order: number;
    categories: Category[];
  }[];
}

// Represents the top-level structure of the API response.
export interface LocationPeriodsResponse {
  status: string;
  request_time: number;
  records: number;
  allergen_filter: boolean;
  menu: Menu;
  periods: Period[];
  closed: boolean;
}

// make this a module
export {};
