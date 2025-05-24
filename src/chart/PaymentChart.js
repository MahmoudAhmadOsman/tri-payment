// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
// Chart.register(ArcElement, Tooltip, Legend, Title);
// Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
// Chart.defaults.plugins.legend.position = "right";
// Chart.defaults.plugins.legend.title.display = true;
// Chart.defaults.plugins.legend.title.text = "60 of 100 Done";
// Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

// function PaymentChart() {
// 	const [data, setData] = useState({});

// 	const fetchData = async () => {
// 		try {
// 			const response = await fetch("https://stapes-api.onrender.com/payments");
// 			const paymentData = await response.json();

// 			if (Array.isArray(paymentData)) {
// 				// Extract data for the fields you want to display in the Pie chart
// 				const pieData = paymentData.map((item) => ({
// 					invoice: item.invoice,
// 					amount: item.amount,
// 					type: item.type,
// 					payer: item.payer,
// 					payee: item.payee,
// 					dueDate: item.dueDate,
// 					paidDate: item.paidDate,
// 					pending: item.pending,
// 					completed: item.completed,
// 				}));

// 				// Calculate sums for 'pending' and 'completed'
// 				const pendingSum = pieData.reduce(
// 					(total, item) => total + (item.pending ? item.amount : 0),
// 					0
// 				);
// 				const completedSum = pieData.reduce(
// 					(total, item) => total + (item.completed ? item.amount : 0),
// 					0
// 				);

// 				// Create the Pie chart data
// 				const chartData = {
// 					data: [60, 40],
// 					labels: [
// 						"amount",
// 						"type",
// 						"payer",
// 						"payee",
// 						"dueDate",
// 						"paidDate",
// 						"Pending",
// 						"Completed",
// 					],
// 					datasets: [
// 						{
// 							data: [pendingSum, completedSum],
// 							backgroundColor: [
// 								"rgba(255, 99, 132, 0.6)",
// 								"rgba(54, 162, 235, 0.6)",
// 							],
// 							options: {
// 								title: {
// 									display: true,
// 									text: "Payment Chart",
// 								},
// 								aspectRatio: 2.5,
// 							},
// 						},
// 					],
// 				};

// 				setData(chartData);
// 			} else {
// 				console.error("Data from API is not an array:", paymentData);
// 			}
// 		} catch (error) {
// 			console.error(error.message);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	return (
// 		<div className="container mt-4">
// 			<h1 className="text-danger">Payments Chart</h1> <hr />
// 			<div className="row">
// 				<div className="col-md-12 d-flex">
// 					{Object.keys(data).length > 0 ? (
// 						<Pie
// 							options={{ responsive: true, maintainAspectRatio: false }}
// 							data={data}
// 						/>
// 					) : (
// 						<p>Loading...</p>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default PaymentChart;


import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "right";
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

function PaymentChart() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://stapes-api.onrender.com/payments");
      const paymentData = await response.json();

      if (Array.isArray(paymentData)) {
        const pendingSum = paymentData.reduce(
          (total, item) => total + (item.pending ? item.amount : 0),
          0
        );
        const completedSum = paymentData.reduce(
          (total, item) => total + (item.completed ? item.amount : 0),
          0
        );

        const totalPayments = pendingSum + completedSum;
        const completionPercentage = Math.round(
          (completedSum / totalPayments) * 100
        );

        const chartData = {
          labels: ["Pending Payments", "Completed Payments"],
          datasets: [
            {
              data: [pendingSum, completedSum],
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        };

        Chart.defaults.plugins.legend.title.text = `${completionPercentage}% Completed (${completedSum.toLocaleString()}/${totalPayments.toLocaleString()})`;
        setData(chartData);
      } else {
        console.error("Data from API is not an array:", paymentData);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-0">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0 text-primary">
              <i className="fa fa-money me-2" aria-hidden="true"></i>
              Payment Analytics
            </h2>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleRefresh}
              disabled={loading}
            >
              <i
                className={`fa fa-refresh me-1 ${
                  loading || refresh ? "fa-spin" : ""
                }`}
                aria-hidden="true"
              ></i>
              Refresh
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 mb-0">Loading payment data...</p>
                </div>
              ) : Object.keys(data).length > 0 ? (
                <div
                  className="chart-container"
                  style={{ position: "relative", height: "300px" }}
                >
                  <Pie
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: {
                            boxWidth: 12,
                            padding: 20,
                            font: {
                              size: 14,
                            },
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const label = context.label || "";
                              const value = context.raw || 0;
                              const total = context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                              );
                              const percentage = Math.round(
                                (value / total) * 100
                              );
                              return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="alert alert-warning">
                  No payment data available. Please try again later.
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <div className="text-danger mb-3">
                        <i
                          className="fa fa-clock-o fa-2x"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <h3 className="h5">Pending Payments</h3>
                      {loading ? (
                        <div className="placeholder-glow">
                          <span className="placeholder col-4"></span>
                        </div>
                      ) : (
                        <p className="h4 text-danger">
                          $
                          {data.datasets?.[0]?.data?.[0]?.toLocaleString() ||
                            "0"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <div className="text-success mb-3">
                        <i
                          className="fa fa-check-circle fa-2x"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <h3 className="h5">Completed Payments</h3>
                      {loading ? (
                        <div className="placeholder-glow">
                          <span className="placeholder col-4"></span>
                        </div>
                      ) : (
                        <p className="h4 text-success">
                          $
                          {data.datasets?.[0]?.data?.[1]?.toLocaleString() ||
                            "0"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h4 className="h6 mb-3">Payment Summary</h4>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2 d-flex justify-content-between">
                          <span>Total Payments:</span>
                          <strong>
                            {loading ? (
                              <span className="placeholder col-3"></span>
                            ) : (
                              `$${
                                (
                                  data.datasets?.[0]?.data?.[0] +
                                  data.datasets?.[0]?.data?.[1]
                                )?.toLocaleString() || "0"
                              }`
                            )}
                          </strong>
                        </li>
                        <li className="mb-2 d-flex justify-content-between">
                          <span>Completion Rate:</span>
                          <strong>
                            {loading ? (
                              <span className="placeholder col-2"></span>
                            ) : (
                              `${
                                Math.round(
                                  (data.datasets?.[0]?.data?.[1] /
                                    (data.datasets?.[0]?.data?.[0] +
                                      data.datasets?.[0]?.data?.[1])) *
                                    100
                                ) || "0"
                              }%`
                            )}
                          </strong>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>Last Updated:</span>
                          <strong>{new Date().toLocaleString()}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentChart;