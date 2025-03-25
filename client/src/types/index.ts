export interface Country {
  code: string;
  name: string;
  capital: string;
  timezoneOffset: number; // in hours from GMT
  timezoneAbbr: string;
  continent: string;
}

export interface TimeInfo {
  time: string;
  date: string;
  timezone: string;
}

export interface TimeDifference {
  hours: number;
  formattedDifference: string;
  description: string;
  businessHoursInfo: string;
}
