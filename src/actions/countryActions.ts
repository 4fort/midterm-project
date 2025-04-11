import { ApiResponse } from "types/ApiResponse";

const API_URL = "https://countries-api-abhishek.vercel.app/countries";

const countryActions = {
  getAll: async (): Promise<ApiResponse> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  },
  getSingle: async (name: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  },
};

export default countryActions;
