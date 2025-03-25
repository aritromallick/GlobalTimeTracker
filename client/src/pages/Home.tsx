import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoBanner from "../components/InfoBanner";
import MapSection from "../components/MapSection";
import TimeComparisonSection from "../components/TimeComparisonSection";
import UsageGuide from "../components/UsageGuide";
import { useCountries } from "../lib/countryUtils";
import type { Country } from "../types";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [comparedCountry, setComparedCountry] = useState<Country | null>(null);
  
  const { data: countries = [], isLoading, error } = useCountries();
  
  // Handle when a country is selected from the map or dropdown
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };
  
  // Handle selection of the first country in comparison
  const handleSelectCountry1 = (country: Country) => {
    setSelectedCountry(country);
  };
  
  // Handle selection of the second country in comparison
  const handleSelectCountry2 = (country: Country) => {
    setComparedCountry(country);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">Error loading countries data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <InfoBanner />
        
        <MapSection 
          countries={countries} 
          selectedCountry={selectedCountry}
          comparedCountry={comparedCountry}
          onSelectCountry={handleSelectCountry}
        />
        
        <TimeComparisonSection 
          countries={countries}
          selectedCountry={selectedCountry}
          comparedCountry={comparedCountry}
          onSelectCountry1={handleSelectCountry1}
          onSelectCountry2={handleSelectCountry2}
        />
        
        <UsageGuide />
      </main>
      
      <Footer />
    </div>
  );
}
