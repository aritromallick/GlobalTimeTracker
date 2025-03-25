import type { Country } from "./schema";

// This contains a comprehensive list of countries with their timezone data
// Used for both frontend and backend

export interface CountryData {
  code: string;
  name: string;
  capital: string;
  timezoneOffset: number; // in hours from GMT
  timezoneAbbr: string;
  continent: string;
}

export const countries: CountryData[] = [
  { code: "US", name: "United States", capital: "Washington, D.C.", timezoneOffset: -5, timezoneAbbr: "EST", continent: "North America" },
  { code: "CA", name: "Canada", capital: "Ottawa", timezoneOffset: -5, timezoneAbbr: "EST", continent: "North America" },
  { code: "MX", name: "Mexico", capital: "Mexico City", timezoneOffset: -6, timezoneAbbr: "CST", continent: "North America" },
  { code: "BR", name: "Brazil", capital: "Brasília", timezoneOffset: -3, timezoneAbbr: "BRT", continent: "South America" },
  { code: "AR", name: "Argentina", capital: "Buenos Aires", timezoneOffset: -3, timezoneAbbr: "ART", continent: "South America" },
  { code: "GB", name: "United Kingdom", capital: "London", timezoneOffset: 0, timezoneAbbr: "GMT", continent: "Europe" },
  { code: "DE", name: "Germany", capital: "Berlin", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "FR", name: "France", capital: "Paris", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "ES", name: "Spain", capital: "Madrid", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "IT", name: "Italy", capital: "Rome", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "RU", name: "Russia", capital: "Moscow", timezoneOffset: 3, timezoneAbbr: "MSK", continent: "Europe" },
  { code: "CN", name: "China", capital: "Beijing", timezoneOffset: 8, timezoneAbbr: "CST", continent: "Asia" },
  { code: "JP", name: "Japan", capital: "Tokyo", timezoneOffset: 9, timezoneAbbr: "JST", continent: "Asia" },
  { code: "IN", name: "India", capital: "New Delhi", timezoneOffset: 5.5, timezoneAbbr: "IST", continent: "Asia" },
  { code: "AU", name: "Australia", capital: "Canberra", timezoneOffset: 10, timezoneAbbr: "AEST", continent: "Oceania" },
  { code: "NZ", name: "New Zealand", capital: "Wellington", timezoneOffset: 12, timezoneAbbr: "NZST", continent: "Oceania" },
  { code: "ZA", name: "South Africa", capital: "Pretoria", timezoneOffset: 2, timezoneAbbr: "SAST", continent: "Africa" },
  { code: "EG", name: "Egypt", capital: "Cairo", timezoneOffset: 2, timezoneAbbr: "EET", continent: "Africa" },
  { code: "NG", name: "Nigeria", capital: "Abuja", timezoneOffset: 1, timezoneAbbr: "WAT", continent: "Africa" },
  { code: "KE", name: "Kenya", capital: "Nairobi", timezoneOffset: 3, timezoneAbbr: "EAT", continent: "Africa" },
  { code: "SA", name: "Saudi Arabia", capital: "Riyadh", timezoneOffset: 3, timezoneAbbr: "AST", continent: "Asia" },
  { code: "AE", name: "United Arab Emirates", capital: "Abu Dhabi", timezoneOffset: 4, timezoneAbbr: "GST", continent: "Asia" },
  { code: "TR", name: "Turkey", capital: "Ankara", timezoneOffset: 3, timezoneAbbr: "TRT", continent: "Europe" },
  { code: "IL", name: "Israel", capital: "Jerusalem", timezoneOffset: 2, timezoneAbbr: "IST", continent: "Asia" },
  { code: "PK", name: "Pakistan", capital: "Islamabad", timezoneOffset: 5, timezoneAbbr: "PKT", continent: "Asia" },
  { code: "TH", name: "Thailand", capital: "Bangkok", timezoneOffset: 7, timezoneAbbr: "ICT", continent: "Asia" },
  { code: "VN", name: "Vietnam", capital: "Hanoi", timezoneOffset: 7, timezoneAbbr: "ICT", continent: "Asia" },
  { code: "SG", name: "Singapore", capital: "Singapore", timezoneOffset: 8, timezoneAbbr: "SGT", continent: "Asia" },
  { code: "ID", name: "Indonesia", capital: "Jakarta", timezoneOffset: 7, timezoneAbbr: "WIB", continent: "Asia" },
  { code: "MY", name: "Malaysia", capital: "Kuala Lumpur", timezoneOffset: 8, timezoneAbbr: "MYT", continent: "Asia" },
];

// Get a country by its code
export function getCountryByCode(code: string): CountryData | undefined {
  return countries.find(country => country.code === code);
}

// Get all countries
export function getAllCountries(): CountryData[] {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

// Get all countries grouped by continent
export function getCountriesByContinent(): Record<string, CountryData[]> {
  return countries.reduce((acc, country) => {
    if (!acc[country.continent]) {
      acc[country.continent] = [];
    }
    acc[country.continent].push(country);
    return acc;
  }, {} as Record<string, CountryData[]>);
}
