const LaboratoryList = ({
  laboratoryTests = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "28px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "24px",
        }}
      >
        Laboratory Tests
      </h2>

      {laboratoryTests.length === 0 ? (
        <p>No laboratory tests found.</p>
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
              minWidth: "1000px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Test Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Result</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Ordered Date</th>
                <th style={thStyle}>Completed Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {laboratoryTests.map((test) => (
                <tr key={test.id}>
                  <td style={tdStyle}>
                    {test.id}
                  </td>

                  <td style={tdStyle}>
                    {test.patient?.patientName ||
                      test.patientId}
                  </td>

                  <td style={tdStyle}>
                    {test.doctor?.doctorName ||
                      test.doctorId}
                  </td>

                  <td style={tdStyle}>
                    {test.testName}
                  </td>

                  <td style={tdStyle}>
                    {test.testDescription}
                  </td>

                  <td style={tdStyle}>
                    {test.result || "-"}
                  </td>

                  <td style={tdStyle}>
                    {test.status}
                  </td>

                  <td style={tdStyle}>
                    {test.orderedDate || "-"}
                  </td>

                  <td style={tdStyle}>
                    {test.completedDate || "-"}
                  </td>

                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(test)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(test.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
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

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
  whiteSpace: "nowrap",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  verticalAlign: "top",
};

export default LaboratoryList;