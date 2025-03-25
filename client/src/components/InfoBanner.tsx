import React from "react";
import { Info } from "lucide-react";

export default function InfoBanner() {
  return (
    <div className="bg-blue-50 border-l-4 border-primary-500 p-4 mb-6 rounded-md shadow-sm">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-primary-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-primary-700">
            Click on any country on the map or use the dropdown menus to select countries and compare their local times.
          </p>
        </div>
      </div>
    </div>
  );
}
