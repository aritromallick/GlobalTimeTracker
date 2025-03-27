import React from "react";
import { format } from "date-fns";
import { useIsMobile } from "../hooks/use-mobile";
import AdBanner from "./AdBanner";
import { Link } from "wouter";

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-base sm:text-lg font-semibold mb-2">World Time Explorer</h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-3">Compare local times across the globe</p>
            <p className="text-xs sm:text-sm text-gray-400">
              {isMobile ? 'Updated:' : 'Timezone data last updated:'} <span>{currentDate}</span>
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-semibold mb-2">Resources</h3>
            <ul className="text-xs sm:text-sm space-y-1">
              <li><Link href="/blog"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">Time Zone Blog</span></Link></li>
              <li><Link href="/"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">World Map</span></Link></li>
              <li><Link href="/"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">Time Comparison</span></Link></li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-sm font-semibold mb-2">Popular Articles</h3>
            <ul className="text-xs sm:text-sm space-y-1">
              <li><Link href="/blog/managing-teams-across-time-zones"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">Managing Global Teams</span></Link></li>
              <li><Link href="/blog/psychology-of-time-zones"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">Psychology of Time Zones</span></Link></li>
              <li><Link href="/blog/scheduling-international-meetings"><span className="text-blue-300 hover:text-blue-200 cursor-pointer">Scheduling International Meetings</span></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} World Time Explorer</p>
          
          {/* Mobile back-to-top button */}
          {isMobile && (
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to top
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
