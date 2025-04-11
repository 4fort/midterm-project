import { useLoaderData } from "react-router";
import { ApiResponse } from "types/ApiResponse";

export default function Country() {
  const country = useLoaderData<ApiResponse>();
  console.log(country);
  return (
    <div>
      Country
      <pre>{JSON.stringify(country, null, 2)}</pre>;
    </div>
  );
}
