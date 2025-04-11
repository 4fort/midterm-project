import { useEffect, useState } from "react";
import { type ApiResponse } from "../../types/ApiResponse";
import { type Country } from "../../types/Country";

const API_URL = "https://countries-api-abhishek.vercel.app/countries";

export default function useCountry() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [countries, setCountries] = useState<Country[] | []>([]);

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

  const getSingleCountry = async (name: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  return { data, countries, getSingleCountry };
}
