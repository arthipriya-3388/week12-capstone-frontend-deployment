import { useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const RegisterUser = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "Doctor",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");


    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (formData.fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters.");
      return;
    }

    

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError(
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError(
        "Password must contain at least one number."
      );
      return;
    }

   

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError(
        "Phone number must be exactly 10 digits."
      );
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Register request:",
        formData
      );

      const response = await api.post(
        "/auth/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Registration response:",
        response.data
      );

      setMessage(
        "User registered successfully."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role: "Doctor",
      });
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      console.log(
        "Backend response:",
        error.response?.data
      );

      
      const backendMessage =
        error.response?.data?.message;

      
      const validationErrors =
        error.response?.data?.data;

      if (
        Array.isArray(validationErrors) &&
        validationErrors.length > 0
      ) {
        const firstError =
          validationErrors[0];

        setError(
          firstError.msg ||
            backendMessage ||
            "Validation failed."
        );
      } else {
        setError(
          backendMessage ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Register User
        </h1>

        <p style={styles.subtitle}>
          Create an account for a hospital employee.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div style={styles.formGroup}>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              style={styles.input}
            />

            <small style={styles.passwordHint}>
              Must contain at least 6 characters,
              one uppercase letter, one lowercase
              letter, and one number.
            </small>
          </div>

          {/* Phone */}
          <div style={styles.formGroup}>
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              maxLength={10}
              style={styles.input}
            />
          </div>

          {/* Role */}
          <div style={styles.formGroup}>
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              style={styles.input}
            >
              <option value="Doctor">
                Doctor
              </option>

              <option value="Nurse">
                Nurse
              </option>

              <option value="Lab Technician">
                Lab Technician
              </option>

              <option value="Pharmacist">
                Pharmacist
              </option>

              <option value="Receptionist">
                Receptionist
              </option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p style={styles.success}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Registering..."
              : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
  },

  card: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: "8px",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "25px",
  },

  formGroup: {
    marginBottom: "18px",
  },

  input: {
    width: "100%",
    padding: "11px",
    marginTop: "6px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  passwordHint: {
    display: "block",
    marginTop: "6px",
    color: "#6b7280",
    fontSize: "12px",
    lineHeight: "1.4",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    color: "#dc2626",
    marginBottom: "15px",
  },

  success: {
    color: "#16a34a",
    marginBottom: "15px",
  },
};

export default RegisterUser;