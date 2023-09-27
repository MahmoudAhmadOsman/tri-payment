import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewPaymentModal = ({
	selectedPayment,
	getPaymentTypeIcon,
	Capitalize,
	formatDate,
}) => {
	const history = useNavigate();

	const handleEditClick = () => {
		history(`/payments/view-payment/${selectedPayment.id}`);
		window.location.reload();
	};

	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex={-1}
			aria-labelledby="paymentModalPopUp"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title text-dark fs-5" id="paymentModalPopUp">
							Quick Payment Panel
						</h1>
					</div>
					<div className="modal-body">
						{selectedPayment ? (
							<React.Fragment>
								<div className="table-responsive" style={{ fontSize: "12px" }}>
									<table className="table table-striped table-bordered">
										<thead>
											<tr>
												<th>Invoice #</th>
												<th>Amount</th>
												<th>Payment Method Type</th>
												<th>Paid Date</th>
												<th>Pending</th>
												<th>Completed</th>
											</tr>
										</thead>

										<tbody>
											<tr>
												<td>{selectedPayment.invoice}</td>
												<td>
													{/* $ */}
													{parseFloat(selectedPayment.amount)
														// .toFixed(2)
														.toLocaleString("en-US", {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
															style: "currency",
															currency: "USD",
														})}
												</td>

												<i
													className={`fa fa-3x  ${getPaymentTypeIcon(
														selectedPayment.type
													)}`}
													style={{ width: "100%" }}
												></i>

												<td>
													{selectedPayment.paidDate ? (
														<span>{selectedPayment.paidDate}</span>
													) : (
														"NOT PAID"
													)}
												</td>

												<td>
													{selectedPayment.pending === "1" ? "YES" : "NO"}
												</td>

												<td>
													{selectedPayment.completed === "1" ? (
														<span>
															<i className="fa fa-check text-success fa-2x"></i>
														</span>
													) : (
														"NO"
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>{" "}
								<hr />
								<p>
									{selectedPayment.completed === "1" &&
									selectedPayment.pending !== "1" ? (
										<>
											<h6 className="text-success">
												Payment is made on: <b>{selectedPayment.paidDate}</b>.
											</h6>
											<small className="text-muted">
												{" "}
												Thank you for submitting your payment.
											</small>
										</>
									) : (
										<span className="text-danger fw-bold">
											Due Date: {formatDate(selectedPayment.dueDate)}
										</span>
									)}
								</p>
							</React.Fragment>
						) : (
							<h6 className="text-danger text-center">No payment selected!</h6>
						)}
					</div>
					<div className="modal-footer">
						<div className="float-start">
							<button
								onClick={handleEditClick}
								className="btn btn-outline-primary btn-sm"
							>
								Edit Payment Record
							</button>
						</div>
						<button
							type="button"
							className="btn btn-outline-danger btn-sm"
							data-bs-dismiss="modal"
							title="Close"
						>
							<i className="fa fa-times"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPaymentModal;
