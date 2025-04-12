import { getCurrencySymbol } from "@/lib/utils";
import { CountryType } from "types/CountryType";

export default function CountryDetails({ country }: { country: CountryType }) {
  return (
    <div className="">
      <h1 className="text-5xl font-bold">{country.name}</h1>
      <h2 className="text-2xl text-muted-foreground">{country.region}</h2>
      <h2 className="text-xl text-muted-foreground">
        {country.currency} - {getCurrencySymbol(country.currency)}
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h3 className="text-lg font-semibold">Capital</h3>
          <p>{country.capital}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Region</h3>
          <p>{country.region}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Subregion</h3>
          <p>{country.subregion}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Area</h3>
          <p>{country.area.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Population</h3>
          <p>{country.population.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Languages</h3>
          <p>{country.languages.join(", ")}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Coordinates</h3>
          <p>
            {country.coordinates.latitude} - {country.coordinates.longitude}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Timezones</h3>
          <p>{country.timezones.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
