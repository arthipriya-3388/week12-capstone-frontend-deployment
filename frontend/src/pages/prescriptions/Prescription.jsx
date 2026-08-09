import { useCallback, useEffect, useState } from "react";

import api from "../../services/api";

import PrescriptionForm from "./PrescriptionForm";
import PrescriptionList from "./PrescriptionList";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [editingPrescription, setEditingPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [
        prescriptionsResponse,
        patientsResponse,
        doctorsResponse,
        medicinesResponse,
      ] = await Promise.all([
        api.get("/prescriptions"),
        api.get("/patients"),
        api.get("/doctors"),
        api.get("/medicines"),
      ]);

      const prescriptionsData =
        prescriptionsResponse?.data?.data || [];

      const patientsData =
        patientsResponse?.data?.data || [];

      const doctorsData =
        doctorsResponse?.data?.data || [];

      const medicinesData =
        medicinesResponse?.data?.data || [];

      setPrescriptions(
        Array.isArray(prescriptionsData)
          ? prescriptionsData
          : []
      );

      setPatients(
        Array.isArray(patientsData)
          ? patientsData
          : []
      );

      setDoctors(
        Array.isArray(doctorsData)
          ? doctorsData
          : []
      );

      setMedicines(
        Array.isArray(medicinesData)
          ? medicinesData
          : []
      );
    } catch (err) {
      console.error("Prescription data loading error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load prescription data."
      );

      setPrescriptions([]);
      setPatients([]);
      setDoctors([]);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const initializeData = async () => {
      if (cancelled) {
        return;
      }

      await loadData();
    };

    initializeData();

    return () => {
      cancelled = true;
    };
  }, [loadData]);

  const handleSaved = async () => {
    setEditingPrescription(null);
    await loadData();
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingPrescription(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/prescriptions/${id}`);

      await loadData();

      if (editingPrescription?.id === id) {
        setEditingPrescription(null);
      }
    } catch (err) {
      console.error("Delete Prescription Error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete prescription."
      );
    }
  };

  const handleDispense = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to dispense this medicine?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.put(`/prescriptions/dispense/${id}`);

      await loadData();
    } catch (err) {
      console.error("Dispense Medicine Error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to dispense medicine."
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1400px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          marginTop: "0",
          marginBottom: "15px",
        }}
      >
        Prescriptions
      </h1>

      <p
        style={{
          marginBottom: "30px",
        }}
      >
        Manage hospital prescriptions from this page.
      </p>

      {error && (
        <div
          style={{
            padding: "12px 15px",
            marginBottom: "20px",
            border: "1px solid #f5c2c7",
            backgroundColor: "#f8d7da",
            color: "#842029",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* Add / Edit Prescription */}
      <PrescriptionForm
        patients={patients}
        doctors={doctors}
        medicines={medicines}
        editingPrescription={editingPrescription}
        onSaved={handleSaved}
        onCancel={handleCancelEdit}
      />

      {/* Prescription List */}
      <PrescriptionList
        prescriptions={prescriptions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDispense={handleDispense}
      />
    </div>
  );
};

export default Prescription;