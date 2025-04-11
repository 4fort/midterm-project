import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ApiResponse } from "types/ApiResponse";

function Root() {
  // const { countries, getSingleCountry } = useCountry();
  const navigate = useNavigate();
  const countries = useLoaderData<ApiResponse>();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search) {
      setSearch("");
      navigate("/");
      return;
    }

    navigate(`/${search}`);
  };

  return (
    <>
      <h1>Hello World</h1>
      <input
        type="text"
        className="border border-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} className="cursor-pointer">
        search
      </button>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </>
  );
}

export default Root;
