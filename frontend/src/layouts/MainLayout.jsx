import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >

      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "calc(100vh - 134px)",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: "45px 42px",
            boxSizing: "border-box",
            backgroundColor: "#f8fafc",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}