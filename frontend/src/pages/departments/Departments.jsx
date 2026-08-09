import { useEffect, useState } from "react";
import api from "../../services/api";

import DepartmentForm from "./DepartmentForm";
import DepartmentList from "./DepartmentList";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formLoading, setFormLoading] =
    useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Fetch Departments
  const fetchDepartments = () => {
    setLoading(true);
    setError("");

    api
      .get("/departments")
      .then((response) => {
        console.log(
          "Departments response:",
          response.data
        );

        const responseData = response.data;

        const data =
          responseData.data || responseData;

        const departmentList = Array.isArray(data)
          ? data
          : data.departments || [];

        setDepartments(departmentList);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch departments:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load departments."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Initial Load
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDepartments();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Add / Update Department
  const handleSubmit = async (departmentData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      if (editingDepartment) {
        // Update Department
        await api.put(
          `/departments/${editingDepartment.id}`,
          departmentData
        );

        setSuccess(
          "Department updated successfully."
        );
      } else {
        // Create Department
        await api.post(
          "/departments",
          departmentData
        );

        setSuccess(
          "Department added successfully."
        );
      }

      // Clear edit mode
      setEditingDepartment(null);

      // Refresh department list
      fetchDepartments();
    } catch (err) {
      console.error(
        "Failed to save department:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save department."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Edit Department
  const handleEdit = (department) => {
    setEditingDepartment(department);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingDepartment(null);
    setError("");
    setSuccess("");
  };

  // Delete Department
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/departments/${id}`
      );

      setSuccess(
        "Department deleted successfully."
      );

      // Refresh list
      fetchDepartments();
    } catch (err) {
      console.error(
        "Failed to delete department:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete department."
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Departments</h1>

      <p>
        Manage hospital departments from this
        page.
      </p>

      {/* Success Message */}
      {success && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            color: "green",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "red",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* Department Form */}
      <DepartmentForm
        key={
          editingDepartment
            ? `edit-${editingDepartment.id}`
            : "add-department"
        }
        editingDepartment={editingDepartment}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={formLoading}
      />

      {/* Department List */}
      <DepartmentList
        departments={departments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Departments;