const PrescriptionList = ({
  prescriptions,
  loading,
  onEdit,
  onDelete,
  onDispense,
}) => {
  const getPatientName = (prescription) => {
    const patient = prescription?.patient;

    if (!patient) {
      return prescription?.patientId || "-";
    }

    if (patient.firstName || patient.lastName) {
      return `${patient.firstName || ""} ${
        patient.lastName || ""
      }`.trim();
    }

    if (patient.name) {
      return patient.name;
    }

    return prescription?.patientId || "-";
  };

  const getDoctorName = (prescription) => {
    const doctor = prescription?.doctor;

    if (!doctor) {
      return prescription?.doctorId || "-";
    }

    if (doctor.firstName || doctor.lastName) {
      return `Dr. ${(
        `${doctor.firstName || ""} ${
          doctor.lastName || ""
        }`
      ).trim()}`;
    }

    if (doctor.name) {
      return doctor.name;
    }

    return prescription?.doctorId || "-";
  };

  const getMedicineName = (prescription) => {
    const medicine = prescription?.medicine;

    if (!medicine) {
      return prescription?.medicineId || "-";
    }

    return (
      medicine.medicineName ||
      medicine.name ||
      prescription?.medicineId ||
      "-"
    );
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "30px",
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
        All Prescriptions
      </h2>

      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Patient</th>
                <th style={headerStyle}>Doctor</th>
                <th style={headerStyle}>Medicine</th>
                <th style={headerStyle}>Dosage</th>
                <th style={headerStyle}>Frequency</th>
                <th style={headerStyle}>Duration</th>
                <th style={headerStyle}>Quantity</th>
                <th style={headerStyle}>Instructions</th>
                <th style={headerStyle}>Status</th>
                <th style={headerStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.id}>
                  <td style={cellStyle}>
                    {prescription.id}
                  </td>

                  <td style={cellStyle}>
                    {getPatientName(prescription)}
                  </td>

                  <td style={cellStyle}>
                    {getDoctorName(prescription)}
                  </td>

                  <td style={cellStyle}>
                    {getMedicineName(prescription)}
                  </td>

                  <td style={cellStyle}>
                    {prescription.dosage || "-"}
                  </td>

                  <td style={cellStyle}>
                    {prescription.frequency || "-"}
                  </td>

                  <td style={cellStyle}>
                    {prescription.duration || "-"}
                  </td>

                  <td style={cellStyle}>
                    {prescription.quantity || "-"}
                  </td>

                  <td style={cellStyle}>
                    {prescription.instructions || "-"}
                  </td>

                  <td style={cellStyle}>
                    {prescription.status || "Pending"}
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(prescription)
                      }
                      style={{
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(prescription.id)
                      }
                      style={{
                        marginRight:
                          prescription.status ===
                          "Pending"
                            ? "8px"
                            : "0",
                      }}
                    >
                      Delete
                    </button>

                    {prescription.status ===
                      "Pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          onDispense(
                            prescription.id
                          )
                        }
                      >
                        Dispense
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const headerStyle = {
  textAlign: "left",
  padding: "12px",
  border: "1px solid #ddd",
  backgroundColor: "#f4f4f4",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const cellStyle = {
  textAlign: "left",
  padding: "12px",
  border: "1px solid #ddd",
  verticalAlign: "top",
};

export default PrescriptionList;