import { useState } from "react";

const AppointmentForm = ({
  editingAppointment,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [patientId, setPatientId] = useState(
    editingAppointment?.patientId?.toString() || ""
  );

  const [doctorId, setDoctorId] = useState(
    editingAppointment?.doctorId?.toString() || ""
  );

  const [appointmentDate, setAppointmentDate] =
    useState(
      editingAppointment?.appointmentDate
        ? editingAppointment.appointmentDate.substring(
            0,
            10
          )
        : ""
    );

  const [appointmentTime, setAppointmentTime] =
    useState(
      editingAppointment?.appointmentTime
        ? editingAppointment.appointmentTime.substring(
            0,
            5
          )
        : ""
    );

  const [reason, setReason] = useState(
    editingAppointment?.reason || ""
  );

  const [status, setStatus] = useState(
    editingAppointment?.status || "Upcoming"
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!patientId) {
      newErrors.patientId =
        "Patient ID is required.";
    } else if (
      !/^[1-9][0-9]*$/.test(patientId)
    ) {
      newErrors.patientId =
        "Patient ID must be a valid number.";
    }

    if (!doctorId) {
      newErrors.doctorId =
        "Doctor ID is required.";
    } else if (
      !/^[1-9][0-9]*$/.test(doctorId)
    ) {
      newErrors.doctorId =
        "Doctor ID must be a valid number.";
    }

    if (!appointmentDate) {
      newErrors.appointmentDate =
        "Appointment date is required.";
    }

    if (!appointmentTime) {
      newErrors.appointmentTime =
        "Appointment time is required.";
    }

    if (!reason.trim()) {
      newErrors.reason =
        "Appointment reason is required.";
    } else if (reason.trim().length < 3) {
      newErrors.reason =
        "Reason must be at least 3 characters.";
    } else if (reason.trim().length > 500) {
      newErrors.reason =
        "Reason cannot exceed 500 characters.";
    }

    if (!status) {
      newErrors.status =
        "Appointment status is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      appointmentDate,
      appointmentTime,
      reason: reason.trim(),
      status,
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        marginBottom: "30px",
      }}
    >
      <h2>
        {editingAppointment
          ? "Edit Appointment"
          : "Add Appointment"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Patient ID */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Patient ID</strong>
          </label>

          <br />

          <input
            type="number"
            min="1"
            value={patientId}
            onChange={(event) =>
              setPatientId(event.target.value)
            }
            placeholder="Enter patient ID"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.patientId && (
            <p style={{ color: "red" }}>
              {errors.patientId}
            </p>
          )}
        </div>

        {/* Doctor ID */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Doctor ID</strong>
          </label>

          <br />

          <input
            type="number"
            min="1"
            value={doctorId}
            onChange={(event) =>
              setDoctorId(event.target.value)
            }
            placeholder="Enter doctor ID"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.doctorId && (
            <p style={{ color: "red" }}>
              {errors.doctorId}
            </p>
          )}
        </div>

        {/* Appointment Date */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Appointment Date</strong>
          </label>

          <br />

          <input
            type="date"
            value={appointmentDate}
            onChange={(event) =>
              setAppointmentDate(
                event.target.value
              )
            }
            style={{
              padding: "10px",
              marginTop: "8px",
            }}
          />

          {errors.appointmentDate && (
            <p style={{ color: "red" }}>
              {errors.appointmentDate}
            </p>
          )}
        </div>

        {/* Appointment Time */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Appointment Time</strong>
          </label>

          <br />

          <input
            type="time"
            value={appointmentTime}
            onChange={(event) =>
              setAppointmentTime(
                event.target.value
              )
            }
            style={{
              padding: "10px",
              marginTop: "8px",
            }}
          />

          {errors.appointmentTime && (
            <p style={{ color: "red" }}>
              {errors.appointmentTime}
            </p>
          )}
        </div>

        {/* Reason */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Reason</strong>
          </label>

          <br />

          <textarea
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            placeholder="Enter appointment reason"
            rows="4"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.reason && (
            <p style={{ color: "red" }}>
              {errors.reason}
            </p>
          )}
        </div>

        {/* Status */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Status</strong>
          </label>

          <br />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            style={{
              padding: "10px",
              marginTop: "8px",
              width: "200px",
            }}
          >
            <option value="Upcoming">
              Upcoming
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {errors.status && (
            <p style={{ color: "red" }}>
              {errors.status}
            </p>
          )}
        </div>

        {/* Buttons */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Saving..."
            : editingAppointment
            ? "Update Appointment"
            : "Add Appointment"}
        </button>

        {editingAppointment && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "10px 20px",
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;