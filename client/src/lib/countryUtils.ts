import { useQuery } from "@tanstack/react-query";
import type { Country } from "../types";

// Hook to fetch all countries
export function useCountries() {
  return useQuery({
    queryKey: ["/api/countries"],
    staleTime: Infinity, // Countries data doesn't change frequently
  });
}

// Hook to fetch a specific country by code
export function useCountry(code: string | null) {
  return useQuery({
    queryKey: ["/api/countries", code],
    enabled: !!code, // Only fetch when a code is provided
  });
}

// Group countries by continent for better organization in dropdowns
export function groupCountriesByContinent(countries: Country[]): Record<string, Country[]> {
  return countries.reduce((acc, country) => {
    if (!acc[country.continent]) {
      acc[country.continent] = [];
    }
    acc[country.continent].push(country);
    return acc;
  }, {} as Record<string, Country[]>);
}

// Sort countries alphabetically by name
export function sortCountriesByName(countries: Country[]): Country[] {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

// Find a country by its code
export function findCountryByCode(countries: Country[], code: string | null): Country | null {
  if (!code) return null;
  return countries.find(country => country.code === code) || null;
}
