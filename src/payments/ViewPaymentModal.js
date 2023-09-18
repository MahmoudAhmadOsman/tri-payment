import React from "react";

const ViewPaymentModal = ({
	selectedPayment,
	getPaymentTypeIcon,
	Capitalize,
	formatDate,
}) => {
	return (
		<div
			className="modal fade"
			id="paymentModalPopUp"
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
							<>
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
													{selectedPayment.amount.toLocaleString("en-US", {
														minimumFractionDigits: 2,
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
												<td>{selectedPayment.pending ? "YES" : "NO"}</td>
												<td>{selectedPayment.completed ? "YES " : "NO"}</td>

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
							</>
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
