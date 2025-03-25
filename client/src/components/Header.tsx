import React from "react";
import { Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Globe className="mr-2 h-6 w-6" />
          World Time Explorer
        </h1>
        <p className="text-sm md:text-base opacity-90">Compare local times around the world</p>
      </div>
    </header>
  );
}
