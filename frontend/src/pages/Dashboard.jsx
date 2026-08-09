import { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalMedicines: 0,
    pendingBills: 0,
    todaysAppointments: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    api
      .get("/dashboard")
      .then((response) => {
        if (!isMounted) {
          return;
        }

        console.log("Dashboard response:", response.data);

        const responseData = response.data;
        const data = responseData.data || responseData;

        setDashboardData({
          totalPatients: data.totalPatients || 0,
          totalDoctors: data.totalDoctors || 0,
          totalAppointments: data.totalAppointments || 0,
          totalMedicines: data.totalMedicines || 0,
          pendingBills: data.pendingBills || 0,
          todaysAppointments: data.todaysAppointments || 0,
          totalRevenue: data.totalRevenue || 0,
        });

        setError("");
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }

        console.error("Failed to fetch dashboard data:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data."
        );
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Patients",
      value: dashboardData.totalPatients,
      icon: "👥",
      iconBackground: "#e8f0ff",
      iconColor: "#2563eb",
    },
    {
      title: "Total Doctors",
      value: dashboardData.totalDoctors,
      icon: "🩺",
      iconBackground: "#e8f8e8",
      iconColor: "#16a34a",
    },
    {
      title: "Total Appointments",
      value: dashboardData.totalAppointments,
      icon: "📅",
      iconBackground: "#f3e8ff",
      iconColor: "#9333ea",
    },
    {
      title: "Total Medicines",
      value: dashboardData.totalMedicines,
      icon: "💊",
      iconBackground: "#fff3df",
      iconColor: "#f59e0b",
    },
    {
      title: "Pending Bills",
      value: dashboardData.pendingBills,
      icon: "📄",
      iconBackground: "#ffe8e8",
      iconColor: "#ef4444",
    },
    {
      title: "Today's Appointments",
      value: dashboardData.todaysAppointments,
      icon: "🗓️",
      iconBackground: "#e5f8f5",
      iconColor: "#14b8a6",
    },
    {
      title: "Total Revenue",
      value: `₹ ${Number(
        dashboardData.totalRevenue
      ).toLocaleString("en-IN")}`,
      icon: "₹",
      iconBackground: "#e8f0ff",
      iconColor: "#2563eb",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Dashboard Heading */}
      <h1
        style={{
          margin: "0 0 16px",
          fontSize: "34px",
          fontWeight: "700",
          color: "#172033",
          lineHeight: "1.2",
        }}
      >
        Dashboard
      </h1>

      {/* Welcome Message */}
      <h2
        style={{
          margin: "0 0 42px",
          fontSize: "23px",
          fontWeight: "500",
          color: "#172033",
        }}
      >
        Welcome{" "}
        {user?.name ||
          user?.username ||
          "Admin"}{" "}
        <span style={{ fontSize: "23px" }}>👋</span>
      </h2>

      {/* Error */}
      {error && (
        <p
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            borderRadius: "8px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
          }}
        >
          {error}
        </p>
      )}

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(200px, 1fr))",
          gap: "24px",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "28px",
              minHeight: "180px",
              boxSizing: "border-box",
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "66px",
                height: "66px",
                borderRadius: "12px",
                backgroundColor: card.iconBackground,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                color: card.iconColor,
                marginBottom: "27px",
              }}
            >
              {card.icon}
            </div>

            {/* Card Title */}
            <div
              style={{
                fontSize: "16px",
                color: "#64748b",
                marginBottom: "15px",
                fontWeight: "500",
              }}
            >
              {card.title}
            </div>

            {/* Card Value */}
            <div
              style={{
                fontSize: "31px",
                fontWeight: "500",
                color: "#172033",
                lineHeight: "1",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;