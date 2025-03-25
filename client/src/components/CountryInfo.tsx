import React from "react";
import { MapPin } from "lucide-react";
import type { Country, TimeInfo } from "../types";
import { getCurrentTimeForCountry } from "../lib/timeUtils";

interface CountryInfoProps {
  country: Country | null;
  className?: string;
}

export default function CountryInfo({ country, className = "" }: CountryInfoProps) {
  if (!country) return null;
  
  const timeInfo = getCurrentTimeForCountry(country);
  
  if (!timeInfo) return null;

  return (
    <div className={`p-4 bg-gray-50 rounded-md border border-gray-200 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{country.name}</h3>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{country.capital}</span>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-md p-3 border border-gray-200">
          <div className="text-sm text-gray-500">Current Local Time</div>
          <div className="text-xl font-semibold">{timeInfo.time}</div>
          <div className="text-xs text-gray-400">{timeInfo.date}</div>
        </div>
      </div>
    </div>
  );
}
