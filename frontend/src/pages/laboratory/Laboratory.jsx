/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../services/api";
import LaboratoryForm from "./LaboratoryForm";
import LaboratoryList from "./LaboratoryList";

const Laboratory = () => {
  const [laboratoryTests, setLaboratoryTests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingTest, setEditingTest] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchLaboratoryTests = async () => {
    try {
      const response = await api.get("/laboratory");

      const responseData = response.data;

      const testData = Array.isArray(responseData.data)
        ? responseData.data
        : [];

      setLaboratoryTests(testData);
    } catch (err) {
      console.error("Laboratory response:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load laboratory tests."
      );
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");

      const responseData = response.data;

      const patientData = Array.isArray(responseData.data)
        ? responseData.data
        : [];

      setPatients(patientData);
    } catch (err) {
      console.error("Patients response:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load patients."
      );
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");

      const responseData = response.data;

      const doctorData = Array.isArray(responseData.data)
        ? responseData.data
        : [];

      setDoctors(doctorData);
    } catch (err) {
      console.error("Doctors response:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load doctors."
      );
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          laboratoryResponse,
          patientsResponse,
          doctorsResponse,
        ] = await Promise.all([
          api.get("/laboratory"),
          api.get("/patients"),
          api.get("/doctors"),
        ]);

        if (!isMounted) {
          return;
        }

        const laboratoryData = Array.isArray(
          laboratoryResponse.data?.data
        )
          ? laboratoryResponse.data.data
          : [];

        const patientData = Array.isArray(
          patientsResponse.data?.data
        )
          ? patientsResponse.data.data
          : [];

        const doctorData = Array.isArray(
          doctorsResponse.data?.data
        )
          ? doctorsResponse.data.data
          : [];

        setLaboratoryTests(laboratoryData);
        setPatients(patientData);
        setDoctors(doctorData);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error("Laboratory loading error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load laboratory data."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setError("");
      setSuccess("");

      if (editingTest) {
        await api.put(
          `/laboratory/${editingTest.id}`,
          formData
        );

        setSuccess(
          "Laboratory test updated successfully."
        );
      } else {
        await api.post("/laboratory", formData);

        setSuccess(
          "Laboratory test created successfully."
        );
      }

      setEditingTest(null);

      await fetchLaboratoryTests();
    } catch (err) {
      console.error("Laboratory save error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save laboratory test."
      );
    }
  };

  const handleEdit = (test) => {
    setError("");
    setSuccess("");
    setEditingTest(test);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this laboratory test?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/laboratory/${id}`);

      setSuccess(
        "Laboratory test deleted successfully."
      );

      await fetchLaboratoryTests();
    } catch (err) {
      console.error("Laboratory delete error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete laboratory test."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingTest(null);
    setError("");
    setSuccess("");
  };

  if (loading) {
    return (
      <div>
        <h1>Laboratory</h1>
        <p>Loading laboratory data...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h1
        style={{
          marginBottom: "12px",
        }}
      >
        Laboratory
      </h1>

      <p
        style={{
          marginBottom: "28px",
        }}
      >
        Manage laboratory tests and results.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#fde8e8",
            color: "#b42318",
            padding: "14px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            padding: "14px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      <LaboratoryForm
        key={editingTest ? `edit-${editingTest.id}` : "add"}
        patients={patients}
        doctors={doctors}
        editingTest={editingTest}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      <LaboratoryList
        laboratoryTests={laboratoryTests}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Laboratory;