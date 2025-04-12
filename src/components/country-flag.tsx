import { CountryType } from "types/CountryType";

export default function CountryFlag({ country }: { country: CountryType }) {
  return (
    <div className="w-auto h-min border border-border rounded overflow-hidden shadow-lg relative group">
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
