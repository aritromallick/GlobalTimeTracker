import React from "react";
import { HelpCircle } from "lucide-react";

export default function UsageGuide() {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          How to Use
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-2">
                <span className="font-semibold">1</span>
              </div>
              <h3 className="font-medium">Select from Map</h3>
            </div>
            <p className="text-sm text-gray-600">
              Click directly on any country on the world map to view its current local time.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-2">
                <span className="font-semibold">2</span>
              </div>
              <h3 className="font-medium">Use Dropdown</h3>
            </div>
            <p className="text-sm text-gray-600">
              Select a country from the dropdown menu to highlight it on the map and see its time.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-2">
                <span className="font-semibold">3</span>
              </div>
              <h3 className="font-medium">Compare Times</h3>
            </div>
            <p className="text-sm text-gray-600">
              Select two different countries to compare their current times and see the time difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
