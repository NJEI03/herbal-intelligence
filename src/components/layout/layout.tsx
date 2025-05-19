
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function Layout() {
  const location = useLocation();
  const isConsultPage = location.pathname === "/consult";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isConsultPage && <Footer />}
    </div>
  );
}
