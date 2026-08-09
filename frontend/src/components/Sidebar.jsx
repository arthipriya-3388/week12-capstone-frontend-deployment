import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuStyle = {
    display: "block",
    padding: "10px 15px",
    marginBottom: "5px",
    textDecoration: "none",
    color: "#222",
    borderRadius: "5px",
  };

  const activeStyle = {
    backgroundColor: "#ddd",
    fontWeight: "bold",
  };

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "calc(100vh - 100px)",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      Menu

      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Dashboard
      </NavLink>

      {/* Register User - Admin */}
      <NavLink
        to="/register-user"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Register User
      </NavLink>

      {/* Departments */}
      <NavLink
        to="/departments"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Departments
      </NavLink>

      {/* Doctors */}
      <NavLink
        to="/doctors"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Doctors
      </NavLink>

      {/* Patients */}
      <NavLink
        to="/patients"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Patients
      </NavLink>

      {/* Appointments */}
      <NavLink
        to="/appointments"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Appointments
      </NavLink>

      {/* Laboratory */}
      <NavLink
        to="/laboratory"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Laboratory
      </NavLink>

      {/* Medicines */}
      <NavLink
        to="/medicines"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Medicines
      </NavLink>

      {/* Prescriptions */}
      <NavLink
        to="/prescriptions"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Prescriptions
      </NavLink>

      {/* Billing */}
      <NavLink
        to="/billing"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Billing
      </NavLink>

      {/* Reports */}
      <NavLink
        to="/reports"
        style={({ isActive }) =>
          isActive
            ? {
                ...menuStyle,
                ...activeStyle,
              }
            : menuStyle
        }
      >
        Reports
      </NavLink>
    </aside>
  );
};

export default Sidebar;