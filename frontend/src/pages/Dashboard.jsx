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

        console.log(
          "Dashboard response:",
          response.data
        );

        const responseData = response.data;
        const data =
          responseData.data || responseData;

        setDashboardData({
          totalPatients:
            data.totalPatients || 0,

          totalDoctors:
            data.totalDoctors || 0,

          totalAppointments:
            data.totalAppointments || 0,

          totalMedicines:
            data.totalMedicines || 0,

          pendingBills:
            data.pendingBills || 0,

          todaysAppointments:
            data.todaysAppointments || 0,

          totalRevenue:
            data.totalRevenue || 0,
        });

        setError("");
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }

        console.error(
          "Failed to fetch dashboard data:",
          err
        );

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
      <div>
        <h1>Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>
        Welcome{" "}
        {user?.name ||
          user?.username ||
          "Admin"}
      </h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Total Patients */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Total Patients</h3>

          <p>
            {dashboardData.totalPatients}
          </p>
        </div>

        {/* Total Doctors */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Total Doctors</h3>

          <p>
            {dashboardData.totalDoctors}
          </p>
        </div>

        {/* Total Appointments */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Total Appointments</h3>

          <p>
            {dashboardData.totalAppointments}
          </p>
        </div>

        {/* Total Medicines */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Total Medicines</h3>

          <p>
            {dashboardData.totalMedicines}
          </p>
        </div>

        {/* Pending Bills */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Pending Bills</h3>

          <p>
            {dashboardData.pendingBills}
          </p>
        </div>

        {/* Today's Appointments */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>
            Today's Appointments
          </h3>

          <p>
            {dashboardData.todaysAppointments}
          </p>
        </div>

        {/* Total Revenue */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Total Revenue</h3>

          <p>
            ₹{" "}
            {Number(
              dashboardData.totalRevenue
            ).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;