import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponseType } from "types/ApiResponseType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isErrorResponse(response: ApiResponseType): response is {
  message: string;
  details: string;
  error: true;
  statusCode: string;
} {
  return (response as { error: true }).error === true;
}

export function getCurrencySymbol(currency: string, locale = "en-US") {
  // Extract currency code if in format "Name (CODE)"
  const currencyCode = currency.match(/\(([A-Z]{3})\)$/)?.[1] || currency;

  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).formatToParts(1);
  const currencyPart = parts.find((part) => part.type === "currency");
  return currencyPart?.value || currencyCode;
}

export function isInPopulationRange(population: number, range: string) {
  switch (range) {
    case "lt1m":
      return population < 1000000;
    case "1m-10m":
      return population >= 1000000 && population < 10000000;
    case "10m-50m":
      return population >= 10000000 && population < 50000000;
    case "50m-100m":
      return population >= 50000000 && population < 100000000;
    case "gt100m":
      return population >= 100000000;
    case "all":
      return true;
    default:
      return true;
  }
}
