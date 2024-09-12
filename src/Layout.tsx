import { Outlet } from "react-router-dom";
import WebNavbar from "./components/WebNavbar";

export function Layout() {
  return (
    <>
      <WebNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
