import { countries, type Country, type InsertCountry } from "@shared/schema";
import { countries as countriesData, CountryData } from "@shared/countryData";

export interface IStorage {
  getAllCountries(): Promise<CountryData[]>;
  getCountryByCode(code: string): Promise<CountryData | undefined>;
}

export class MemStorage implements IStorage {
  constructor() {}

  async getAllCountries(): Promise<CountryData[]> {
    return countriesData;
  }

  async getCountryByCode(code: string): Promise<CountryData | undefined> {
    return countriesData.find(country => country.code === code);
  }
}

export const storage = new MemStorage();
