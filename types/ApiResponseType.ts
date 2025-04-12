import { CountryType } from "./CountryType";

export type ApiResponseType =
  | {
      message: string;
      data: CountryType | CountryType[];
      statusCode: string;
    }
  | {
      message: string;
      details: string;
      error: true;
      statusCode: string;
    };
