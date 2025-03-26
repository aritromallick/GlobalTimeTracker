import React, { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import type { Country } from "../types";

interface WorldMapProps {
  selectedCountry: Country | null;
  comparedCountry: Country | null;
  onCountryClick: (country: Country) => void;
  countries: Country[];
}

// Map projection configuration
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({
  selectedCountry,
  comparedCountry,
  onCountryClick,
  countries
}: WorldMapProps) {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ 
    coordinates: [0, 0], 
    zoom: 1 
  });
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Handle map zoom
  const handleZoom = (zoom: number) => {
    setPosition(pos => ({ ...pos, zoom }));
  };

  // Handle map movement
  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  // Function to find a country by ISO code
  const findCountryByGeoName = (name: string): Country | null => {
    // Convert the geo name to match our country data
    // This is a simplified approach - in a real application you'd need a more robust mapping
    const foundCountry = countries.find(c => 
      name.includes(c.name) || c.name.includes(name)
    );
    return foundCountry || null;
  };

  // Map controls for zoom in/out
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 0.8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  // Reset map position
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  return (
    <div 
      ref={mapRef}
      className="map-container w-full mobile-map bg-gray-50 rounded border border-gray-200 overflow-hidden relative"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-map-blue"></div>
        </div>
      ) : (
        <>
          {/* Map Controls */}
          <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2">
            <button 
              onClick={handleZoomIn}
              className="bg-white p-1 rounded-md shadow hover:bg-gray-100 text-gray-700 focus:outline-none"
              aria-label="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button 
              onClick={handleZoomOut}
              className="bg-white p-1 rounded-md shadow hover:bg-gray-100 text-gray-700 focus:outline-none"
              aria-label="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button 
              onClick={handleReset}
              className="bg-white p-1 rounded-md shadow hover:bg-gray-100 text-gray-700 focus:outline-none"
              aria-label="Reset view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>

          <ComposableMap projection="geoMercator">
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              maxZoom={5}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const isSelected = selectedCountry?.name.includes(geo.properties.name) || 
                                      geo.properties.name.includes(selectedCountry?.name || "");
                    const isCompared = comparedCountry?.name.includes(geo.properties.name) || 
                                      geo.properties.name.includes(comparedCountry?.name || "");
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          const country = findCountryByGeoName(geo.properties.name);
                          if (country) {
                            onCountryClick(country);
                          }
                        }}
                        className={`country ${isSelected ? 'selected' : ''} ${isCompared ? 'compared' : ''}`}
                        style={{
                          default: {
                            fill: isSelected 
                              ? "var(--map-blue)" 
                              : isCompared 
                                ? "#10b981"
                                : "#e5e7eb",
                            outline: "none",
                            stroke: "#fff",
                            strokeWidth: 0.5,
                          },
                          hover: {
                            fill: "#93c5fd",
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "var(--map-blue)",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </>
      )}
      
      {/* Mobile instructions overlay */}
      <div className="absolute bottom-2 left-2 right-2 md:hidden">
        <div className="bg-white bg-opacity-70 text-xs text-gray-700 p-1 rounded">
          Tap on a country to select, or use the dropdown above.
        </div>
      </div>
    </div>
  );
}
