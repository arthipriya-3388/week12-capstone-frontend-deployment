import { useEffect, useState } from "react";
import api from "../../services/api";

const BILLING_URL = "/billings";

const emptyForm = {
  patientId: "",
  consultationCharge: "",
  labCharge: "",
  pharmacyCharge: "",
};

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState(emptyForm);

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [paymentBillId, setPaymentBillId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  // --------------------------------------------------
  // Load Bills and Patients
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setError("");

        const [billsResponse, patientsResponse] =
          await Promise.all([
            api.get(BILLING_URL),
            api.get("/patients"),
          ]);

        if (cancelled) {
          return;
        }

        setBills(
          billsResponse.data?.data ||
            billsResponse.data?.bills ||
            []
        );

        setPatients(
          patientsResponse.data?.data ||
            patientsResponse.data?.patients ||
            []
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Billing data error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load billing data."
        );
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // Handle Form Changes
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Generate Bill
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const payload = {
        patientId: Number(formData.patientId),
        consultationCharge: Number(
          formData.consultationCharge
        ),
        labCharge: Number(formData.labCharge),
        pharmacyCharge: Number(
          formData.pharmacyCharge
        ),
      };

      const response = await api.post(
        BILLING_URL,
        payload
      );

      const newBill = response.data?.data;

      if (newBill) {
        setBills((current) => [
          newBill,
          ...current,
        ]);
      }

      setFormData(emptyForm);
    } catch (err) {
      console.error("Generate bill error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to generate bill."
      );
    }
  };

  // --------------------------------------------------
  // Start Payment
  // --------------------------------------------------

  const handleStartPayment = (billId) => {
    setPaymentBillId(billId);
    setPaymentMethod("");
  };

  // --------------------------------------------------
  // Cancel Payment
  // --------------------------------------------------

  const handleCancelPayment = () => {
    setPaymentBillId(null);
    setPaymentMethod("");
  };

  // --------------------------------------------------
  // Record Payment
  // --------------------------------------------------

  const handleRecordPayment = async (billId) => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    try {
      setError("");

      const response = await api.put(
        `${BILLING_URL}/payment/${billId}`,
        {
          paymentMethod,
        }
      );

      const updatedBill = response.data?.data;

      if (updatedBill) {
        setBills((current) =>
          current.map((bill) =>
            bill.id === billId
              ? updatedBill
              : bill
          )
        );
      }

      setPaymentBillId(null);
      setPaymentMethod("");
    } catch (err) {
      console.error(
        "Record payment error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to record payment."
      );
    }
  };

  // --------------------------------------------------
  // Patient Name
  // --------------------------------------------------

  const getPatientName = (patient) => {
    if (!patient) {
      return "-";
    }

    if (patient.firstName || patient.lastName) {
      return `${patient.firstName || ""} ${
        patient.lastName || ""
      }`.trim();
    }

    return (
      patient.name ||
      patient.fullName ||
      `Patient ${patient.id}`
    );
  };

  // --------------------------------------------------
  // Search Bills
  // --------------------------------------------------

  const filteredBills = bills.filter((bill) => {
    const patientName = getPatientName(
      bill.patient
    );

    const searchableText = `
      ${bill.id}
      ${bill.patientId}
      ${patientName}
      ${bill.consultationCharge || ""}
      ${bill.labCharge || ""}
      ${bill.pharmacyCharge || ""}
      ${bill.totalAmount || ""}
      ${bill.paymentStatus || ""}
      ${bill.paymentMethod || ""}
    `.toLowerCase();

    return searchableText.includes(
      searchTerm.toLowerCase()
    );
  });

  // --------------------------------------------------
  // Format Amount
  // --------------------------------------------------

  const formatAmount = (amount) => {
    const value = Number(amount || 0);

    return `₹${value.toFixed(2)}`;
  };

  // --------------------------------------------------
  // Styles
  // --------------------------------------------------

  const pageStyle = {
    padding: "30px 20px",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "30px",
    marginBottom: "28px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "620px",
    maxWidth: "100%",
    padding: "12px",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const selectStyle = {
    width: "620px",
    maxWidth: "100%",
    padding: "12px",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 18px",
    marginRight: "10px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <h1>Billing</h1>

      <p>
        Manage hospital billing and payments from
        this page.
      </p>

      {/* Error */}

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #cc0000",
            borderRadius: "5px",
            color: "#cc0000",
            backgroundColor: "#fff5f5",
          }}
        >
          {error}
        </div>
      )}

      {/* --------------------------------------------- */}
      {/* Generate Bill */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Generate Bill</h2>

        <form onSubmit={handleSubmit}>
          {/* Patient */}

          <div style={formGroupStyle}>
            <label
              htmlFor="patientId"
              style={labelStyle}
            >
              Patient
            </label>

            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              style={selectStyle}
            >
              <option value="">
                Select Patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {getPatientName(patient)}
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Charge */}

          <div style={formGroupStyle}>
            <label
              htmlFor="consultationCharge"
              style={labelStyle}
            >
              Consultation Charge
            </label>

            <input
              id="consultationCharge"
              name="consultationCharge"
              type="number"
              min="0"
              step="0.01"
              value={
                formData.consultationCharge
              }
              onChange={handleChange}
              placeholder="Enter consultation charge"
              required
              style={inputStyle}
            />
          </div>

          {/* Lab Charge */}

          <div style={formGroupStyle}>
            <label
              htmlFor="labCharge"
              style={labelStyle}
            >
              Lab Charge
            </label>

            <input
              id="labCharge"
              name="labCharge"
              type="number"
              min="0"
              step="0.01"
              value={formData.labCharge}
              onChange={handleChange}
              placeholder="Enter lab charge"
              required
              style={inputStyle}
            />
          </div>

          {/* Pharmacy Charge */}

          <div style={formGroupStyle}>
            <label
              htmlFor="pharmacyCharge"
              style={labelStyle}
            >
              Pharmacy Charge
            </label>

            <input
              id="pharmacyCharge"
              name="pharmacyCharge"
              type="number"
              min="0"
              step="0.01"
              value={
                formData.pharmacyCharge
              }
              onChange={handleChange}
              placeholder="Enter pharmacy charge"
              required
              style={inputStyle}
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            style={buttonStyle}
          >
            Generate Bill
          </button>
        </form>
      </div>

      {/* --------------------------------------------- */}
      {/* All Bills */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            All Bills
          </h2>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search bills..."
            style={{
              width: "300px",
              padding: "12px",
              fontSize: "15px",
            }}
          />
        </div>

        <h2>Bill List</h2>

        {filteredBills.length === 0 ? (
          <p>No bills found.</p>
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
              }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>
                    ID
                  </th>

                  <th style={tableHeaderStyle}>
                    Patient
                  </th>

                  <th style={tableHeaderStyle}>
                    Consultation
                  </th>

                  <th style={tableHeaderStyle}>
                    Lab
                  </th>

                  <th style={tableHeaderStyle}>
                    Pharmacy
                  </th>

                  <th style={tableHeaderStyle}>
                    Total
                  </th>

                  <th style={tableHeaderStyle}>
                    Payment Status
                  </th>

                  <th style={tableHeaderStyle}>
                    Payment Method
                  </th>

                  <th style={tableHeaderStyle}>
                    Payment Date
                  </th>

                  <th style={tableHeaderStyle}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td style={tableCellStyle}>
                      {bill.id}
                    </td>

                    <td style={tableCellStyle}>
                      {getPatientName(
                        bill.patient
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {formatAmount(
                        bill.consultationCharge
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {formatAmount(
                        bill.labCharge
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {formatAmount(
                        bill.pharmacyCharge
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      <strong>
                        {formatAmount(
                          bill.totalAmount
                        )}
                      </strong>
                    </td>

                    <td style={tableCellStyle}>
                      {bill.paymentStatus}
                    </td>

                    <td style={tableCellStyle}>
                      {bill.paymentMethod || "-"}
                    </td>

                    <td style={tableCellStyle}>
                      {bill.paymentDate
                        ? new Date(
                            bill.paymentDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bill.paymentStatus ===
                      "Paid" ? (
                        <span>
                          Payment Completed
                        </span>
                      ) : paymentBillId ===
                        bill.id ? (
                        <div>
                          <select
                            value={paymentMethod}
                            onChange={(event) =>
                              setPaymentMethod(
                                event.target.value
                              )
                            }
                            style={{
                              padding: "8px",
                              marginRight: "8px",
                            }}
                          >
                            <option value="">
                              Select Method
                            </option>

                            <option value="Cash">
                              Cash
                            </option>

                            <option value="Card">
                              Card
                            </option>

                            <option value="UPI">
                              UPI
                            </option>

                            <option value="Net Banking">
                              Net Banking
                            </option>
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              handleRecordPayment(
                                bill.id
                              )
                            }
                            style={{
                              marginRight: "8px",
                            }}
                          >
                            Pay
                          </button>

                          <button
                            type="button"
                            onClick={
                              handleCancelPayment
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleStartPayment(
                              bill.id
                            )
                          }
                        >
                          Record Payment
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
    </div>
  );
};

// --------------------------------------------------
// Table Styles
// --------------------------------------------------

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

export default Billing;