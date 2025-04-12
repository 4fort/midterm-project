import { createBrowserRouter } from "react-router";
import Root from "./root";
import Country from "./country";
import countryActions from "./actions/countryActions";
import { isErrorResponse } from "./lib/utils";
import { CountryType } from "types/CountryType";
import Layout from "./components/layout";

const routes = createBrowserRouter([
  {
    loader: async () => {
      const { getCountryNames } = countryActions;
      const data = await getCountryNames();
      return data;
    },
    Component: Layout,
    children: [
      {
        path: "/",
        loader: async () => {
          const { getAll } = countryActions;
          const data = await getAll();
          return data;
        },
        Component: Root,
      },
      {
        path: ":name",
        loader: async ({ params }) => {
          const name = params.name;
          const { getSingle, getSelected } = countryActions;

          if (!name) {
            return null;
          }

          const country = await getSingle(name);

          if (isErrorResponse(country)) {
            return null;
          }

          return {
            country,
            borders: await getSelected((country.data as CountryType).borders),
          };
        },
        Component: Country,
      },
    ],
  },
]);

export default routes;
