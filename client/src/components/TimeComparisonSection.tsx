import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Info } from "lucide-react";
import { getCurrentTimeForCountry, calculateTimeDifference } from "../lib/timeUtils";
import { groupCountriesByContinent, sortCountriesByName } from "../lib/countryUtils";
import type { Country, TimeInfo, TimeDifference } from "../types";

interface TimeComparisonSectionProps {
  countries: Country[];
  selectedCountry: Country | null;
  comparedCountry: Country | null;
  onSelectCountry1: (country: Country) => void;
  onSelectCountry2: (country: Country) => void;
}

export default function TimeComparisonSection({ 
  countries, 
  selectedCountry,
  comparedCountry,
  onSelectCountry1, 
  onSelectCountry2 
}: TimeComparisonSectionProps) {
  const [country1Info, setCountry1Info] = useState<TimeInfo | null>(null);
  const [country2Info, setCountry2Info] = useState<TimeInfo | null>(null);
  const [timeDifference, setTimeDifference] = useState<TimeDifference | null>(null);
  const [showResults, setShowResults] = useState(false);

  const groupedCountries = groupCountriesByContinent(countries);
  const continents = Object.keys(groupedCountries).sort();

  // Update time information when selected countries change
  useEffect(() => {
    if (selectedCountry) {
      setCountry1Info(getCurrentTimeForCountry(selectedCountry));
    }
    
    if (comparedCountry) {
      setCountry2Info(getCurrentTimeForCountry(comparedCountry));
    }
    
    if (selectedCountry && comparedCountry) {
      setTimeDifference(calculateTimeDifference(selectedCountry, comparedCountry));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [selectedCountry, comparedCountry]);

  // Update country1 selection
  const handleCountry1Change = (value: string) => {
    const country = countries.find(c => c.code === value);
    if (country) {
      onSelectCountry1(country);
    }
  };

  // Update country2 selection
  const handleCountry2Change = (value: string) => {
    const country = countries.find(c => c.code === value);
    if (country) {
      onSelectCountry2(country);
    }
  };

  return (
    <section className="mb-6 sm:mb-8">
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
        <h2 className="mobile-section-title text-xl font-semibold text-gray-700 flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Time Comparison
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {/* First Country Selection */}
          <div>
            <label htmlFor="country-1" className="block text-sm font-medium text-gray-700 mb-1">
              First Country:
            </label>
            <div className="relative">
              <Select onValueChange={handleCountry1Change} value={selectedCountry?.code || ""}>
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

          {/* Second Country Selection */}
          <div>
            <label htmlFor="country-2" className="block text-sm font-medium text-gray-700 mb-1">
              Second Country:
            </label>
            <div className="relative">
              <Select onValueChange={handleCountry2Change} value={comparedCountry?.code || ""}>
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
        </div>

        {/* Time Comparison Results */}
        {showResults && selectedCountry && comparedCountry && country1Info && country2Info && timeDifference && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gray-50 rounded-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* First Country Time Card */}
              <div className="bg-white rounded-md shadow p-3 sm:p-4 border-l-4 border-primary-500">
                <h3 className="font-medium text-gray-700 text-sm sm:text-base">{selectedCountry.name}</h3>
                <div className="mt-1 sm:mt-2">
                  <div className="mobile-time-display">{country1Info.time}</div>
                  <div className="text-sm text-gray-500">{country1Info.date}</div>
                  <div className="text-xs text-gray-400 mt-1">{country1Info.timezone}</div>
                </div>
              </div>
              
              {/* Time Difference Card - Appears in different positions based on screen size */}
              <div className="order-3 md:order-2 bg-gradient-to-r from-primary-50 to-green-50 rounded-md shadow p-3 sm:p-4 flex flex-col justify-center items-center border border-gray-200">
                <div className="text-sm text-gray-500 mb-1 sm:mb-2">Time Difference</div>
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Clock className="text-primary-600 mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-lg sm:text-xl font-bold text-primary-700">{timeDifference.formattedDifference}</span>
                </div>
                <div className="text-xs text-center text-gray-500 px-0 sm:px-2">
                  {timeDifference.description}
                </div>
              </div>
              
              {/* Second Country Time Card */}
              <div className="order-2 md:order-3 bg-white rounded-md shadow p-3 sm:p-4 border-l-4 border-green-500">
                <h3 className="font-medium text-gray-700 text-sm sm:text-base">{comparedCountry.name}</h3>
                <div className="mt-1 sm:mt-2">
                  <div className="mobile-time-display">{country2Info.time}</div>
                  <div className="text-sm text-gray-500">{country2Info.date}</div>
                  <div className="text-xs text-gray-400 mt-1">{country2Info.timezone}</div>
                </div>
              </div>
            </div>
            
            {/* Additional Context */}
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 px-2 py-2 bg-white rounded border border-gray-100">
              <div className="flex items-start">
                <Info className="text-primary-500 mt-0.5 mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                <div>
                  <span>{timeDifference.businessHoursInfo}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile explanation when no comparison is selected */}
        {!showResults && (
          <div className="mt-3 text-xs text-gray-500 md:hidden bg-gray-50 p-2 rounded border border-gray-100">
            Select two countries above to compare their local times and see the time difference between them.
          </div>
        )}
      </div>
    </section>
  );
}
