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
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
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
  const handleMoveEnd = (position: any) => {
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

  return (
    <div 
      ref={mapRef}
      className="map-container w-full h-[400px] bg-gray-50 rounded border border-gray-200 overflow-hidden relative"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <ComposableMap>
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
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
                            ? "#3b82f6" 
                            : isCompared 
                              ? "#10b981"
                              : "#e5e7eb",
                          outline: "none",
                        },
                        hover: {
                          fill: "#93c5fd",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#60a5fa",
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
      )}
    </div>
  );
}
