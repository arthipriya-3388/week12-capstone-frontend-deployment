
import { useEffect, useState } from "react";
import api from "../../services/api";

import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const [departments, setDepartments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formLoading, setFormLoading] =
    useState(false);

  const [editingDoctor, setEditingDoctor] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  
  const fetchDoctors = () => {
    setLoading(true);
    setError("");

    api
      .get("/doctors")
      .then((response) => {
        console.log(
          "Doctors response:",
          response.data
        );

        const responseData =
          response.data;

        const data =
          responseData.data ||
          responseData;

        const doctorList = Array.isArray(
          data
        )
          ? data
          : data.doctors || [];

        setDoctors(doctorList);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch doctors:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load doctors."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  
  const fetchDepartments = () => {
    api
      .get("/departments")
      .then((response) => {
        console.log(
          "Departments response:",
          response.data
        );

        const responseData =
          response.data;

        const data =
          responseData.data ||
          responseData;

        const departmentList =
          Array.isArray(data)
            ? data
            : data.departments || [];

        setDepartments(
          departmentList
        );
      })
      .catch((err) => {
        console.error(
          "Failed to fetch departments:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load departments."
        );
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
      fetchDepartments();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  
  const handleSubmit = async (
    doctorData
  ) => {console.log(
  "Doctor data being sent:",
  JSON.stringify(doctorData, null, 2)
);
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      console.log(
        "Doctor data being sent:",
        doctorData
      );

      if (editingDoctor) {
        
        await api.put(
          `/doctors/${editingDoctor.id}`,
          doctorData
        );

        setSuccess(
          "Doctor updated successfully."
        );
      } else {
        
        await api.post(
          "/doctors",
          doctorData
        );

        setSuccess(
          "Doctor added successfully."
        );
      }

      setEditingDoctor(null);

      fetchDoctors();
    } catch (err) {
      console.error(
        "Failed to save doctor:",
        err
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save doctor."
      );
    } finally {
      setFormLoading(false);
    }
  };

  
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 
  const handleCancel = () => {
    setEditingDoctor(null);

    setError("");
    setSuccess("");
  };

  
  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this doctor?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/doctors/${id}`
      );

      setSuccess(
        "Doctor deleted successfully."
      );

      fetchDoctors();
    } catch (err) {
      console.error(
        "Failed to delete doctor:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to delete doctor."
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Doctors</h1>

      <p>
        Manage hospital doctors from this
        page.
      </p>

      {/* Success */}
      {success && (
        <div
          style={{
            backgroundColor:
              "#e8f5e9",
            color: "green",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            backgroundColor:
              "#ffebee",
            color: "red",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* Doctor Form */}
      <DoctorForm
        key={
          editingDoctor
            ? `edit-${editingDoctor.id}`
            : "add-doctor"
        }
        editingDoctor={editingDoctor}
        departments={departments}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={formLoading}
      />

      {/* Doctor List */}
      <DoctorList
        doctors={doctors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Doctors;

