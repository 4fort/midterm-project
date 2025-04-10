import { Country } from "./Country";

export type ApiResponse =
  | {
      message: string;
      data: Country | Country[];
      statusCode: string;
    }
  | {
      message: string;
      details: string;
      error: true;
      statusCode: string;
    };
