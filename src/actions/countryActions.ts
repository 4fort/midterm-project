import { ApiResponseType } from "types/ApiResponseType";

const API_URL = "https://countries-api-abhishek.vercel.app/countries";

const countryActions = {
  getAll: async (): Promise<ApiResponseType> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  },
  getSingle: async (name: string): Promise<ApiResponseType> => {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  },
  getSelected: async (countries: string[]): Promise<ApiResponseType> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const _data = await response.json();
    const data = _data.data.filter((country: { name: string }) =>
      countries.includes(country.name)
    );
    return {
      ..._data,
      data,
    };
  },
  getCountryNames: async (): Promise<string[]> => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const _data = await response.json();

    const data = _data.data.map((country: { name: string }) => country.name);

    return data;
  },
};

export default countryActions;
