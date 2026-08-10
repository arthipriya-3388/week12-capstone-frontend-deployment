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
        }
      } finally {
        if (isMounted) {
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
      const response = await api.get("/appointments");

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
        await api.put(
          `/appointments/${editingAppointment.id}`,
          appointmentData
        );

        setSuccess(
          "Appointment rescheduled successfully."
        );
      } else {
        await api.post(
          "/appointments",
          appointmentData
        );

        setSuccess(
          "Appointment added successfully."
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

 
  const handleReschedule = (appointment) => {
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

  
  const handleCancelAppointment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.put(`/appointments/${id}`, {
        status: "Cancelled",
      });

      setSuccess(
        "Appointment cancelled successfully."
      );

      await refreshAppointments();
    } catch (err) {
      console.error(
        "Failed to cancel appointment:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to cancel appointment."
      );
    }
  };

 
  const handleFormCancel = () => {
    setEditingAppointment(null);
    setError("");

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

      await api.delete(
        `/appointments/${id}`
      );

      setSuccess(
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
        Manage hospital appointments from this
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

      {/* Appointment Form */}
      <AppointmentForm
        key={formKey}
        editingAppointment={editingAppointment}
        onSubmit={handleSubmit}
        onCancel={handleFormCancel}
        loading={formLoading}
      />

      {/* Appointment List */}
      <AppointmentList
        appointments={appointments}
        loading={loading}
        onReschedule={handleReschedule}
        onCancel={handleCancelAppointment}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Appointments;