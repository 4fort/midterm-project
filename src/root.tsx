import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { ApiResponseType } from "types/ApiResponseType";
import { isErrorResponse, isInPopulationRange } from "./lib/utils";
import CountryCards from "./components/country-cards";
import Loader from "./components/ui/loader";
import { Input } from "./components/ui/input";
import { CountryType, regions } from "../types/CountryType";
import useDebounce from "./hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./components/ui/button";

const populationRanges = [
  { label: "All Populations", value: "all" },
  { label: "Less than 1M", value: "lt1m" },
  { label: "1M to 10M", value: "1m-10m" },
  { label: "10M to 50M", value: "10m-50m" },
  { label: "50M to 100M", value: "50m-100m" },
  { label: "More than 100M", value: "gt100m" },
];

function Root() {
  const data = useLoaderData<ApiResponseType>();

  const [countries, setCountries] = useState(data);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [regionFilter, setRegionFilter] = useState("");
  const [populationFilter, setPopulationFilter] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isErrorResponse(data)) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    setIsLoading(true);

    if (isErrorResponse(countries)) {
      setIsLoading(false);
      return;
    }
    if (search === "") {
      setIsLoading(false);
      setCountries(data);
      return;
    }

    if (search === debouncedSearch) {
      setCountries(() => {
        if (isErrorResponse(data)) {
          return data;
        }
        const filtered = (data.data as CountryType[]).filter(
          (country) =>
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.area.toString().includes(search) ||
            country.capital.toLowerCase().includes(search.toLowerCase()) ||
            country.region.toLowerCase().includes(search.toLowerCase()) ||
            country.subregion.toLowerCase().includes(search.toLowerCase()) ||
            country.currency.toLowerCase().includes(search.toLowerCase()) ||
            country.languages.some((language) =>
              language.toLowerCase().includes(search.toLowerCase())
            )
        );

        return {
          ...data,
          data: filtered,
        };
      });
      setRegionFilter("all");
      setPopulationFilter("all");
      setIsLoading(false);
      return;
    }
    // eslint-disable-next-line
  }, [search, debouncedSearch]);

  useEffect(() => {
    setCountries(() => {
      if (isErrorResponse(data)) {
        return data;
      }
      const filtered = (data.data as CountryType[]).filter((country) => {
        const regionMatch =
          regionFilter === "all" || regionFilter === ""
            ? true
            : country.region === regionFilter;

        const populationMatch = isInPopulationRange(
          country.population,
          populationFilter
        );

        return regionMatch && populationMatch;
      });

      return {
        ...data,
        data: filtered,
      };
    });
    // eslint-disable-next-line
  }, [regionFilter, populationFilter]);

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row items-start md:items-center gap-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-lg! px-4! py-6! bg-background! w-full md:w-auto"
          placeholder="Search for a country..."
        />
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {(regionFilter || populationFilter || search) && (
            <Button
              variant="link"
              onClick={() => {
                setRegionFilter("");
                setPopulationFilter("");
                setSearch("");
                setCountries(data);
              }}
            >
              Clear
            </Button>
          )}
          <Select onValueChange={setRegionFilter} defaultValue={regionFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={setPopulationFilter}
            defaultValue={populationFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Population" />
            </SelectTrigger>
            <SelectContent>
              {populationRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : (
        <CountryCards data={countries} />
      )}
    </>
  );
}

export default Root;
