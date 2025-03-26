import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoBanner from "../components/InfoBanner";
import MapSection from "../components/MapSection";
import TimeComparisonSection from "../components/TimeComparisonSection";
import UsageGuide from "../components/UsageGuide";
import AdBanner from "../components/AdBanner";
import { useCountries } from "../lib/countryUtils";
import { useIsMobile } from "../hooks/use-mobile";
import type { Country } from "../types";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [comparedCountry, setComparedCountry] = useState<Country | null>(null);
  const [activeSection, setActiveSection] = useState<'map' | 'comparison'>('map');
  
  const isMobile = useIsMobile();
  const { data: countries = [], isLoading, error } = useCountries();
  
  // Handle when a country is selected from the map or dropdown
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    // No longer automatically switch to comparison view - let the user decide
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
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-grow">
        <InfoBanner />
        
        {/* Top Ad Banner */}
        <div className="my-4">
          <AdBanner 
            slot="1234567890" 
            format="horizontal" 
            style={{ minHeight: '90px', width: '100%' }}
            className="bg-gray-100 rounded shadow-sm" 
          />
        </div>
        
        {/* Mobile navigation tabs */}
        {isMobile && (
          <div className="mb-4 flex border-b border-gray-200">
            <button
              onClick={() => setActiveSection('map')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeSection === 'map' 
                  ? 'text-primary-600 border-b-2 border-primary-500' 
                  : 'text-gray-500'
              }`}
            >
              World Map
            </button>
            <button
              onClick={() => setActiveSection('comparison')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeSection === 'comparison' 
                  ? 'text-primary-600 border-b-2 border-primary-500' 
                  : 'text-gray-500'
              }`}
            >
              Time Comparison
            </button>
          </div>
        )}
        
        {/* Map Section - Hidden on mobile when not active */}
        <div className={isMobile && activeSection !== 'map' ? 'hidden' : ''}>
          <MapSection 
            countries={countries} 
            selectedCountry={selectedCountry}
            comparedCountry={comparedCountry}
            onSelectCountry={handleSelectCountry}
          />
        </div>
        
        {/* Time Comparison Section - Hidden on mobile when not active */}
        <div className={isMobile && activeSection !== 'comparison' ? 'hidden' : ''}>
          <TimeComparisonSection 
            countries={countries}
            selectedCountry={selectedCountry}
            comparedCountry={comparedCountry}
            onSelectCountry1={handleSelectCountry1}
            onSelectCountry2={handleSelectCountry2}
          />
        </div>
        
        {/* Middle Ad Banner */}
        <div className="my-6">
          <AdBanner 
            slot="2345678901" 
            format="rectangle" 
            style={{ minHeight: '250px', width: '100%' }}
            className="bg-gray-100 rounded shadow-sm" 
          />
        </div>
        
        <UsageGuide />
      </main>
      
      <Footer />
    </div>
  );
}
