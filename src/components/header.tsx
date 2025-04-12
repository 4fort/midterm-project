import { Globe } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Link, useLoaderData, useNavigate } from "react-router";
import { GlobalSearch } from "./global-search";

export default function Header() {
  const countryNames = useLoaderData();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 md:grid-cols-3 border-b border-border p-6 backdrop-blur-lg bg-background/80">
      <h1
        className="md:text-2xl font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Globe className="hidden md:inline" /> Visualizing Country Information
      </h1>

      <nav className="hidden md:flex items-center justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center justify-end gap-4">
        <GlobalSearch items={countryNames} />
        <ThemeToggle />
      </div>
    </header>
  );
}
