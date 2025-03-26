import React from "react";
import { format } from "date-fns";
import { useIsMobile } from "../hooks/use-mobile";
import AdBanner from "./AdBanner";

export default function Footer() {
  // Get the current date for "last updated"
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const isMobile = useIsMobile();

  return (
    <footer className="bg-gray-800 text-white py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Footer Ad Banner */}
        <div className="mb-4">
          <AdBanner 
            slot="3456789012" 
            format="horizontal" 
            style={{ minHeight: '90px', width: '100%' }}
            className="bg-gray-700 rounded shadow-sm" 
          />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0 text-center md:text-left">
            <h2 className="text-base sm:text-lg font-semibold">World Time Explorer</h2>
            <p className="text-xs sm:text-sm text-gray-400">Compare local times across the globe</p>
          </div>
          <div className="text-xs sm:text-sm text-gray-400 text-center md:text-right">
            {isMobile ? 'Updated:' : 'Timezone data last updated:'} <span>{currentDate}</span>
          </div>
        </div>
        
        {/* Mobile back-to-top button */}
        {isMobile && (
          <div className="mt-3 flex justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to top
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
