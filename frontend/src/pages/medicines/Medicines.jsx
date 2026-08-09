import { useEffect, useState } from "react";
import api from "../../services/api";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines");

      const responseData = response.data;

      const medicineData = Array.isArray(
        responseData.data
      )
        ? responseData.data
        : [];

      setMedicines(medicineData);
    } catch (err) {
      console.error("Medicines response:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load medicines."
      );
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadMedicines = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/medicines");

        if (!isMounted) {
          return;
        }

        const medicineData = Array.isArray(
          response.data?.data
        )
          ? response.data.data
          : [];

        setMedicines(medicineData);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error("Medicine loading error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load medicines."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMedicines();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setError("");
      setSuccess("");

      if (editingMedicine) {
        await api.put(
          `/medicines/${editingMedicine.id}`,
          formData
        );

        setSuccess(
          "Medicine updated successfully."
        );
      } else {
        await api.post("/medicines", formData);

        setSuccess(
          "Medicine created successfully."
        );
      }

      setEditingMedicine(null);

      await fetchMedicines();
    } catch (err) {
      console.error("Medicine save error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save medicine."
      );
    }
  };

  const handleEdit = (medicine) => {
    setError("");
    setSuccess("");
    setEditingMedicine(medicine);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/medicines/${id}`);

      setSuccess(
        "Medicine deleted successfully."
      );

      await fetchMedicines();
    } catch (err) {
      console.error("Medicine delete error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete medicine."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingMedicine(null);
    setError("");
    setSuccess("");
  };

  if (loading) {
    return (
      <div>
        <h1>Medicines</h1>
        <p>Loading medicines...</p>
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
        Medicines
      </h1>

      <p
        style={{
          marginBottom: "28px",
        }}
      >
        Manage hospital medicines from this page.
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

      <MedicineForm
        key={
          editingMedicine
            ? `edit-${editingMedicine.id}`
            : "add"
        }
        editingMedicine={editingMedicine}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      <MedicineList
        medicines={medicines}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Medicines;