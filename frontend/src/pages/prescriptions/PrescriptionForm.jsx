import { useEffect, useState } from "react";

import api from "../../services/api";

const PrescriptionForm = ({
  patients,
  doctors,
  medicines,
  editingPrescription,
  onSaved,
  onCancel,
}) => {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // Load Editing Prescription
  // --------------------------------------------------

  useEffect(() => {
    if (!editingPrescription) {
      return;
    }

    const prescription = editingPrescription;

    const timer = setTimeout(() => {
      setPatientId(
        prescription.patientId
          ? String(prescription.patientId)
          : ""
      );

      setDoctorId(
        prescription.doctorId
          ? String(prescription.doctorId)
          : ""
      );

      setMedicineId(
        prescription.medicineId
          ? String(prescription.medicineId)
          : ""
      );

      setDosage(prescription.dosage || "");

      setFrequency(prescription.frequency || "");

      setDuration(prescription.duration || "");

      setQuantity(
        prescription.quantity !== undefined &&
          prescription.quantity !== null
          ? String(prescription.quantity)
          : ""
      );

      setInstructions(
        prescription.instructions || ""
      );

      setErrors({});
      setSubmitError("");
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [editingPrescription]);

  // --------------------------------------------------
  // Reset Form
  // --------------------------------------------------

  const resetForm = () => {
    setPatientId("");
    setDoctorId("");
    setMedicineId("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setQuantity("");
    setInstructions("");
    setErrors({});
    setSubmitError("");
  };

  // --------------------------------------------------
  // Validate Form
  // --------------------------------------------------

  const validateForm = () => {
    const newErrors = {};

    if (!patientId) {
      newErrors.patientId =
        "Patient is required.";
    }

    if (!doctorId) {
      newErrors.doctorId =
        "Doctor is required.";
    }

    if (!medicineId) {
      newErrors.medicineId =
        "Medicine is required.";
    }

    if (!dosage.trim()) {
      newErrors.dosage =
        "Dosage is required.";
    }

    if (!frequency.trim()) {
      newErrors.frequency =
        "Frequency is required.";
    }

    if (!duration.trim()) {
      newErrors.duration =
        "Duration is required.";
    }

    if (!quantity) {
      newErrors.quantity =
        "Quantity is required.";
    } else if (Number(quantity) < 1) {
      newErrors.quantity =
        "Quantity must be at least 1.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------
  // Submit Prescription
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    const prescriptionData = {
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      medicineId: Number(medicineId),
      dosage: dosage.trim(),
      frequency: frequency.trim(),
      duration: duration.trim(),
      quantity: Number(quantity),
      instructions: instructions.trim(),
    };

    try {
      setSaving(true);

      if (editingPrescription) {
        await api.put(
          `/prescriptions/${editingPrescription.id}`,
          prescriptionData
        );
      } else {
        await api.post(
          "/prescriptions",
          prescriptionData
        );
      }

      resetForm();

      await onSaved();
    } catch (err) {
      console.error(
        "Save Prescription Error:",
        err
      );

      const backendErrors =
        err?.response?.data?.errors;

      if (Array.isArray(backendErrors)) {
        const formattedErrors = {};

        backendErrors.forEach((item) => {
          if (item?.path) {
            formattedErrors[item.path] =
              item.msg;
          }
        });

        setErrors(formattedErrors);
      }

      setSubmitError(
        err?.response?.data?.message ||
          "Failed to save prescription."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Cancel
  // --------------------------------------------------

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "30px",
        marginBottom: "30px",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginTop: "0",
          marginBottom: "25px",
        }}
      >
        {editingPrescription
          ? "Edit Prescription"
          : "Add Prescription"}
      </h2>

      {submitError && (
        <div
          style={{
            padding: "10px 15px",
            marginBottom: "20px",
            border: "1px solid #f5c2c7",
            backgroundColor: "#f8d7da",
            color: "#842029",
            borderRadius: "5px",
          }}
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Patient */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="patientId"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Patient
          </label>

          <select
            id="patientId"
            value={patientId}
            onChange={(event) =>
              setPatientId(event.target.value)
            }
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          >
            <option value="">
              Select Patient
            </option>

            {Array.isArray(patients) &&
              patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.firstName ||
                  patient.lastName
                    ? `${patient.firstName || ""} ${
                        patient.lastName || ""
                      }`.trim()
                    : `Patient ${patient.id}`}
                </option>
              ))}
          </select>

          {errors.patientId && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.patientId}
            </p>
          )}
        </div>

        {/* Doctor */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="doctorId"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Doctor
          </label>

          <select
            id="doctorId"
            value={doctorId}
            onChange={(event) =>
              setDoctorId(event.target.value)
            }
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          >
            <option value="">
              Select Doctor
            </option>

            {Array.isArray(doctors) &&
              doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.firstName ||
                  doctor.lastName
                    ? `Dr. ${
                        doctor.firstName || ""
                      } ${
                        doctor.lastName || ""
                      }`.trim()
                    : `Doctor ${doctor.id}`}
                </option>
              ))}
          </select>

          {errors.doctorId && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.doctorId}
            </p>
          )}
        </div>

        {/* Medicine */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="medicineId"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Medicine
          </label>

          <select
            id="medicineId"
            value={medicineId}
            onChange={(event) =>
              setMedicineId(event.target.value)
            }
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          >
            <option value="">
              Select Medicine
            </option>

            {Array.isArray(medicines) &&
              medicines.map((medicine) => (
                <option
                  key={medicine.id}
                  value={medicine.id}
                >
                  {medicine.medicineName}
                </option>
              ))}
          </select>

          {errors.medicineId && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.medicineId}
            </p>
          )}
        </div>

        {/* Dosage */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="dosage"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Dosage
          </label>

          <input
            id="dosage"
            type="text"
            value={dosage}
            onChange={(event) =>
              setDosage(event.target.value)
            }
            placeholder="Example: 500mg"
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />

          {errors.dosage && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.dosage}
            </p>
          )}
        </div>

        {/* Frequency */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="frequency"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Frequency
          </label>

          <input
            id="frequency"
            type="text"
            value={frequency}
            onChange={(event) =>
              setFrequency(event.target.value)
            }
            placeholder="Example: Twice a day"
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />

          {errors.frequency && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.frequency}
            </p>
          )}
        </div>

        {/* Duration */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="duration"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Duration
          </label>

          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(event) =>
              setDuration(event.target.value)
            }
            placeholder="Example: 5 days"
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />

          {errors.duration && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.duration}
            </p>
          )}
        </div>

        {/* Quantity */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="quantity"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Quantity
          </label>

          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(event.target.value)
            }
            placeholder="Enter quantity"
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />

          {errors.quantity && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                marginBottom: "0",
              }}
            >
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Instructions */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="instructions"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Instructions
          </label>

          <textarea
            id="instructions"
            value={instructions}
            onChange={(event) =>
              setInstructions(event.target.value)
            }
            placeholder="Enter medicine instructions"
            rows="4"
            style={{
              width: "620px",
              maxWidth: "100%",
              padding: "12px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />

        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "10px 18px",
              cursor: saving
                ? "not-allowed"
                : "pointer",
            }}
          >
            {saving
              ? "Saving..."
              : editingPrescription
              ? "Update Prescription"
              : "Add Prescription"}
          </button>

          {editingPrescription && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              style={{
                padding: "10px 18px",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;