import express from 'express';

// Import country data directly to avoid server-side imports
const countries = [
  { code: "US", name: "United States", capital: "Washington, D.C.", timezoneOffset: -5, timezoneAbbr: "EST", continent: "North America" },
  { code: "CA", name: "Canada", capital: "Ottawa", timezoneOffset: -5, timezoneAbbr: "EST", continent: "North America" },
  { code: "MX", name: "Mexico", capital: "Mexico City", timezoneOffset: -6, timezoneAbbr: "CST", continent: "North America" },
  { code: "BR", name: "Brazil", capital: "Brasília", timezoneOffset: -3, timezoneAbbr: "BRT", continent: "South America" },
  { code: "AR", name: "Argentina", capital: "Buenos Aires", timezoneOffset: -3, timezoneAbbr: "ART", continent: "South America" },
  { code: "GB", name: "United Kingdom", capital: "London", timezoneOffset: 0, timezoneAbbr: "GMT", continent: "Europe" },
  { code: "DE", name: "Germany", capital: "Berlin", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "FR", name: "France", capital: "Paris", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "ES", name: "Spain", capital: "Madrid", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "IT", name: "Italy", capital: "Rome", timezoneOffset: 1, timezoneAbbr: "CET", continent: "Europe" },
  { code: "RU", name: "Russia", capital: "Moscow", timezoneOffset: 3, timezoneAbbr: "MSK", continent: "Europe" },
  { code: "CN", name: "China", capital: "Beijing", timezoneOffset: 8, timezoneAbbr: "CST", continent: "Asia" },
  { code: "JP", name: "Japan", capital: "Tokyo", timezoneOffset: 9, timezoneAbbr: "JST", continent: "Asia" },
  { code: "IN", name: "India", capital: "New Delhi", timezoneOffset: 5.5, timezoneAbbr: "IST", continent: "Asia" },
  { code: "AU", name: "Australia", capital: "Canberra", timezoneOffset: 10, timezoneAbbr: "AEST", continent: "Oceania" },
  { code: "NZ", name: "New Zealand", capital: "Wellington", timezoneOffset: 12, timezoneAbbr: "NZST", continent: "Oceania" },
  { code: "ZA", name: "South Africa", capital: "Pretoria", timezoneOffset: 2, timezoneAbbr: "SAST", continent: "Africa" },
  { code: "EG", name: "Egypt", capital: "Cairo", timezoneOffset: 2, timezoneAbbr: "EET", continent: "Africa" },
  { code: "NG", name: "Nigeria", capital: "Abuja", timezoneOffset: 1, timezoneAbbr: "WAT", continent: "Africa" },
  { code: "KE", name: "Kenya", capital: "Nairobi", timezoneOffset: 3, timezoneAbbr: "EAT", continent: "Africa" },
  { code: "SA", name: "Saudi Arabia", capital: "Riyadh", timezoneOffset: 3, timezoneAbbr: "AST", continent: "Asia" },
  { code: "AE", name: "United Arab Emirates", capital: "Abu Dhabi", timezoneOffset: 4, timezoneAbbr: "GST", continent: "Asia" },
  { code: "TR", name: "Turkey", capital: "Ankara", timezoneOffset: 3, timezoneAbbr: "TRT", continent: "Europe" },
  { code: "IL", name: "Israel", capital: "Jerusalem", timezoneOffset: 2, timezoneAbbr: "IST", continent: "Asia" },
  { code: "PK", name: "Pakistan", capital: "Islamabad", timezoneOffset: 5, timezoneAbbr: "PKT", continent: "Asia" },
  { code: "TH", name: "Thailand", capital: "Bangkok", timezoneOffset: 7, timezoneAbbr: "ICT", continent: "Asia" },
  { code: "VN", name: "Vietnam", capital: "Hanoi", timezoneOffset: 7, timezoneAbbr: "ICT", continent: "Asia" },
  { code: "SG", name: "Singapore", capital: "Singapore", timezoneOffset: 8, timezoneAbbr: "SGT", continent: "Asia" },
  { code: "ID", name: "Indonesia", capital: "Jakarta", timezoneOffset: 7, timezoneAbbr: "WIB", continent: "Asia" },
  { code: "MY", name: "Malaysia", capital: "Kuala Lumpur", timezoneOffset: 8, timezoneAbbr: "MYT", continent: "Asia" }
];

// Create Express app
const app = express();
app.use(express.json());

// Set up CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API route for all countries
app.get('/api/countries', (req, res) => {
  try {
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
});

// API route for single country by code
app.get('/api/countries/:code', (req, res) => {
  try {
    const { code } = req.params;
    const country = countries.find(c => c.code === code);
    
    if (!country) {
      return res.status(404).json({ message: `Country with code '${code}' not found` });
    }
    
    res.json(country);
  } catch (error) {
    console.error(`Error fetching country with code ${req.params.code}:`, error);
    res.status(500).json({ message: "Failed to fetch country" });
  }
});

// Export the Express API for Vercel
export default app;