import { useState } from "react";

const DepartmentForm = ({
  editingDepartment,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [departmentName, setDepartmentName] = useState(
    editingDepartment?.departmentName || ""
  );

  const [description, setDescription] = useState(
    editingDepartment?.description || ""
  );

  const [status, setStatus] = useState(
    editingDepartment?.status || "Active"
  );

  const [errors, setErrors] = useState({});

  
  const validateForm = () => {
    const newErrors = {};

    
    if (!departmentName.trim()) {
      newErrors.departmentName =
        "Department name is required.";
    } else if (departmentName.trim().length < 3) {
      newErrors.departmentName =
        "Department name must be at least 3 characters.";
    } else if (departmentName.trim().length > 100) {
      newErrors.departmentName =
        "Department name cannot exceed 100 characters.";
    }

   
    if (!description.trim()) {
      newErrors.description =
        "Description is required.";
    } else if (description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters.";
    } else if (description.trim().length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters.";
    }

    
    if (!status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    onSubmit({
      departmentName: departmentName.trim(),
      description: description.trim(),
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
        {editingDepartment
          ? "Edit Department"
          : "Add Department"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Department Name */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Department Name</strong>
          </label>

          <br />

          <input
            type="text"
            value={departmentName}
            onChange={(event) =>
              setDepartmentName(event.target.value)
            }
            placeholder="Enter department name"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.departmentName && (
            <p style={{ color: "red" }}>
              {errors.departmentName}
            </p>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Description</strong>
          </label>

          <br />

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Enter department description"
            rows="4"
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />

          {errors.description && (
            <p style={{ color: "red" }}>
              {errors.description}
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
            : editingDepartment
            ? "Update Department"
            : "Add Department"}
        </button>

        {editingDepartment && (
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

export default DepartmentForm;