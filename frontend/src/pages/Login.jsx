import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    loading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7fb",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "40px",
          boxSizing: "border-box",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 18px",
              borderRadius: "12px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🏥
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              letterSpacing: "0",
            }}
          >
           AarogyaCare Multispeciality Hospital Pvt. Ltd.
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "15px",
              color: "#6b7280",
            }}
          >
            Sign in to access your hospital dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                textAlign: "left",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={loading}
              style={{
                width: "100%",
                height: "46px",
                padding: "0 14px",
                boxSizing: "border-box",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                color: "#111827",
                background: "#ffffff",
              }}
            />
          </div>

          {/* Password */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                textAlign: "left",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={loading}
              style={{
                width: "100%",
                height: "46px",
                padding: "0 14px",
                boxSizing: "border-box",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                color: "#111827",
                background: "#ffffff",
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "10px 12px",
                borderRadius: "7px",
                fontSize: "14px",
                marginBottom: "18px",
                textAlign: "left",
              }}
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "46px",
              border: "none",
              borderRadius: "8px",
              background: loading
                ? "#93c5fd"
                : "#2563eb",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              marginTop: "5px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "28px",
            paddingTop: "18px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#9ca3af",
            }}
          >
            Hospital Management System
          </p>
        </div>
      </div>
    </div>
  );
}