import React from "react";
import { Globe, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-map-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold flex items-center text-shadow-blue cursor-pointer">
            <Globe className="mr-2 h-6 w-6" />
            World Time Explorer
          </h1>
        </Link>
        
        <div className="flex items-center mt-3 md:mt-0 gap-6">
          <p className="text-sm md:text-base opacity-90 text-shadow-blue">Compare local times around the world</p>
          
          <Link href="/blog">
            <span className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer">
              <BookOpen className="h-4 w-4" />
              Blog
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
