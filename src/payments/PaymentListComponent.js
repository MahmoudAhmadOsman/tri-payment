import React, { useEffect, useState } from "react";
// import data from "../data/data.json";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import PaymentService from "../service/PaymentService";
import ViewPaymentModal from "./ViewPaymentModal";

const PaymentListComponent = () => {
	const navigate = useNavigate();
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [unableToDelete, setUnableToDelete] = useState(false);

	// Initialize state for selectedWeek
	const [selectedWeek, setSelectedWeek] = useState("");
	const currentYear = new Date().getFullYear();

	const userRole = "ADMIN1";
	const guestRole = "GUEST";

	//Format paidDate Date
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// Initialize an array to store week options
	const weekOptions = [];

	// Generate week option - 52 weeks
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

	const Capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	// Event handler for select change
	const handleChange = (event) => {
		setSelectedWeek(event.target.value);
	};

	const getPaymentTypeIcon = (paymentType) => {
		const iconMappings = {
			creditcard: "fa-credit-card",
			paypal: "fa-paypal",
			banktransfer: "fa-university",
			cash: "fa-money",
			googlepay: "fa-google-wallet",
			applepay: "fa-apple",
			bitcoin: "fa-bitcoin",
			visa: "fa-cc-visa",
			mastercard: "fa-cc-mastercard",
			americanexpress: "fa-cc-amex",
		};

		return iconMappings[paymentType] || "fa-question";
	};

	// Function to update selectedPayment when a "View" button is clicked
	const handleViewClick = (payment) => {
		setSelectedPayment(payment);
	};

	const getPayments = async () => {
		await PaymentService.getAllPayments()
			.then((res) => {
				setPayments(res.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(true);
				console.error(error.message);
			});
	};

	const unableToDeletePayment = (e) => {
		e.preventDefault();
		setUnableToDelete(true);
		setTimeout(() => {
			setUnableToDelete(false);
		}, 4000);
	};

	const deletePayment = async (e, id) => {
		e.preventDefault();
		await PaymentService.deletePayment(id)
			.then((res) => {
				getPayments();
				navigate("/payments");
			})
			.catch((error) => {
				// setError(true);
				console.error(error.message);
			});
	};

	useEffect(() => {
		getPayments();
	}, []);

	return (
		<section className="payment">
			{loading ? (
				<Loading />
			) : error ? (
				setError(true)
			) : (
				<React.Fragment>
					<div className="container shadow-lg p-3 mb-5 bg-body rounded">
						{/* Unable to delete payment  message */}
						{unableToDelete ? (
							<div className="alert alert-warning">
								<span>You don't have permission to delete this payment!</span>
							</div>
						) : (
							""
						)}
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
							<div className="col-md-7">
								<h6>See data in chart</h6>
								<Link
									to="/payments/payment-chart"
									className="btn btn-outline-success"
								>
									See data
								</Link>
							</div>
						</div>
						{/* End of row 1 */}
						<div className="row">
							<div className="col-sm-12">
								<div className="table-responsive">
									<table className="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th>Invoice #</th>
												<th>Amount</th>
												{/* <th>Method Type</th> */}
												<th>Payer</th>
												<th>Payee</th>
												<th>Due Date</th>
												<th>Paid Date</th>

												{/* <th>Pending</th>
												<th>Completed</th> */}
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{payments.map((payment, id) => (
												<tr
													key={payment.id}
													// className={
													// 	payment.paidDate < payment.dueDate
													// 		? "table-success"
													// 		: "table-danger"
													// }
												>
													<td>{payment.invoice}</td>
													<td>
														$
														{/* {payment.amount.toLocaleString("en-US", {
															minimumFractionDigits: 2,
														})} */}
														{new Intl.NumberFormat()
															.format(payment.amount)
															.toLocaleString("en-US", {
																style: "currency",
																currency: "USD",
																minimumFractionDigits: 2,
																maximumFractionDigits: 2,
															})}
													</td>
													{/* <td>
														<i
															className={`fa ${getPaymentTypeIcon(
																payment.type
															)}`}
														></i>
														{Capitalize(payment.type)}
													</td> */}
													<td>{payment.payer}</td>
													<td>{payment.payee}</td>
													<td>{formatDate(payment.dueDate)}</td>
													<td
													// className={
													// 	payment.paidDate >= payment.dueDate
													// 		? "text-success"
													// 		: "text-darks"
													// }
													>
														{formatDate(ensureDateInPast(payment.paidDate))}
														{
															payment.paidDate &&
															payment.dueDate &&
															!payment.pending &&
															payment.completed &&
															payment.paidDate <= payment.dueDate ? (
																<p
																	className="text-success"
																	style={{ fontSize: "9px" }}
																>
																	{" "}
																	Thanks for payment
																</p>
															) : (
																""
															)
															// payment.paidDate && // Ensure there's a paidDate
															// 	!payment.pending && // Ensure the payment is not pending
															// 	payment.completed && // Ensure the payment is completed
															// 	payment.paidDate <= payment.dueDate && ( // Check if paidDate is before dueDate
															// 		<p
															// 			className="text-success"
															// 			style={{ fontSize: "9px" }}
															// 		>
															// 			Thanks for payment
															// 		</p>
															// 	)
														}
													</td>

													{/* <td>{payment.pending ? "Yes" : "No"}</td> */}
													{/* <td>
														{payment.completed ? (
															<span>
																<i className="fa fa-check-square-o text-success"></i>
															</span>
														) : (
															<span>
																<i className="fa fa-times text-danger"></i>
															</span>
														)}
													</td> */}

													<td className="d-flex justify-content-between">
														{/* <Link
															to={`/payments/view-payment/${payment.id}`}
															className="btn btn-outline-success btn-sm "
															title={`View ${payment.payee} record!`}
														>
															<i className="fa fa-eye"></i>
														</Link> */}
														{/* <Link
															to={`${payment.invoice}`}
															className="btn btn-outline-success btn-sm"
															data-bs-toggle="modal"
															data-bs-target="#exampleModal"
														>
															 
															View
														</Link> */}

														<button
															className="btn btn-outline-warning btn-sm"
															data-bs-toggle="modal"
															data-bs-target="#exampleModal"
															title={`View ${payment.payee} record!`}
															onClick={() => handleViewClick(payment)}
														>
															<i className="fa fa-eye"></i>
														</button>

														<Link
															to={`/payments/view-payment/${payment.id}`}
															className="btn btn-outline-success btn-sm"
															title={`Update ${payment.payee} record!`}
														>
															<i className="fa fa-pencil"></i>
														</Link>
														{userRole === "ADMIN" ? (
															<button
																className="btn btn-outline-danger btn-sm"
																title={`Delete ${payment.payee} record!`}
																onClick={(e) => deletePayment(e, payment.id)}
															>
																<i className="fa fa-trash-o"></i>
															</button>
														) : (
															<button
																className="btn btn-outline-danger btn-sm disableds"
																title={`Your role is: ${guestRole}. You are not allowed to delete a payment record!`}
																onClick={(e) =>
																	unableToDeletePayment(e, payment.id)
																}
															>
																<i className="fa fa-trash-o"></i>
															</button>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
			{/* Modal for view payment component */}
			<ViewPaymentModal
				selectedPayment={selectedPayment}
				getPaymentTypeIcon={getPaymentTypeIcon}
				formatDate={formatDate}
				Capitalize={Capitalize}
			/>
		</section>
	);
};

export default PaymentListComponent;
