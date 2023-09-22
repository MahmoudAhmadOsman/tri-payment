import React from "react";
import { Link } from "react-router-dom";
import "./PaymentStyle.css";

const PaymentLinks = () => {
	return (
		<div className="payment-links">
			<div className="container mt-4">
				<h1 className="text-primary">Payment Options</h1>
				<hr />
				<p className="lead">Please choose the opton you want to perform.</p>
				<div className="row">
					<div className="col">
						<div className="add-payment">
							<Link
								to="/add-new-payment"
								class="btn btn-outline-success btn-lg fw-bold d-block border-2"
							>
								Add New Payment
							</Link>
						</div>
						<div className="small-desc">
							<p className="text-muted">
								Select this option if you want to create new payment record.
							</p>
						</div>
					</div>
					<div className="col">
						<div className="payment-list">
							<Link
								to="/payments"
								class="btn btn-outline-primary btn-lg fw-bold d-block border-2"
							>
								Add New Payment
							</Link>
						</div>
						<div className="small-desc">
							<p className="text-muted">
								Select this option if you want to see list of payment records.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentLinks;
