import React from "react";
import numeral from "numeral";
import accounting from "accounting";

const ViewPaymentModal = ({
	selectedPayment,
	getPaymentTypeIcon,
	Capitalize,
	formatDate,
}) => {
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
							Payment Qick View Panel
						</h1>
					</div>
					<div className="modal-body">
						{selectedPayment ? (
							<React.Fragment>
								<div className="table-responsive" style={{ fontSize: "12px" }}>
									<table className="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th>Invoice #</th>
												<th>Amount</th>
												<th>Method Type</th>
												<th>Pending</th>
												<th>Completed</th>
											</tr>
										</thead>

										<tbody>
											<tr>
												<td>{selectedPayment.invoice}</td>
												<td>
													$
													{/* {selectedPayment.amount.toLocaleString("en-US", {
														minimumFractionDigits: 2,
														style: "currency",
														currency: "USD",
													})} */}
													{/* {new Intl.NumberFormat().format(
														selectedPayment.amount,
														
													)} */}
													{new Intl.NumberFormat()
														.format(selectedPayment.amount)
														.toLocaleString("en-US", {
															style: "currency",
															currency: "USD",
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})}
												</td>
												<i
													className={`fa fa-3x ${getPaymentTypeIcon(
														selectedPayment.type
													)}`}
												></i>

												{/* <td>
													{selectedPayment.pending ? (
														<span>
															<i
																className="fa fa-check text-success fa-2x"
																
															></i>
														</span>
													) : (
														<span>
															<sup>
																<i
																	className="fa fa-times text-danger fa-2x"
																	
																></i>
															</sup>
														</span>
													)}
												</td> */}
												<td>
													{selectedPayment.pending === "1" ? (
														<span>YES</span>
													) : selectedPayment.pending === "0" ? (
														<span>NO</span>
													) : (
														<span>{selectedPayment.pending}</span>
													)}
												</td>
												{/* <td>{selectedPayment.completed ? "YES" : "NO"}</td> */}
												<td>
													{" "}
													{selectedPayment.completed === "1" ? (
														<span>
															<i className="fa fa-check text-success fa-2x"></i>{" "}
														</span>
													) : selectedPayment.completed === "0" ? (
														<span>NO</span>
													) : (
														<span>{selectedPayment.completed}</span>
													)}
												</td>

												{/* <td>
													{selectedPayment.completed ? (
														<span>
															<i className="fa fa-check text-success fa-2x"></i>
														</span>
													) : (
														<span>
															<sup>
																<i className="fa fa-times text-danger fa-2x"></i>
															</sup>
														</span>
													)}
												</td> */}
											</tr>
										</tbody>
									</table>
								</div>{" "}
								<hr />
								<p>
									<b>Due Date:</b>{" "}
									<i className="text-danger">
										{formatDate(selectedPayment.dueDate)}
									</i>{" "}
								</p>
							</React.Fragment>
						) : (
							<h6 className="text-danger text-center">No payment selected!</h6>
						)}
					</div>
					<div className="modal-footer">
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
