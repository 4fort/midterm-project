import { Link, useLoaderData, useNavigate } from "react-router";
import { ApiResponseType } from "types/ApiResponseType";
import { isErrorResponse } from "./lib/utils";
import { type CountryType } from "types/CountryType";
import CountryFlag from "./components/country-flag";
import CountryDetails from "./components/country-details";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import CountryBorders from "./components/country-borders";

export default function Country() {
  const res = useLoaderData<{
    country: ApiResponseType;
    borders: ApiResponseType;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isErrorResponse(res.country)) {
    return (
      <div className="text-center py-10 border border-border rounded-lg">
        <h2 className="text-xl text-red-600 mb-2">Error loading country</h2>
        <p>{res.country.message}</p>
        <p>{res.country.details}</p>
        <p className="text-sm text-gray-500">
          Please check the country name and try again.
        </p>
        <Link to="/" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  const country = res.country.data as CountryType;

  return (
    <>
      <div className="mb-8">
        <Button onClick={() => navigate(-1)} variant="secondary">
          <ChevronLeft /> Back
        </Button>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-12">
        <CountryFlag country={country} />
        <CountryDetails country={country} />
      </div>
      <Separator />
      <div className="space-y-4">
        <CountryBorders
          data={res.borders}
          country={(res.country.data as CountryType).name}
        />
      </div>
    </>
  );
}
