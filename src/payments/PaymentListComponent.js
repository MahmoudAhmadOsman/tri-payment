import React, { useState } from "react";
import data from "../data/data.json";
import { Link } from "react-router-dom";

const PaymentListComponent = () => {
	// Initialize state for selectedWeek
	const [selectedWeek, setSelectedWeek] = useState("");
	const currentYear = new Date().getFullYear();

	//Format paidDate Date
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// Initialize an array to store week options
	const weekOptions = [];

	// Generate week options dynamically for 52 weeks
	for (let week = 1; week <= 52; week++) {
		const startDate = new Date(currentYear, 0, 1 + (week - 1) * 7);
		const endDate = new Date(currentYear, 0, 1 + week * 7 - 1);

		weekOptions.push({
			weekNumber: week,
			startDate: startDate.toISOString().split("T")[0],
			endDate: endDate.toISOString().split("T")[0],
		});
	}

	//Past date - paidDate
	const ensureDateInPast = (dateString) => {
		const currentDate = new Date();
		const paidDate = new Date(dateString);

		// Check if the paidDate is in the future
		if (paidDate > currentDate) {
			// Set paidDate to the current date if it's in the future
			return currentDate.toISOString().split("T")[0];
		}

		return dateString;
	};

	// Event handler for select change
	const handleChange = (event) => {
		setSelectedWeek(event.target.value);
	};

	const getPaymentTypeIcon = (paymentType) => {
		// Map payment types to Font Awesome 4.7 icons
		const iconMappings = {
			"Credit Card": "fa-credit-card",
			PayPal: "fa-paypal",
			"Bank Transfer": "fa-university",
			Cash: "fa-money",
			// Add more mappings as needed
		};

		// Check if the payment type exists in the mappings, default to "fa-question" if not found
		return iconMappings[paymentType] || "fa-money";
	};

	return (
		<section className="payment text-muted">
			<div className="container">
				<h3 className="mt-3">Weekly Payment Options</h3> <hr />
				{/* Start of row 1 */}
				<div className="row">
					<div className="col-sm-4 mb-3">
						<div className="form-group">
							<label htmlFor="weekSelect">Select a Week</label>
							<select
								className="form-select"
								id="weekSelect"
								onChange={handleChange}
								value={selectedWeek}
							>
								<option value="">Select a week</option>
								{weekOptions.map((weekOption) => (
									<option
										key={weekOption.weekNumber}
										value={weekOption.weekNumber}
									>
										Week {weekOption.weekNumber} ({weekOption.startDate} -{" "}
										{weekOption.endDate})
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				{/* End of row 1 */}
				<div className="row">
					<div className="col-sm-12">
						<div className="table-responsive">
							<table className="table table-striped table-hover">
								<thead>
									<tr>
										<th>Amount</th>
										<th>Type</th>
										<th>Due Date</th>
										<th>Paid Date</th>
										<th>Payee</th>
										<th>Pending</th>
										<th>Completed</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{data.payments.map((payment, id) => (
										<tr
											key={payment.id}
											// className={
											// 	payment.paidDate < payment.dueDate
											// 		? "table-success"
											// 		: "table-danger"
											// }
										>
											<td>
												$
												{payment.amount.toLocaleString("en-US", {
													minimumFractionDigits: 2,
												})}
											</td>
											<td>
												<i
													className={`fa ${getPaymentTypeIcon(payment.type)}`}
												></i>{" "}
												{payment.type}
											</td>
											<td>{formatDate(payment.dueDate)}</td>
											<td
												className={
													payment.paidDate <= payment.dueDate
														? "text-primary fw-bold"
														: "text-dark"
												}
											>
												{formatDate(ensureDateInPast(payment.paidDate))}
												{payment.dueDate >= payment.paidDate ? (
													<p className="text-muted" style={{ fontSize: "9px" }}>
														{" "}
														Thanks for payment
													</p>
												) : (
													""
												)}
											</td>
											<td>{payment.payee}</td>
											<td>{payment.pending ? "Yes" : "No"}</td>
											<td>
												{payment.completed ? (
													<span>
														<i className="fa fa-check-square-o text-success"></i>
													</span>
												) : (
													<span>
														<i className="fa fa-times text-danger"></i>
													</span>
												)}
											</td>

											<td>
												<Link
													to={`/payment/${payment.id}`}
													className="btn btn-outline-success btn-sm text-uppercase me-2"
													title={`Update ${payment.payee} record!`}
												>
													<i className="fa fa-pencil"></i>
												</Link>
												<button
													className="btn btn-outline-danger btn-sm text-uppercase"
													title={`Delete ${payment.payee} record!`}
												>
													<i className="fa fa-trash-o"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PaymentListComponent;
