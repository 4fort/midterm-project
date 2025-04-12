import { useNavigate } from "react-router";
import { ApiResponseType } from "types/ApiResponseType";
import { CountryType } from "types/CountryType";
import { isErrorResponse } from "@/lib/utils";
import { Button } from "./ui/button";

export default function CountryCards({ data }: { data: ApiResponseType }) {
  const navigate = useNavigate();

  return (
    <>
      {isErrorResponse(data) ? (
        <div className="text-center py-10 border border-border rounded-lg">
          <h2 className="text-xl text-red-600 mb-2">Error loading countries</h2>
          <p>{data.message}</p>
          <Button onClick={() => navigate("/")} className="mt-5">
            Refresh
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(data.data as CountryType[]).map((country, i) => (
            <div
              key={`${country.name}-${country.capital}-${i}`}
              className="h-64 border border-border rounded-lg shadow-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(`/${country.name}`)}
              aria-label={`View details for ${country.name}`}
            >
              <div className="relative h-full flex flex-col justify-between p-5">
                <div className="relative z-10 text-right">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {country.name}
                  </h2>
                  <p className="text-white/90 font-medium">{country.capital}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-black/40 text-white text-sm rounded-full">
                    {country.region}
                  </span>
                </div>

                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-l from-black/80 from-0% to-black/20 to-100% group-hover:from-black/70 transition-all duration-500 z-10" />
                  <img
                    src={country.flag}
                    alt={`Flag of ${country.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 z-0"
                    loading="lazy"
                  />
                </div>

                <div className="relative z-10 mt-auto">
                  <span className="inline-block text-sm text-white/80 group-hover:text-white transition-colors">
                    Click to view details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
