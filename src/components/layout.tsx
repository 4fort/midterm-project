import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
