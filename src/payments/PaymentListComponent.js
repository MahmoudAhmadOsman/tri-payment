import data from "../data/data.json";
import { Link } from "react-router-dom";

const PaymentListComponent = () => {
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
												to="#"
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
		</section>
	);
};

export default PaymentListComponent;
