import { useEffect, useState } from "react";
import api from "../../services/api";

const REPORTS_URL = "/reports";

const Reports = () => {
  const [revenueReport, setRevenueReport] =
    useState(null);

  const [departmentReport, setDepartmentReport] =
    useState([]);

  const [appointmentReport, setAppointmentReport] =
    useState(null);

  const [medicineReport, setMedicineReport] =
    useState(null);

  const [billingReport, setBillingReport] =
    useState(null);

  const [chartReport, setChartReport] =
    useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadReports = async () => {
      try {
        setError("");

        const [
          revenueResponse,
          departmentResponse,
          appointmentResponse,
          medicineResponse,
          billingResponse,
          chartResponse,
        ] = await Promise.all([
          api.get(`${REPORTS_URL}/revenue`),
          api.get(`${REPORTS_URL}/departments`),
          api.get(`${REPORTS_URL}/appointments`),
          api.get(`${REPORTS_URL}/medicines`),
          api.get(`${REPORTS_URL}/billings`),
          api.get(`${REPORTS_URL}/charts`),
        ]);

        if (cancelled) {
          return;
        }

        setRevenueReport(
          revenueResponse.data?.data || null
        );

        setDepartmentReport(
          departmentResponse.data?.data || []
        );

        setAppointmentReport(
          appointmentResponse.data?.data || null
        );

        setMedicineReport(
          medicineResponse.data?.data || null
        );

        setBillingReport(
          billingResponse.data?.data || null
        );

        setChartReport(
          chartResponse.data?.data || null
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Reports data error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load reports."
        );
      }
    };

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  

  const formatAmount = (amount) => {
    const value = Number(amount || 0);

    return `₹${value.toFixed(2)}`;
  };

  

  const pageStyle = {
    padding: "30px 20px",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "30px",
    marginBottom: "28px",
  };

  const summaryGridStyle = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const summaryBoxStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fafafa",
  };

  const summaryTitleStyle = {
    margin: "0 0 10px",
    fontSize: "15px",
    fontWeight: "bold",
  };

  const summaryValueStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

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

  return (
    <div style={pageStyle}>
      <h1>Reports</h1>

      <p>
        View hospital revenue, departments,
        appointments, medicines, billing and
        dashboard reports from this page.
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
      {/* Revenue Report */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Revenue Report</h2>

        {revenueReport ? (
          <div style={summaryGridStyle}>
            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Total Revenue
              </p>

              <p style={summaryValueStyle}>
                {formatAmount(
                  revenueReport.totalRevenue
                )}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Total Paid Bills
              </p>

              <p style={summaryValueStyle}>
                {revenueReport.totalPaidBills}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Pending Bills
              </p>

              <p style={summaryValueStyle}>
                {revenueReport.pendingBills}
              </p>
            </div>
          </div>
        ) : (
          <p>No revenue report available.</p>
        )}
      </div>

      {/* --------------------------------------------- */}
      {/* Appointment Report */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Appointment Report</h2>

        {appointmentReport ? (
          <div style={summaryGridStyle}>
            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Total Appointments
              </p>

              <p style={summaryValueStyle}>
                {
                  appointmentReport.totalAppointments
                }
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Upcoming
              </p>

              <p style={summaryValueStyle}>
                {appointmentReport.upcoming}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Completed
              </p>

              <p style={summaryValueStyle}>
                {appointmentReport.completed}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Cancelled
              </p>

              <p style={summaryValueStyle}>
                {appointmentReport.cancelled}
              </p>
            </div>
          </div>
        ) : (
          <p>
            No appointment report available.
          </p>
        )}
      </div>

      {/* --------------------------------------------- */}
      {/* Billing Report */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Billing Report</h2>

        {billingReport ? (
          <div style={summaryGridStyle}>
            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Total Bills
              </p>

              <p style={summaryValueStyle}>
                {billingReport.totalBills}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Paid Bills
              </p>

              <p style={summaryValueStyle}>
                {billingReport.paidBills}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Pending Bills
              </p>

              <p style={summaryValueStyle}>
                {billingReport.pendingBills}
              </p>
            </div>

            <div style={summaryBoxStyle}>
              <p style={summaryTitleStyle}>
                Total Revenue
              </p>

              <p style={summaryValueStyle}>
                {formatAmount(
                  billingReport.totalRevenue
                )}
              </p>
            </div>
          </div>
        ) : (
          <p>
            No billing report available.
          </p>
        )}
      </div>

      {/* --------------------------------------------- */}
      {/* Medicine Report */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Medicine Report</h2>

        {medicineReport ? (
          <>
            <div style={summaryGridStyle}>
              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Total Medicines
                </p>

                <p style={summaryValueStyle}>
                  {medicineReport.totalMedicines}
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Available Medicines
                </p>

                <p style={summaryValueStyle}>
                  {
                    medicineReport.availableMedicines
                  }
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Out of Stock
                </p>

                <p style={summaryValueStyle}>
                  {medicineReport.outOfStock}
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Low Stock Count
                </p>

                <p style={summaryValueStyle}>
                  {medicineReport.lowStockCount}
                </p>
              </div>
            </div>

            <h3
              style={{
                marginTop: "30px",
              }}
            >
              Low Stock Medicines
            </h3>

            {medicineReport.lowStockMedicines
              ?.length > 0 ? (
              <div
                style={tableContainerStyle}
              >
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th
                        style={tableHeaderStyle}
                      >
                        ID
                      </th>

                      <th
                        style={tableHeaderStyle}
                      >
                        Medicine
                      </th>

                      <th
                        style={tableHeaderStyle}
                      >
                        Stock Quantity
                      </th>

                      <th
                        style={tableHeaderStyle}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {medicineReport.lowStockMedicines.map(
                      (medicine) => (
                        <tr
                          key={medicine.id}
                        >
                          <td
                            style={
                              tableCellStyle
                            }
                          >
                            {medicine.id}
                          </td>

                          <td
                            style={
                              tableCellStyle
                            }
                          >
                            {
                              medicine.medicineName
                            }
                          </td>

                          <td
                            style={
                              tableCellStyle
                            }
                          >
                            {
                              medicine.stockQuantity
                            }
                          </td>

                          <td
                            style={
                              tableCellStyle
                            }
                          >
                            {medicine.status}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>
                No low stock medicines found.
              </p>
            )}
          </>
        ) : (
          <p>
            No medicine report available.
          </p>
        )}
      </div>

      {/* --------------------------------------------- */}
      {/* Department Report */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Department Report</h2>

        {departmentReport.length === 0 ? (
          <p>
            No department report available.
          </p>
        ) : (
          <div
            style={tableContainerStyle}
          >
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>
                    Department ID
                  </th>

                  <th style={tableHeaderStyle}>
                    Department
                  </th>

                  <th style={tableHeaderStyle}>
                    Total Doctors
                  </th>

                  <th style={tableHeaderStyle}>
                    Doctors
                  </th>
                </tr>
              </thead>

              <tbody>
                {departmentReport.map(
                  (department) => (
                    <tr
                      key={department.departmentId}
                    >
                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {
                          department.departmentId
                        }
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {
                          department.departmentName
                        }
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {
                          department.totalDoctors
                        }
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {department.doctors
                          ?.length > 0 ? (
                          <div>
                            {department.doctors.map(
                              (doctor) => (
                                <div
                                  key={
                                    doctor.id
                                  }
                                  style={{
                                    marginBottom:
                                      "6px",
                                  }}
                                >
                                  <strong>
                                    {
                                      doctor.doctorName
                                    }
                                  </strong>

                                  {" - "}

                                  {
                                    doctor.specialization
                                  }
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          "No doctors"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --------------------------------------------- */}
      {/* Dashboard Charts Data */}
      {/* --------------------------------------------- */}

      <div style={cardStyle}>
        <h2>Dashboard Chart Summary</h2>

        {chartReport ? (
          <>
            <h3>
              Appointment Status
            </h3>

            <div style={summaryGridStyle}>
              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Upcoming
                </p>

                <p style={summaryValueStyle}>
                  {
                    chartReport
                      .appointmentChart
                      ?.upcoming
                  }
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Completed
                </p>

                <p style={summaryValueStyle}>
                  {
                    chartReport
                      .appointmentChart
                      ?.completed
                  }
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Cancelled
                </p>

                <p style={summaryValueStyle}>
                  {
                    chartReport
                      .appointmentChart
                      ?.cancelled
                  }
                </p>
              </div>
            </div>

            <h3
              style={{
                marginTop: "30px",
              }}
            >
              Billing Status
            </h3>

            <div style={summaryGridStyle}>
              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Paid
                </p>

                <p style={summaryValueStyle}>
                  {
                    chartReport
                      .billingChart
                      ?.paid
                  }
                </p>
              </div>

              <div style={summaryBoxStyle}>
                <p style={summaryTitleStyle}>
                  Pending
                </p>

                <p style={summaryValueStyle}>
                  {
                    chartReport
                      .billingChart
                      ?.pending
                  }
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>
            No dashboard chart data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reports;