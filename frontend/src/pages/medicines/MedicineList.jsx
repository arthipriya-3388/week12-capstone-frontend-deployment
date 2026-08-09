const MedicineList = ({
  medicines = [],
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
        All Medicines
      </h2>

      {medicines.length === 0 ? (
        <p>No medicines found.</p>
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
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>
                  Medicine Name
                </th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>
                  Manufacturer
                </th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>
                  Expiry Date
                </th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td style={tdStyle}>
                    {medicine.id}
                  </td>

                  <td style={tdStyle}>
                    {medicine.medicineName}
                  </td>

                  <td style={tdStyle}>
                    {medicine.category}
                  </td>

                  <td style={tdStyle}>
                    {medicine.manufacturer}
                  </td>

                  <td style={tdStyle}>
                    ₹{medicine.price}
                  </td>

                  <td style={tdStyle}>
                    {medicine.stockQuantity}
                  </td>

                  <td style={tdStyle}>
                    {medicine.expiryDate}
                  </td>

                  <td style={tdStyle}>
                    {medicine.status}
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
                          onEdit(medicine)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(medicine.id)
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

export default MedicineList;