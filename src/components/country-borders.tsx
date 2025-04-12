import { isErrorResponse } from "@/lib/utils";
import { ApiResponseType } from "types/ApiResponseType";
import { CountryType } from "types/CountryType";
import CountryCards from "./country-cards";

export default function CountryBorders({
  country,
  data,
}: {
  country: string;
  data: ApiResponseType;
}) {
  return (
    <>
      <h2 className="text-2xl font-bold">Border Countries</h2>
      {!isErrorResponse(data) && (data.data as CountryType[]).length === 0 ? (
        <p className="text-center text-gray-500">
          No border countries found for {country}.
        </p>
      ) : (
        <CountryCards data={data} />
      )}
    </>
  );
}
