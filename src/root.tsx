import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { ApiResponse } from "types/ApiResponse";
import { isErrorResponse } from "./lib/utils";
import CountryCards from "./components/country-cards";
import Loader from "./components/ui/loader";
import { Input } from "./components/ui/input";
import { Country } from "types/Country";
import useDebounce from "./hooks/useDebounce";
import Header from "./components/header";

function Root() {
  const data = useLoaderData<ApiResponse>();

  const [countries, setCountries] = useState(data);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
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
    console.log("search:", search, "debouncedSearch:", debouncedSearch);
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
        const filtered = (data.data as Country[]).filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

        return {
          ...data,
          data: filtered,
        };
      });
      setIsLoading(false);
      return;
    }
    // eslint-disable-next-line
  }, [search, debouncedSearch]);

  return (
    <>
      <Header />
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country..."
      />

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
