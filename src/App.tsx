import { useState } from "react";
import useCountry from "../hooks/useCountry";
import { Country } from "types/Country";
import { isErrorResponse } from "./lib/utils";

function App() {
  const { countries, getSingleCountry } = useCountry();

  const [singleCountry, setSingleCountry] = useState<Country | null>(null);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (search.trim() === "") {
      setSingleCountry(null);
      return;
    }
    try {
      const data = await getSingleCountry(search);

      if (isErrorResponse(data)) {
        setSingleCountry(null);
        return;
      }

      if (data) {
        console.log(typeof data.data);
        setSingleCountry(data.data as Country);
      } else {
        setSingleCountry(null);
      }
    } catch (error) {
      console.error("Error fetching single country:", error);
    }
    setSearch("");
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
      <pre>{JSON.stringify(singleCountry ?? countries, null, 2)}</pre>
    </>
  );
}

export default App;
