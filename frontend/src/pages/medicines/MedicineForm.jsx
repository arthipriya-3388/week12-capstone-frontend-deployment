import { useState } from "react";

const MedicineForm = ({
  editingMedicine,
  onSubmit,
  onCancel,
}) => {
  const [medicineName, setMedicineName] = useState(
    editingMedicine?.medicineName || ""
  );

  const [category, setCategory] = useState(
    editingMedicine?.category || ""
  );

  const [manufacturer, setManufacturer] = useState(
    editingMedicine?.manufacturer || ""
  );

  const [price, setPrice] = useState(
    editingMedicine?.price ?? ""
  );

  const [stockQuantity, setStockQuantity] = useState(
    editingMedicine?.stockQuantity ?? ""
  );

  const [expiryDate, setExpiryDate] = useState(
    editingMedicine?.expiryDate || ""
  );

  const [status, setStatus] = useState(
    editingMedicine?.status || "Available"
  );

  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    if (!medicineName.trim()) {
      setFormError("Medicine name is required.");
      return;
    }

    if (!category.trim()) {
      setFormError("Category is required.");
      return;
    }

    if (!manufacturer.trim()) {
      setFormError("Manufacturer is required.");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setFormError(
        "Price must be greater than or equal to 0."
      );
      return;
    }

    if (
      stockQuantity === "" ||
      Number(stockQuantity) < 0
    ) {
      setFormError(
        "Stock quantity cannot be negative."
      );
      return;
    }

    if (!expiryDate) {
      setFormError("Expiry date is required.");
      return;
    }

    const data = {
      medicineName: medicineName.trim(),
      category: category.trim(),
      manufacturer: manufacturer.trim(),
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      expiryDate,
      status,
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
        {editingMedicine
          ? "Edit Medicine"
          : "Add Medicine"}
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
              htmlFor="medicineName"
              style={labelStyle}
            >
              Medicine Name
            </label>

            <input
              id="medicineName"
              type="text"
              value={medicineName}
              onChange={(event) =>
                setMedicineName(event.target.value)
              }
              placeholder="Enter medicine name"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              style={labelStyle}
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              placeholder="Enter category"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="manufacturer"
              style={labelStyle}
            >
              Manufacturer
            </label>

            <input
              id="manufacturer"
              type="text"
              value={manufacturer}
              onChange={(event) =>
                setManufacturer(event.target.value)
              }
              placeholder="Enter manufacturer"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              style={labelStyle}
            >
              Price
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              placeholder="Enter price"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="stockQuantity"
              style={labelStyle}
            >
              Stock Quantity
            </label>

            <input
              id="stockQuantity"
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(event) =>
                setStockQuantity(event.target.value)
              }
              placeholder="Enter stock quantity"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="expiryDate"
              style={labelStyle}
            >
              Expiry Date
            </label>

            <input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(event) =>
                setExpiryDate(event.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="medicineStatus"
              style={labelStyle}
            >
              Status
            </label>

            <select
              id="medicineStatus"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              style={inputStyle}
            >
              <option value="Available">
                Available
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <button type="submit">
              {editingMedicine
                ? "Update Medicine"
                : "Add Medicine"}
            </button>

            {editingMedicine && (
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

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "8px",
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

export default MedicineForm;