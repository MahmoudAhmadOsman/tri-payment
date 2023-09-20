import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "right";
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = "60 of 100 Done";
Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

function PaymentChart() {
	const [data, setData] = useState({});

	const fetchData = async () => {
		try {
			const response = await fetch("https://stapes-api.onrender.com/payments");
			const paymentData = await response.json();

			if (Array.isArray(paymentData)) {
				// Extract data for the fields you want to display in the Pie chart
				const pieData = paymentData.map((item) => ({
					invoice: item.invoice,
					amount: item.amount,
					type: item.type,
					payer: item.payer,
					payee: item.payee,
					dueDate: item.dueDate,
					paidDate: item.paidDate,
					pending: item.pending,
					completed: item.completed,
				}));

				// Calculate sums for 'pending' and 'completed'
				const pendingSum = pieData.reduce(
					(total, item) => total + (item.pending ? item.amount : 0),
					0
				);
				const completedSum = pieData.reduce(
					(total, item) => total + (item.completed ? item.amount : 0),
					0
				);

				// Create the Pie chart data
				const chartData = {
					data: [60, 40],
					labels: [
						"amount",
						"type",
						"payer",
						"payee",
						"dueDate",
						"paidDate",
						"Pending",
						"Completed",
					],
					datasets: [
						{
							data: [pendingSum, completedSum],
							backgroundColor: [
								"rgba(255, 99, 132, 0.6)",
								"rgba(54, 162, 235, 0.6)",
							],
							options: {
								title: {
									display: true,
									text: "Payment Chart",
								},
								aspectRatio: 2.5,
							},
						},
					],
				};

				setData(chartData);
			} else {
				console.error("Data from API is not an array:", paymentData);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container mt-4">
			<h1 className="text-danger">Payments Chart</h1> <hr />
			<div className="row">
				<div className="col-md-12 d-flex">
					{Object.keys(data).length > 0 ? (
						<Pie
							options={{ responsive: true, maintainAspectRatio: false }}
							data={data}
						/>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default PaymentChart;
