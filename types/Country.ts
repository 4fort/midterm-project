export interface Country {
  name: string;
  capital: string;
  region: Region;
  subregion: string;
  population: number;
  area: number;
  coordinates: Coordinates;
  borders: string[];
  timezones: string[];
  currency: string;
  languages: string[];
  flag: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Fictional = "Fictional",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}
