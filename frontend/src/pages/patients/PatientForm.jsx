import { useState } from "react";

const PatientForm = ({
  editingPatient,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [patientName, setPatientName] = useState(
    editingPatient?.patientName || ""
  );

  const [age, setAge] = useState(
    editingPatient?.age?.toString() || ""
  );

  const [gender, setGender] = useState(
    editingPatient?.gender || ""
  );

  const [phone, setPhone] = useState(
    editingPatient?.phone || ""
  );

  const [email, setEmail] = useState(
    editingPatient?.email || ""
  );

  const [address, setAddress] = useState(
    editingPatient?.address || ""
  );

  const [bloodGroup, setBloodGroup] = useState(
    editingPatient?.bloodGroup || ""
  );

  const [emergencyContact, setEmergencyContact] =
    useState(editingPatient?.emergencyContact || "");

  const [status, setStatus] = useState(
    editingPatient?.status || "Active"
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Patient Name
    if (!patientName.trim()) {
      newErrors.patientName =
        "Patient name is required.";
    } else if (patientName.trim().length < 3) {
      newErrors.patientName =
        "Patient name must be at least 3 characters.";
    } else if (patientName.trim().length > 100) {
      newErrors.patientName =
        "Patient name cannot exceed 100 characters.";
    }

    // Age
    if (!age) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(age)) {
      newErrors.age = "Age must be a valid number.";
    } else if (Number(age) < 0) {
      newErrors.age = "Age cannot be negative.";
    } else if (Number(age) > 120) {
      newErrors.age = "Age cannot exceed 120.";
    }

    // Gender
    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    // Phone
    if (!phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone.trim())) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    // Address
    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }

    // Blood Group
    if (!bloodGroup) {
      newErrors.bloodGroup =
        "Blood group is required.";
    }

    // Emergency Contact
    if (!emergencyContact.trim()) {
      newErrors.emergencyContact =
        "Emergency contact is required.";
    } else if (
      !/^[0-9]{10}$/.test(
        emergencyContact.trim()
      )
    ) {
      newErrors.emergencyContact =
        "Emergency contact must contain exactly 10 digits.";
    }

    // Status
    if (!status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const patientData = {
      patientName: patientName.trim(),
      age: Number(age),
      gender,
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      bloodGroup,
      emergencyContact: emergencyContact.trim(),
      status,
    };

    onSubmit(patientData);
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "500px",
    padding: "10px",
    marginTop: "8px",
    boxSizing: "border-box",
  };

  const errorStyle = {
    color: "red",
    marginTop: "5px",
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
        {editingPatient
          ? "Edit Patient"
          : "Add Patient"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Patient Name */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="patientName">
            <strong>Patient Name</strong>
          </label>

          <br />

          <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(event) =>
              setPatientName(event.target.value)
            }
            placeholder="Enter patient name"
            style={inputStyle}
          />

          {errors.patientName && (
            <p style={errorStyle}>
              {errors.patientName}
            </p>
          )}
        </div>

        {/* Age */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="age">
            <strong>Age</strong>
          </label>

          <br />

          <input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
            placeholder="Enter patient age"
            style={inputStyle}
          />

          {errors.age && (
            <p style={errorStyle}>
              {errors.age}
            </p>
          )}
        </div>

        {/* Gender */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="gender">
            <strong>Gender</strong>
          </label>

          <br />

          <select
            id="gender"
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
            style={{
              padding: "10px",
              marginTop: "8px",
              width: "200px",
            }}
          >
            <option value="">
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">
              Female
            </option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <p style={errorStyle}>
              {errors.gender}
            </p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="phone">
            <strong>Phone Number</strong>
          </label>

          <br />

          <input
            id="phone"
            type="text"
            value={phone}
            maxLength="10"
            onChange={(event) =>
              setPhone(
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="Enter 10-digit phone number"
            style={inputStyle}
          />

          {errors.phone && (
            <p style={errorStyle}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>

          <br />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter patient email"
            style={inputStyle}
          />

          {errors.email && (
            <p style={errorStyle}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="address">
            <strong>Address</strong>
          </label>

          <br />

          <textarea
            id="address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="Enter patient address"
            rows="4"
            style={inputStyle}
          />

          {errors.address && (
            <p style={errorStyle}>
              {errors.address}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="bloodGroup">
            <strong>Blood Group</strong>
          </label>

          <br />

          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(event) =>
              setBloodGroup(event.target.value)
            }
            style={{
              padding: "10px",
              marginTop: "8px",
              width: "200px",
            }}
          >
            <option value="">
              Select Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodGroup && (
            <p style={errorStyle}>
              {errors.bloodGroup}
            </p>
          )}
        </div>

        {/* Emergency Contact */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="emergencyContact">
            <strong>Emergency Contact</strong>
          </label>

          <br />

          <input
            id="emergencyContact"
            type="text"
            value={emergencyContact}
            maxLength="10"
            onChange={(event) =>
              setEmergencyContact(
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="Enter 10-digit emergency contact"
            style={inputStyle}
          />

          {errors.emergencyContact && (
            <p style={errorStyle}>
              {errors.emergencyContact}
            </p>
          )}
        </div>

        {/* Status */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="status">
            <strong>Status</strong>
          </label>

          <br />

          <select
            id="status"
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
            <option value="Active">Active</option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

          {errors.status && (
            <p style={errorStyle}>
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
            : editingPatient
              ? "Update Patient"
              : "Add Patient"}
        </button>

        {editingPatient && (
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

export default PatientForm;