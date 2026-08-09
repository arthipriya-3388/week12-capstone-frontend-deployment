const DepartmentList = ({
  departments,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <p>Loading departments...</p>
    );
  }

  if (!departments.length) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <p>No departments found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Department List</h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                ID
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Department Name
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Description
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Status
              </th>

              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  {department.id}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  {department.departmentName}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  {department.description}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  {department.status}
                </td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  <button
                    onClick={() =>
                      onEdit(department)
                    }
                    style={{
                      marginRight: "10px",
                      padding: "7px 12px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(department.id)
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

export default DepartmentList;