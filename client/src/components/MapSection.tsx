import React, { useState } from "react";
import { Map, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import WorldMap from "./WorldMap";
import CountryInfo from "./CountryInfo";
import { groupCountriesByContinent, sortCountriesByName } from "../lib/countryUtils";
import type { Country } from "../types";

interface MapSectionProps {
  countries: Country[];
  selectedCountry: Country | null;
  comparedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

export default function MapSection({ 
  countries, 
  selectedCountry, 
  comparedCountry, 
  onSelectCountry 
}: MapSectionProps) {
  const groupedCountries = groupCountriesByContinent(countries);
  const continents = Object.keys(groupedCountries).sort();

  const handleCountryDropdownChange = (value: string) => {
    const selectedCountry = countries.find(country => country.code === value);
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
    }
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <Map className="mr-2 h-5 w-5" />
          Interactive World Map
        </h2>

        {/* Country Search Dropdown */}
        <div className="mb-4">
          <label htmlFor="country-search" className="block text-sm font-medium text-gray-700 mb-1">
            Search and select a country:
          </label>
          <div className="relative">
            <Select onValueChange={handleCountryDropdownChange} value={selectedCountry?.code || ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {continents.map(continent => (
                  <SelectGroup key={continent}>
                    <SelectLabel>{continent}</SelectLabel>
                    {sortCountriesByName(groupedCountries[continent]).map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Map */}
        <WorldMap 
          selectedCountry={selectedCountry}
          comparedCountry={comparedCountry}
          onCountryClick={onSelectCountry}
          countries={countries}
        />

        {/* Selected Country Info */}
        {selectedCountry && (
          <CountryInfo country={selectedCountry} className="mt-4" />
        )}
      </div>
    </section>
  );
}
