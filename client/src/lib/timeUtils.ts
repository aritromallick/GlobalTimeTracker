import { format, formatDistance, addHours, differenceInHours } from "date-fns";
import type { Country, TimeInfo, TimeDifference } from "../types";

// Get current time for a specific country
export function getCurrentTimeForCountry(country: Country | null): TimeInfo | null {
  if (!country) return null;

  const now = new Date();
  const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const countryTime = addHours(utcTime, country.timezoneOffset);

  return {
    time: format(countryTime, "h:mm a"),
    date: format(countryTime, "EEEE, MMMM d, yyyy"),
    timezone: `GMT${formatTimezoneOffset(country.timezoneOffset)} (${country.timezoneAbbr})`,
  };
}

// Format timezone offset (e.g., +5:30, -3:00)
export function formatTimezoneOffset(offset: number): string {
  const sign = offset >= 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset);
  const minutes = Math.round((absOffset - hours) * 60);
  
  if (minutes === 0) {
    return `${sign}${hours}`;
  }
  
  return `${sign}${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Calculate time difference between two countries
export function calculateTimeDifference(
  country1: Country | null, 
  country2: Country | null
): TimeDifference | null {
  if (!country1 || !country2) return null;

  const hoursDiff = country2.timezoneOffset - country1.timezoneOffset;
  
  const sign = hoursDiff > 0 ? "+" : "";
  const formattedDifference = `${sign}${hoursDiff} hours`;
  
  // Generate description
  const timeOfDay = getTimeOfDay(country1, country2);
  const description = `When it's morning in ${country1.name}, it's ${timeOfDay} in ${country2.name}`;
  
  // Generate business hours info
  const activityState = getActivityState(country1, country2);
  const businessHoursInfo = `Business hours (9 AM - 5 PM): When it's business hours in ${country1.name}, people in ${country2.name} are likely ${activityState}.`;

  return {
    hours: hoursDiff,
    formattedDifference,
    description,
    businessHoursInfo,
  };
}

// Helper to determine time of day based on time difference
function getTimeOfDay(country1: Country, country2: Country): string {
  const diff = country2.timezoneOffset - country1.timezoneOffset;
  
  if (diff >= 10 || diff <= -10) return "the next day";
  if (diff >= 5) return "evening";
  if (diff >= 0) return "afternoon";
  if (diff >= -5) return "morning";
  return "night";
}

// Helper to determine likely activity based on time difference
function getActivityState(country1: Country, country2: Country): string {
  const diff = country2.timezoneOffset - country1.timezoneOffset;
  
  if (diff >= 8 || diff <= -8) return "sleeping";
  if (diff >= 4 || diff <= -12) return "preparing for bed";
  if (diff >= 0) return "finishing their workday";
  if (diff >= -4) return "starting their workday";
  return "having dinner";
}
