import { useEffect, useState } from "react";
import { type ApiResponseType } from "../../types/ApiResponseType";
import { type CountryType } from "../../types/CountryType";

const API_URL = "https://countries-api-abhishek.vercel.app/countries";

export default function useCountry() {
  const [data, setData] = useState<ApiResponseType | null>(null);
  const [countries, setCountries] = useState<CountryType[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => {
      setData(null);
      setCountries([]);
    };
  }, []);

  const getSingleCountry = async (name: string): Promise<ApiResponseType> => {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  return { data, countries, getSingleCountry };
}
