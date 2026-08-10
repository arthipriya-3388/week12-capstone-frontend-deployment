import { useEffect, useState } from "react";
import api from "../../services/api";

import PatientForm from "./PatientForm";
import PatientList from "./PatientList";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] =
    useState(false);

  const [editingPatient, setEditingPatient] =
    useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  const fetchPatients = async () => {
    try {
      setError("");

      const response = await api.get(
        "/patients"
      );

      console.log(
        "Patients response:",
        response.data
      );

      const responseData = response.data;

      const data =
        responseData.data || responseData;

      const patientList = Array.isArray(data)
        ? data
        : data.patients || [];

      setPatients(patientList);
    } catch (err) {
      console.error(
        "Failed to fetch patients:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load patients."
      );
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    let isMounted = true;

    const loadPatients = async () => {
      try {
        const response = await api.get(
          "/patients"
        );

        const responseData = response.data;

        const data =
          responseData.data || responseData;

        const patientList = Array.isArray(data)
          ? data
          : data.patients || [];

        if (isMounted) {
          setPatients(patientList);
          setError("");
        }
      } catch (err) {
        console.error(
          "Failed to fetch patients:",
          err
        );

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load patients."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  
  const handleSubmit = async (patientData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      if (editingPatient) {
        await api.put(
          `/patients/${editingPatient.id}`,
          patientData
        );

        setSuccess(
          "Patient updated successfully."
        );
      } else {
        await api.post(
          "/patients",
          patientData
        );

        setSuccess(
          "Patient added successfully."
        );
      }

      setEditingPatient(null);

      await fetchPatients();
    } catch (err) {
      console.error(
        "Failed to save patient:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save patient."
      );
    } finally {
      setFormLoading(false);
    }
  };

  
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  const handleCancel = () => {
    setEditingPatient(null);
    setError("");
    setSuccess("");
  };

  
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/patients/${id}`
      );

      setSuccess(
        "Patient deleted successfully."
      );

      await fetchPatients();
    } catch (err) {
      console.error(
        "Failed to delete patient:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete patient."
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Patients</h1>

      <p>
        Manage hospital patients from this
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

      {/* Patient Form */}
      <PatientForm
        key={
          editingPatient
            ? editingPatient.id
            : "new-patient"
        }
        editingPatient={editingPatient}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={formLoading}
      />

      {/* Patient List */}
      <PatientList
        patients={patients}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Patients;