const DoctorList = ({
  doctors,
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
        <h2>Doctors</h2>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (!doctors.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Doctors</h2>

        <p>No doctors found.</p>
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
      <h2>Doctors</h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Specialization</th>
              <th style={thStyle}>Qualification</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Consultation Fee</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Available Days</th>
              <th style={thStyle}>Available Time</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={tdStyle}>
                  {doctor.doctorName}
                </td>

                <td style={tdStyle}>
                  {doctor.Department
                    ?.departmentName ||
                    doctor.department
                      ?.departmentName ||
                    doctor.departmentName ||
                    "-"}
                </td>

                <td style={tdStyle}>
                  {doctor.specialization || "-"}
                </td>

                <td style={tdStyle}>
                  {doctor.qualification || "-"}
                </td>

                <td style={tdStyle}>
                  {doctor.experience ?? "-"} years
                </td>

                <td style={tdStyle}>
                  ₹{" "}
                  {Number(
                    doctor.consultationFee || 0
                  ).toLocaleString("en-IN")}
                </td>

                <td style={tdStyle}>
                  {doctor.phone || "-"}
                </td>

                <td style={tdStyle}>
                  {doctor.email || "-"}
                </td>

                <td style={tdStyle}>
                  {Array.isArray(
                    doctor.availableDays
                  )
                    ? doctor.availableDays.join(", ")
                    : doctor.availableDays || "-"}
                </td>

                <td style={tdStyle}>
                  {doctor.availableTime || "-"}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      color:
                        doctor.status === "Active"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {doctor.status || "-"}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    type="button"
                    onClick={() =>
                      onEdit(doctor)
                    }
                    style={{
                      marginRight: "8px",
                      padding: "7px 12px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(doctor.id)
                    }
                    style={{
                      padding: "7px 12px",
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
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  verticalAlign: "top",
};

export default DoctorList;