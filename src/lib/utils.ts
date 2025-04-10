import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse } from "types/ApiResponse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isErrorResponse(
  response: ApiResponse
): response is {
  message: string;
  details: string;
  error: true;
  statusCode: string;
} {
  return (response as { error: true }).error === true;
}
