import { useEffect, useState } from "react";
import api from "../../services/api";

import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState(null);

  const [formKey, setFormKey] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");

        console.log(
          "Appointments response:",
          response.data
        );

        const responseData = response.data;

        const data =
          responseData.data || responseData;

        const appointmentData = Array.isArray(data)
          ? data
          : data.appointments || [];

        if (isMounted) {
          setAppointments(appointmentData);
          setLoading(false);
        }
      } catch (err) {
        console.error(
          "Failed to fetch appointments:",
          err
        );

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load appointments."
          );

          setLoading(false);
        }
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, []);


  const refreshAppointments = async () => {
    try {
      const response = await api.get(
        "/appointments"
      );

      console.log(
        "Updated appointments response:",
        response.data
      );

      const responseData = response.data;

      const data =
        responseData.data || responseData;

      const appointmentData = Array.isArray(data)
        ? data
        : data.appointments || [];

      setAppointments(appointmentData);
    } catch (err) {
      console.error(
        "Failed to refresh appointments:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to refresh appointments."
      );
    }
  };

  
  const handleSubmit = async (appointmentData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      if (editingAppointment) {
        // RESCHEDULE / UPDATE
        const response = await api.put(
          `/appointments/${editingAppointment.id}`,
          appointmentData
        );

        console.log(
          "Appointment update response:",
          response.data
        );

        setSuccess(
          response.data?.message ||
            "Appointment rescheduled successfully."
        );
      } else {
        // CREATE
        const response = await api.post(
          "/appointments",
          appointmentData
        );

        console.log(
          "Appointment create response:",
          response.data
        );

        setSuccess(
          response.data?.message ||
            "Appointment booked successfully."
        );
      }

      setEditingAppointment(null);

      setFormKey(
        (previousKey) => previousKey + 1
      );

      await refreshAppointments();
    } catch (err) {
      console.error(
        "Failed to save appointment:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save appointment."
      );
    } finally {
      setFormLoading(false);
    }
  };


  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);

    setError("");
    setSuccess("");

    setFormKey(
      (previousKey) => previousKey + 1
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleCancel = () => {
    setEditingAppointment(null);

    setError("");
    setSuccess("");

    setFormKey(
      (previousKey) => previousKey + 1
    );
  };

 
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await api.delete(
        `/appointments/${id}`
      );

      console.log(
        "Appointment delete response:",
        response.data
      );

      setSuccess(
        response.data?.message ||
          "Appointment deleted successfully."
      );

      await refreshAppointments();
    } catch (err) {
      console.error(
        "Failed to delete appointment:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete appointment."
      );
    }
  };


  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Appointments</h1>

      <p
        style={{
          marginBottom: "25px",
        }}
      >
        Manage hospital appointments from this page.
      </p>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            color: "#166534",
            border: "1px solid #bbf7d0",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {success}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#dc2626",
            border: "1px solid #fecaca",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* APPOINTMENT FORM */}
      <AppointmentForm
        key={formKey}
        editingAppointment={editingAppointment}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={formLoading}
      />

      {/* APPOINTMENT LIST */}
      <AppointmentList
        appointments={appointments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Appointments;