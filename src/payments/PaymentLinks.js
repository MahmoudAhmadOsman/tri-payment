import React from "react";
import { Link } from "react-router-dom";
import "./PaymentStyle.css";

const PaymentLinks = () => {
	return (
		<div className="payment-links">
			<div className="container mt-4">
				<h1 className="text-primary">Payment Options</h1>
				<hr />
				<p className="lead">Please select the option you'd like to perform.</p>
				<div className="row">
					<div className="col">
						<div className="add-payment">
							<Link
								to="/payments/add-new-payment"
								class="btn btn-outline-success btn-lg fw-bold d-block border-2"
							>
								Add New Payment
							</Link>
						</div>
						<div className="small-desc">
							<p className="text-muted">
								Choose this option to create a new payment record.
							</p>
						</div>
					</div>
					<div className="col">
						<div className="payment-list">
							<Link
								to="/payments"
								class="btn btn-outline-primary btn-lg fw-bold d-block border-2"
							>
								Payment List
							</Link>
						</div>
						<div className="small-desc">
							<p className="text-muted">
								Choose this option to view a list of payment records.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentLinks;
