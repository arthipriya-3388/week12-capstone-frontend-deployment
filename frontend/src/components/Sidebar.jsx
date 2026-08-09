import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "12px 14px",
    marginBottom: "8px",
    textDecoration: "none",
    color: "#ffffff",
    borderRadius: "9px",
    boxSizing: "border-box",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

  const activeStyle = {
    backgroundColor: "#2563eb",
    fontWeight: "700",
  };

  const iconStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: "8px",
    marginRight: "12px",
    fontSize: "17px",
    flexShrink: 0,
  };

  const renderLink = (to, label, icon) => (
    <NavLink
      to={to}
      style={({ isActive }) =>
        isActive
          ? {
              ...menuStyle,
              ...activeStyle,
            }
          : menuStyle
      }
    >
      <span style={iconStyle}>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );

  return (
    <aside
      style={{
        width: "278px",
        minWidth: "278px",
        minHeight: "calc(100vh - 134px)",
        background: "linear-gradient(180deg, #1749a8 0%, #1554c7 100%)",
        padding: "28px 15px",
        boxSizing: "border-box",
        color: "#ffffff",
      }}
    >
      {/* Menu Heading */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#dbeafe",
          marginBottom: "18px",
          paddingLeft: "17px",
          letterSpacing: "0.5px",
        }}
      >
        MENU
      </div>

      {/* Dashboard */}
      {renderLink("/dashboard", "Dashboard", "⌂")}

      {/* Register User */}
      {renderLink("/register-user", "Register User", "♟")}

      {/* Departments */}
      {renderLink("/departments", "Departments", "▦")}

      {/* Doctors */}
      {renderLink("/doctors", "Doctors", "♟")}

      {/* Patients */}
      {renderLink("/patients", "Patients", "♟")}

      {/* Appointments */}
      {renderLink("/appointments", "Appointments", "▣")}

      {/* Laboratory */}
      {renderLink("/laboratory", "Laboratory", "⚗")}

      {/* Medicines */}
      {renderLink("/medicines", "Medicines", "💊")}

      {/* Prescriptions */}
      {renderLink("/prescriptions", "Prescriptions", "▤")}

      {/* Billing */}
      {renderLink("/billing", "Billing", "▥")}

      {/* Reports */}
      {renderLink("/reports", "Reports", "▥")}
    </aside>
  );
};

export default Sidebar;