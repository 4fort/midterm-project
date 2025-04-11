import { createBrowserRouter } from "react-router";
import Root from "./root";
import Country from "./country";
import countryActions from "./actions/countryActions";

const routes = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const { getAll } = countryActions;
      const data = await getAll();
      return data;
    },
    Component: Root,
    children: [],
  },
  {
    path: ":name",
    loader: async ({ params }) => {
      const name = params.name;
      const { getSingle } = countryActions;

      if (!name) {
        return null;
      }

      return getSingle(name);
    },
    Component: Country,
  },
]);

export default routes;
