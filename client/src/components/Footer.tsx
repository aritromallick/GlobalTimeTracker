import React from "react";
import { format } from "date-fns";

export default function Footer() {
  // Get the current date for "last updated"
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">World Time Explorer</h2>
            <p className="text-sm text-gray-400">Compare local times across the globe</p>
          </div>
          <div className="text-sm text-gray-400">
            Timezone data last updated: <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
