const AppointmentList = ({
  appointments,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (!appointments.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Appointment List</h2>

        <p>No appointments found.</p>
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
      <h2>Appointment List</h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>
                ID
              </th>

              <th style={headerStyle}>
                Patient ID
              </th>

              <th style={headerStyle}>
                Doctor ID
              </th>

              <th style={headerStyle}>
                Appointment Date
              </th>

              <th style={headerStyle}>
                Appointment Time
              </th>

              <th style={headerStyle}>
                Reason
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
            {appointments.map(
              (appointment) => (
                <tr key={appointment.id}>
                  <td style={cellStyle}>
                    {appointment.id}
                  </td>

                  <td style={cellStyle}>
                    {appointment.patientId}
                  </td>

                  <td style={cellStyle}>
                    {appointment.doctorId}
                  </td>

                  <td style={cellStyle}>
                    {appointment.appointmentDate
                      ? appointment.appointmentDate.substring(
                          0,
                          10
                        )
                      : "-"}
                  </td>

                  <td style={cellStyle}>
                    {appointment.appointmentTime
                      ? appointment.appointmentTime.substring(
                          0,
                          5
                        )
                      : "-"}
                  </td>

                  <td style={cellStyle}>
                    {appointment.reason || "-"}
                  </td>

                  <td style={cellStyle}>
                    {appointment.status || "-"}
                  </td>

                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(appointment)
                      }
                      style={{
                        padding: "7px 12px",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(appointment.id)
                      }
                      style={{
                        padding: "7px 12px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headerStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  verticalAlign: "top",
};

export default AppointmentList;