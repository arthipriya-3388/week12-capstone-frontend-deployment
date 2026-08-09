/* eslint-disable no-unused-vars */
import { useState } from "react";

const DoctorForm = ({
  editingDoctor,
  departments,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [doctorName, setDoctorName] = useState(
    editingDoctor?.doctorName || ""
  );

  const [departmentId, setDepartmentId] = useState(
    editingDoctor?.departmentId ||
      editingDoctor?.DepartmentId ||
      ""
  );

  const [specialization, setSpecialization] = useState(
    editingDoctor?.specialization || ""
  );

  const [qualification, setQualification] = useState(
    editingDoctor?.qualification || ""
  );

  const [experience, setExperience] = useState(
    editingDoctor?.experience ?? ""
  );

  const [consultationFee, setConsultationFee] = useState(
    editingDoctor?.consultationFee ?? ""
  );

  const [phone, setPhone] = useState(
    editingDoctor?.phone || ""
  );

  const [email, setEmail] = useState(
    editingDoctor?.email || ""
  );

  const [availableDays, setAvailableDays] = useState(
    Array.isArray(editingDoctor?.availableDays)
      ? editingDoctor.availableDays.join(", ")
      : editingDoctor?.availableDays || ""
  );

  const [availableTime, setAvailableTime] = useState(
    editingDoctor?.availableTime || ""
  );

  const [status, setStatus] = useState(
    editingDoctor?.status || "Active"
  );

  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!doctorName.trim()) {
      newErrors.doctorName =
        "Doctor name is required.";
    } else if (doctorName.trim().length < 3) {
      newErrors.doctorName =
        "Doctor name must be at least 3 characters.";
    } else if (doctorName.trim().length > 100) {
      newErrors.doctorName =
        "Doctor name cannot exceed 100 characters.";
    }

    if (!departmentId) {
      newErrors.departmentId =
        "Department is required.";
    }

    if (!specialization.trim()) {
      newErrors.specialization =
        "Specialization is required.";
    } else if (
      specialization.trim().length < 2
    ) {
      newErrors.specialization =
        "Specialization must be at least 2 characters.";
    }

    if (!qualification.trim()) {
      newErrors.qualification =
        "Qualification is required.";
    }

    if (
      experience === "" ||
      experience === null
    ) {
      newErrors.experience =
        "Experience is required.";
    } else if (Number(experience) < 0) {
      newErrors.experience =
        "Experience cannot be negative.";
    }

    if (
      consultationFee === "" ||
      consultationFee === null
    ) {
      newErrors.consultationFee =
        "Consultation fee is required.";
    } else if (Number(consultationFee) <= 0) {
      newErrors.consultationFee =
        "Consultation fee must be greater than 0.";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[0-9]{10}$/.test(phone.trim())
    ) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    if (!email.trim()) {
      newErrors.email =
        "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!availableDays.trim()) {
      newErrors.availableDays =
        "Available days are required.";
    }

    if (!availableTime.trim()) {
      newErrors.availableTime =
        "Available time is required.";
    }

    if (!status) {
      newErrors.status =
        "Status is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const days = availableDays
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean);

        onSubmit({
          doctorName: doctorName.trim(),
          departmentId: Number(departmentId),
          specialization: specialization.trim(),
          qualification: qualification.trim(),
          experience: Number(experience),
          consultationFee: Number(consultationFee),
          phone: phone.trim(),
          email: email.trim(),
          availableDays: availableDays
            .split(",")
            .map((day) => day.trim())
            .filter(Boolean)
            .join(","),
          availableTime: availableTime.trim(),
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
        {editingDoctor
          ? "Edit Doctor"
          : "Add Doctor"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Doctor Name */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Doctor Name</strong>
          </label>

          <br />

          <input
            type="text"
            value={doctorName}
            onChange={(event) =>
              setDoctorName(event.target.value)
            }
            placeholder="Enter doctor name"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.doctorName && (
            <p style={{ color: "red" }}>
              {errors.doctorName}
            </p>
          )}
        </div>

        {/* Department */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Department</strong>
          </label>

          <br />

          <select
            value={departmentId}
            onChange={(event) =>
              setDepartmentId(event.target.value)
            }
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          >
            <option value="">
              Select Department
            </option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.departmentName}
              </option>
            ))}
          </select>

          {errors.departmentId && (
            <p style={{ color: "red" }}>
              {errors.departmentId}
            </p>
          )}
        </div>

        {/* Specialization */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Specialization</strong>
          </label>

          <br />

          <input
            type="text"
            value={specialization}
            onChange={(event) =>
              setSpecialization(
                event.target.value
              )
            }
            placeholder="Example: Cardiologist"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.specialization && (
            <p style={{ color: "red" }}>
              {errors.specialization}
            </p>
          )}
        </div>

        {/* Qualification */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Qualification</strong>
          </label>

          <br />

          <input
            type="text"
            value={qualification}
            onChange={(event) =>
              setQualification(
                event.target.value
              )
            }
            placeholder="Example: MBBS, MD"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.qualification && (
            <p style={{ color: "red" }}>
              {errors.qualification}
            </p>
          )}
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>
              Experience (Years)
            </strong>
          </label>

          <br />

          <input
            type="number"
            min="0"
            value={experience}
            onChange={(event) =>
              setExperience(event.target.value)
            }
            placeholder="Enter experience"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.experience && (
            <p style={{ color: "red" }}>
              {errors.experience}
            </p>
          )}
        </div>

        {/* Consultation Fee */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>
              Consultation Fee
            </strong>
          </label>

          <br />

          <input
            type="number"
            min="1"
            value={consultationFee}
            onChange={(event) =>
              setConsultationFee(
                event.target.value
              )
            }
            placeholder="Enter consultation fee"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.consultationFee && (
            <p style={{ color: "red" }}>
              {errors.consultationFee}
            </p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Phone</strong>
          </label>

          <br />

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="Enter 10 digit phone number"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.phone && (
            <p style={{ color: "red" }}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Email</strong>
          </label>

          <br />

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter doctor email"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.email && (
            <p style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Available Days */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>
              Available Days
            </strong>
          </label>

          <br />

          <input
            type="text"
            value={availableDays}
            onChange={(event) =>
              setAvailableDays(
                event.target.value
              )
            }
            placeholder="Example: Monday, Wednesday, Friday"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          <small>
            Separate multiple days using commas.
          </small>

          {errors.availableDays && (
            <p style={{ color: "red" }}>
              {errors.availableDays}
            </p>
          )}
        </div>

        {/* Available Time */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>
              Available Time
            </strong>
          </label>

          <br />

          <input
            type="text"
            value={availableTime}
            onChange={(event) =>
              setAvailableTime(
                event.target.value
              )
            }
            placeholder="Example: 10:00 AM - 2:00 PM"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.availableTime && (
            <p style={{ color: "red" }}>
              {errors.availableTime}
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
            disabled={loading}
            style={{
              padding: "10px",
              marginTop: "8px",
            }}
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
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
            : editingDoctor
            ? "Update Doctor"
            : "Add Doctor"}
        </button>

        {editingDoctor && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "10px 20px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default DoctorForm;