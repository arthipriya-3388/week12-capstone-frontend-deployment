import { useState } from "react";

const LaboratoryForm = ({
  patients = [],
  doctors = [],
  editingTest,
  onSubmit,
  onCancel,
}) => {
  const [patientId, setPatientId] = useState(
    editingTest?.patientId
      ? String(editingTest.patientId)
      : ""
  );

  const [doctorId, setDoctorId] = useState(
    editingTest?.doctorId
      ? String(editingTest.doctorId)
      : ""
  );

  const [testName, setTestName] = useState(
    editingTest?.testName || ""
  );

  const [testDescription, setTestDescription] = useState(
    editingTest?.testDescription || ""
  );

  const [result, setResult] = useState(
    editingTest?.result || ""
  );

  const [status, setStatus] = useState(
    editingTest?.status || "Pending"
  );

  const [orderedDate, setOrderedDate] = useState(
    editingTest?.orderedDate || ""
  );

  const [completedDate, setCompletedDate] = useState(
    editingTest?.completedDate || ""
  );

  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    if (!patientId) {
      setFormError("Please select a patient.");
      return;
    }

    if (!doctorId) {
      setFormError("Please select a doctor.");
      return;
    }

    if (!testName.trim()) {
      setFormError("Test name is required.");
      return;
    }

    if (!testDescription.trim()) {
      setFormError("Test description is required.");
      return;
    }

    const data = {
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      testName: testName.trim(),
      testDescription: testDescription.trim(),
      result: result.trim() || undefined,
      status,
      orderedDate: orderedDate || undefined,
      completedDate: completedDate || undefined,
    };

    await onSubmit(data);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "28px",
        marginBottom: "28px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "24px",
        }}
      >
        {editingTest
          ? "Edit Laboratory Test"
          : "Add Laboratory Test"}
      </h2>

      {formError && (
        <div
          style={{
            backgroundColor: "#fde8e8",
            color: "#b42318",
            padding: "12px 14px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "560px",
          }}
        >
          <div>
            <label
              htmlFor="patientId"
              style={{
                display: "block",
                fontWeight: "600",
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
              style={inputStyle}
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.patientName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="doctorId"
              style={{
                display: "block",
                fontWeight: "600",
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
              style={inputStyle}
            >
              <option value="">Select Doctor</option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.doctorName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="testName"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Test Name
            </label>

            <input
              id="testName"
              type="text"
              value={testName}
              onChange={(event) =>
                setTestName(event.target.value)
              }
              placeholder="Example: Blood Sugar"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="testDescription"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Test Description
            </label>

            <textarea
              id="testDescription"
              value={testDescription}
              onChange={(event) =>
                setTestDescription(event.target.value)
              }
              placeholder="Example: Fasting Blood Sugar Test"
              rows="4"
              style={textareaStyle}
            />
          </div>

          <div>
            <label
              htmlFor="result"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Result
            </label>

            <textarea
              id="result"
              value={result}
              onChange={(event) =>
                setResult(event.target.value)
              }
              placeholder="Enter test result"
              rows="3"
              style={textareaStyle}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              style={inputStyle}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="orderedDate"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Ordered Date
            </label>

            <input
              id="orderedDate"
              type="date"
              value={orderedDate}
              onChange={(event) =>
                setOrderedDate(event.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="completedDate"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Completed Date
            </label>

            <input
              id="completedDate"
              type="date"
              value={completedDate}
              onChange={(event) =>
                setCompletedDate(event.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <button type="submit">
              {editingTest
                ? "Update Test"
                : "Add Test"}
            </button>

            {editingTest && (
              <button
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  maxWidth: "560px",
  boxSizing: "border-box",
  padding: "12px",
  fontSize: "15px",
  border: "1px solid #aaa",
  borderRadius: "4px",
};

const textareaStyle = {
  width: "100%",
  maxWidth: "560px",
  boxSizing: "border-box",
  padding: "12px",
  fontSize: "15px",
  border: "1px solid #aaa",
  borderRadius: "4px",
  resize: "vertical",
};

export default LaboratoryForm;