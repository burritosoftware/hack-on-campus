// dineOnCampusAPI.ts

const BASE_URL = "https://api.dineoncampus.com/v1";

import {LocationsStatusResponse, SitesResponse, MenuItem} from './types/dineOnCampusAPI';
// Helper function to make GET requests
async function fetchData(endpoint: string, params: Record<string, string>): Promise<any> {
  const urlParams = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}${endpoint}?${urlParams}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText} | ${`${BASE_URL}${endpoint}?${urlParams}`}`);
  }

  return response.json();
}

// Fetch list of public sites
export async function getPublicSites(): Promise<SitesResponse> {
  const endpoint = '/sites/public';
  return fetchData(endpoint, {}) as unknown as SitesResponse;
}

// Fetch location status for a specific site
export async function getLocationStatus(siteId: string, platform: number = 0): Promise<LocationsStatusResponse> {
  const endpoint = '/locations/status';
  const params = { site_id: siteId, platform: platform.toString() };
  return fetchData(endpoint, params);
}

// Fetch menu periods for a specific location and date
export async function getLocationPeriods(locationId: string, date: string = new Date().toISOString().split('T')[0], platform: number = 0): Promise<any> {

  const endpoint = `/location/${locationId}/periods`;
  const params = { platform: platform.toString(), date };
  return (await fetchData(endpoint, params)).periods;
}

// Fetch menu categories for a specific period, we need the location id and period id
export async function getPeriodCategories(locationId: string, periodId: string, date: string = new Date().toISOString().split('T')[0], platform: number = 0): Promise<any> {
  const endpoint = `/location/${locationId}/periods/${periodId}`;
  const params = { platform: platform.toString(), date: date };
  return (await fetchData(endpoint, params)).menu.periods.categories;
}

// Fetch list of locations for a specific site
export async function getLocations(siteId: string): Promise<any> {
  const endpoint = `/locations/status`;
  const params = { site_id: siteId };
  return fetchData(endpoint, params);
}

// Fetch all items, by fetching all location periods, then period categories
// Then, for each category, get all items in the items[]
// Append category_id and period_id to each item
export async function getAllItems(locationId: string, date: string = new Date().toISOString().split('T')[0], platform: number = 0): Promise<MenuItem[]> {
  const periods = await getLocationPeriods(locationId, date, platform);
  const items = [] as MenuItem[];

  for (const period of periods) {
    const categories = await getPeriodCategories(locationId, period.id, date, platform);
    for (const category of categories) {
      for (const item of category.items) {
        item.category_id = category.id;
        item.period_id = period.id;
        items.push(item);
      }
    }
  }

  return items;

}











// Example usage
// (async () => {
//   try {
//     const sites = await getPublicSites();
//     console.log(sites);

//     const status = await getLocationStatus("5aeb0593f3eeb60a5b32d44c");
//     console.log(status);

//     const periods = await getLocationPeriods("5b50c589f3eeb609b36a87eb", 0, "2024-10-19");
//     console.log(periods);
    
//     const locations = await getLocations("5aeb0593f3eeb60a5b32d44c");
//     console.log(locations);
//   } catch (error) {
//     console.error(error);
//   }
// })();
