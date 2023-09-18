import { useState } from "react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaymentService from "../service/PaymentService";

const EditPayment = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	// const [invoice, setInvoice] = useState("");
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("");
	const [payer, setPayer] = useState("");
	const [payee, setPayee] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [paidDate, setPaidDate] = useState("");
	const [pending, setPending] = useState("");
	const [completed, setCompleted] = useState("");

	const Capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const paymentData = {
		amount,
		type,
		payer,
		payee,
		dueDate,
		paidDate,
		pending,
		completed,
	};

	//Write update function here
	const updatePayment = (e) => {
		e.preventDefault();
		// PaymentService.updatePayment(id, paymentData).then(() => {
		// 	navigate("/payments");
		// });
	};

	useEffect(() => {
		if (id) {
			PaymentService.getPaymentById(id).then((res) => {
				setAmount(res.data.amount);
				setType(res.data.type);
				setPayer(res.data.payer);
				setPayee(res.data.payee);

				setDueDate(res.data.dueDate);

				setPaidDate(res.data.paidDate);

				setPending(res.data.pending);

				setCompleted(res.data.completed);
			});
		}
	}, []);
	return (
		<div className="container">
			<h2 className="text-muted mt-2">Edit Payment</h2> <hr />
			<form action="">
				<div className="row">
					<div className="col-md-4">
						<div className="input-group mb-3">
							<span htmlFor="amount" className="input-group-text">
								Amount
							</span>
							<input
								type="text"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								id="amount"
								name="amount"
								className="form-control form-control-lg"
								placeholder="Enter amount $"
							/>
						</div>

						<div className="input-group mb-3">
							<span htmlFor="payer" className="input-group-text">
								Payer
							</span>

							<input
								type="text"
								value={payer}
								onChange={(e) => setPayer(e.target.value)}
								id="payer"
								name="payer"
								className="form-control form-control-lg"
								placeholder="Enter payer name"
							/>
						</div>

						<div className="input-group mb-3">
							<span htmlFor="payee" className="input-group-text">
								Payee
							</span>
							<input
								type="text"
								value={payee}
								onChange={(e) => setPayee(e.target.value)}
								className="form-control form-control-lg"
								placeholder="Enter payee name"
							/>
						</div>
					</div>
					<div className="col-md-4">
						<h5>Payment Status</h5>
						<label htmlFor="pending">
							Pendig?: &nbsp; {pending ? "YES" : "NO"}
						</label>

						<select
							name="pending"
							value={pending}
							onChange={(e) => setPending(e.target.value)}
							className="form-select form-select-lg"
						>
							<option value="" disabled defaultValue>
								Select one
							</option>

							<option value="1">YES</option>
							<option value="0">NO</option>
							{/* <option value="0">{pending === 0 ? "NO" : "YES"}</option>
							<option value="1">{pending === 1 ? "YES" : "NO"}</option> */}
						</select>
						{/* Completed  */}

						<label htmlFor="pending">
							Completed?: &nbsp; {completed ? "YES" : "NO"}
						</label>
						<select
							name="completed"
							value={completed}
							onChange={(e) => setCompleted(e.target.value)}
							className="form-select form-select-lg"
						>
							<option value="" disabled defaultValue>
								Select one
							</option>

							<option value="0">NO</option>
							<option value="1">YES</option>
							{/* <option value="0">{completed === 0 ? "NO" : "YES"}</option>
							<option value="1">{completed === 1 ? "YES" : "NO"}</option> */}
						</select>
						<small className="text-primary" style={{ fontSize: "11px" }}>
							<b>Note: </b>
							Change payment status by updaing the status either pending or
							completed.
						</small>
					</div>

					{/* Payment Method Type   */}
					<div className="col-md-4">
						<label htmlFor="type">Payment Method Type</label>
						<select
							name="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
							className="form-select form-select-lg mb-4"
						>
							<option value="" disabled defaultValue>
								Select one
							</option>

							<option value={type}>{Capitalize(type)}</option>
							<option value="Americanexpress">Americanexpress</option>
							<option value="Mastercard">Mastercard</option>
							<option value="Paypal">Paypal</option>
							<option value="Cash">Cash</option>
							<option value="Apple Pay">Apple Pay</option>
							<option value="Bitcoin">Bitcoin</option>
							<option value="Other">Other</option>
						</select>
						{/* Paid Date  */}
						<label htmlFor="paidDate">Paid Date</label>
						<input
							type="date"
							className="form-control form-control-lg"
							value={paidDate}
							onChange={(e) => setPaidDate(e.target.value)}
							id="paidDate"
							name="paidDate"
							placeholder="Enter paid date"
						/>
					</div>
				</div>

				<div className="float-end mt-4">
					<button
						onClick={(e) => {
							updatePayment(e);
						}}
						type="submit"
						className="btn btn-outline-success btn-lg fw-bold mt-3"
					>
						UPDATE
					</button>
					<Link
						to="/"
						className="btn btn-outline-warning btn-lg mt-3 ms-3 fw-bold me-1"
					>
						CANCEL
					</Link>
				</div>
			</form>
		</div>
	);
};

export default EditPayment;
