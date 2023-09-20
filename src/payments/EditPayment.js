import { useState } from "react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaymentService from "../service/PaymentService";
import Loading from "../utils/Loading";

const EditPayment = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	// const [workingOnMessage, setWorkingOnMessage] = useState(false);

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
		if (
			amount === "" ||
			type === "" ||
			payer === "" ||
			dueDate === "" ||
			paidDate === "" ||
			pending === "" ||
			completed === ""
		) {
			// setError(true);
			alert("Please fill all the fields");
			return;
		}
		console.log(paymentData);

		// PaymentService.updatePayment(id, paymentData).then(() => {
		// 	navigate("/payments");
		// });

		if (id) {
			PaymentService.patchPayment(id, paymentData)
				.then(() => {
					navigate("/payments");
				})
				.catch((error) => {
					console.log(error.message);
				});
		}

		// setWorkingOnMessage(true);
		// setTimeout(() => {
		// 	setWorkingOnMessage(false);
		// }, 4000);
	};

	useEffect(() => {
		let isMounted = true;
		if (id) {
			PaymentService.getPaymentById(id).then((res) => {
				if (isMounted) {
					const {
						amount,
						type,
						payer,
						payee,
						dueDate,
						paidDate,
						pending,
						completed,
					} = res.data;
					// Update state
					setAmount(amount);
					setType(type);
					setPayer(payer);
					setPayee(payee);
					setDueDate(dueDate);
					setPaidDate(paidDate);
					setPending(pending);
					setCompleted(completed);
				}
			});
		}
		// Cleanup
		return () => {
			isMounted = false;
		};
	}, [id]);

	return (
		<section className="container">
			{/* {workingOnMessage ? (
				<div className="alert alert-warning mt-4">
					<span className="lead">
						Still working on this section! check back again!
					</span>
				</div>
			) : (
				""
			)} */}
			{loading ? (
				<div>
					<Loading />
					{setLoading(false)}
				</div>
			) : error ? (
				<div className="alert alert-danger">
					{setError(true)}
					<p>{error.message}</p>
				</div>
			) : (
				<React.Fragment>
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
									{/* 
									<option value="0">{pending === 0 ? "NO" : "YES"}</option>
									<option value="1">{pending === 1 ? "YES" : "NO"}</option> 
									*/}
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
									Change payment status by updating the payment status either
									pending or completed.
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
									<option value="Visa">Visa</option>
									<option value="americanexpress">AmericanExpress</option>
									<option value="mastercard">Mastercard</option>
									<option value="paypal">Paypal</option>
									<option value="cash">Cash</option>
									<option value="applepay">Apple Pay</option>
									<option value="banktransfer">Bank Transfer</option>
									<option value="bitcoin">Bitcoin</option>
									<option value="other">Other</option>
								</select>
								{/* DueDate */}
								<label htmlFor="dueDate">Due Date</label>
								<input
									type="date"
									className="form-control form-control-lg"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
									id="dueDate"
									name="dueDate"
									placeholder="Enter due date"
								/>

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
								to="/payments"
								className="btn btn-outline-warning btn-lg mt-3 ms-3 fw-bold me-1"
							>
								CANCEL
							</Link>
						</div>
					</form>
				</React.Fragment>
			)}
		</section>
	);
};

export default EditPayment;
