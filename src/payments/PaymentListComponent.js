import { useState } from "react";
import data from "../data/data.json";
import { Link } from "react-router-dom";

const PaymentListComponent = () => {
	// Initialize state for selectedWeek
	const [selectedWeek, setSelectedWeek] = useState("");
	const currentYear = new Date().getFullYear();

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

	// Event handler for select change
	const handleChange = (event) => {
		setSelectedWeek(event.target.value);
	};
	return (
		<section className="payment text-muted">
			<div className="container">
				<h3 className="mt-3">Weekly Payment Options</h3> <hr />
				{/* Start of row 1 */}
				<div className="row">
					<div className="col-sm-2 mb-3">
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
										<th>Paid Date</th>
										<th>Payee</th>
										<th>Pending</th>
										<th>Completed</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{data.payments.map((payment, id) => (
										<tr key={payment.id}>
											<td>
												$
												{payment.amount.toLocaleString("en-US", {
													minimumFractionDigits: 2,
												})}
											</td>
											<td>{payment.type}</td>
											<td>{payment.paidDate}</td>
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
													to={`${payment.id}`}
													className="btn btn-outline-success btn-sm text-uppercase me-2"
													title={`Update ${payment.payee} record!`}
												>
													<i className="fa fa-pencil"></i>
												</Link>
												<Link
													to={`${payment.id}`}
													className="btn btn-outline-danger btn-sm text-uppercase"
													title={`Delete ${payment.payee} record!`}
												>
													<i className="fa fa-trash-o"></i>
												</Link>
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
