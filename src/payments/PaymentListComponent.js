import React from "react";
import data from "../data/data.json";

const PaymentListComponent = () => {
	console.log(data);

	return (
		<section className="payment">
			<div className="container">
				<div className="row">
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
								</tr>
							</thead>
							<tbody>
								{data.payments.map((payment, index) => (
									<tr key={index}>
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
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PaymentListComponent;
