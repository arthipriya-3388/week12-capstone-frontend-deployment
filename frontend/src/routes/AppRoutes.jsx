import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Departments from "../pages/departments/Departments";
import Doctors from "../pages/doctors/Doctors";
import Patients from "../pages/patients/Patients";
import Appointments from "../pages/appointments/Appointments";
import Laboratory from "../pages/laboratory/Laboratory";
import Medicines from "../pages/medicines/Medicines";
import Prescription from "../pages/prescriptions/Prescription";
import Billing from "../pages/billing/Billing";
import Reports from "../pages/reports/Reports";
import RegisterUser from "../pages/RegisterUser";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default */}

        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Dashboard */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Departments */}

        <Route
          path="departments"
          element={<Departments />}
        />

        {/* Doctors */}

        <Route
          path="doctors"
          element={<Doctors />}
        />

        {/* Patients */}

        <Route
          path="patients"
          element={<Patients />}
        />

        {/* Appointments */}

        <Route
          path="appointments"
          element={<Appointments />}
        />

        {/* Laboratory */}

        <Route
          path="laboratory"
          element={<Laboratory />}
        />

        {/* Medicines */}

        <Route
          path="medicines"
          element={<Medicines />}
        />

        {/* Prescriptions */}

        <Route
          path="prescriptions"
          element={<Prescription />}
        />

        {/* Billing */}

        <Route
          path="billing"
          element={<Billing />}
        />

        {/* Reports */}

        <Route
          path="reports"
          element={<Reports />}
        />

        {/* Register User */}

        <Route
          path="register-user"
          element={<RegisterUser />}
        />
      </Route>

      {/* Invalid Route */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;