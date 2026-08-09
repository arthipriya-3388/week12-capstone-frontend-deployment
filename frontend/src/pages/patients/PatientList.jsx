const PatientList = ({
  patients,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Patient List</h2>
        <p>Loading patients...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    >
      <h2>Patient List</h2>

      {patients.length === 0 ? (
        <p>No patients found.</p>
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
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>
                  ID
                </th>

                <th style={headerStyle}>
                  Patient Name
                </th>

                <th style={headerStyle}>
                  Age
                </th>

                <th style={headerStyle}>
                  Gender
                </th>

                <th style={headerStyle}>
                  Phone
                </th>

                <th style={headerStyle}>
                  Email
                </th>

                <th style={headerStyle}>
                  Blood Group
                </th>

                <th style={headerStyle}>
                  Emergency Contact
                </th>

                <th style={headerStyle}>
                  Address
                </th>

                <th style={headerStyle}>
                  Status
                </th>

                <th style={headerStyle}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={cellStyle}>
                    {patient.id}
                  </td>

                  <td style={cellStyle}>
                    {patient.patientName}
                  </td>

                  <td style={cellStyle}>
                    {patient.age}
                  </td>

                  <td style={cellStyle}>
                    {patient.gender}
                  </td>

                  <td style={cellStyle}>
                    {patient.phone}
                  </td>

                  <td style={cellStyle}>
                    {patient.email}
                  </td>

                  <td style={cellStyle}>
                    {patient.bloodGroup}
                  </td>

                  <td style={cellStyle}>
                    {patient.emergencyContact}
                  </td>

                  <td style={cellStyle}>
                    {patient.address}
                  </td>

                  <td style={cellStyle}>
                    {patient.status}
                  </td>

                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(patient)
                      }
                      style={{
                        padding: "7px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(patient.id)
                      }
                      style={{
                        padding: "7px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default PatientList;