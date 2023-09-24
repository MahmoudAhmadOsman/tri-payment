import React, { useEffect, useState } from "react";
import PaymentService from "../service/PaymentService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewPaymentComponent = () => {
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		invoice: "",
		amount: "",
		type: "Visa",
		payer: "",
		payee: "",
		dueDate: "",
		paidDate: "NOT PAID",
		pending: "YES",
		completed: "NO",
	});

	const {
		invoice,
		amount,
		type,
		payer,
		payee,
		dueDate,
		paidDate,
		pending,
		completed,
	} = formData;

	useEffect(() => {
		const randomInvoiceNumber = Math.floor(Math.random() * 1000000);
		setFormData({
			...formData,
			invoice: randomInvoiceNumber.toString(),
		});
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			amount === "" ||
			type === "" ||
			payer === "" ||
			payee === "" ||
			dueDate === "" ||
			pending === "" ||
			completed === ""
		) {
			setError(true);
		} else {
			await PaymentService.savePayment(formData)
				.then((res) => {
					setFormData(res.data);
					// setFormData({
					// 	invoice: "",
					// 	amount: "",
					// 	type: "",
					// 	payer: "",
					// 	payee: "",
					// 	dueDate: "",
					// 	pending: "YES",
					// 	completed: "NO",
					// });

					// console.log(res.data);
					toast.success("New payment record added successfully!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
					});
					navigate("/payments");
				})
				.catch((error) => {
					toast.success("Something went wrong!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
					});
					console.log(error.message);
				});
		}
	};

	return (
		<article className="AddNewPayment mt-3">
			<div className="container ">
				<div className="row  align-items-center justify-content-center">
					<div className="col-md-8 col-auto">
						<h1 className="text-primary  ">Add New Payment</h1> <hr />
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="invoice" className="d-none">
									Invoice
								</label>
								<input
									type="hidden"
									className="form-control"
									id="invoice"
									name="invoice"
									value={formData.invoice}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="amount">Amount</label>
								<input
									type="number"
									className="form-control form-control-lg"
									id="amount"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0.00"
								/>
								{error && amount.length <= 0 ? (
									<span className="text-danger">Amount is required!</span>
								) : (
									""
								)}
							</div>

							<div className="form-group">
								<label htmlFor="type">Type</label>
								<select
									className="form-select form-control form-control-lg"
									id="type"
									name="type"
									value={formData.type}
									onChange={handleChange}
									placeholder="Select type"
								>
									<option value="visa">Visa</option>
									<option value="americanexpress">American Express</option>
									<option value="mastercard">Master Card</option>
									<option value="paypal">Paypal</option>
									<option value="cash">Cash</option>
									<option value="applepay">Apple Pay</option>
									<option value="banktransfer">Bank Transfer</option>
									<option value="bitcoin">Bitcoin</option>
									<option value="other">Other</option>
								</select>
								{error && type.length <= 0 ? (
									<span className="text-danger">Payment type is required!</span>
								) : (
									""
								)}
							</div>

							<div className="form-group">
								<label htmlFor="payer">Payer</label>
								<input
									type="text"
									className="form-control form-control-lg"
									id="payer"
									name="payer"
									value={formData.payer}
									onChange={handleChange}
									placeholder="Enter payer name"
								/>
								{error && payer.length <= 0 ? (
									<span className="text-danger">Payer name is required!</span>
								) : (
									""
								)}
							</div>
							<div className="form-group">
								<label htmlFor="payee">Payee</label>
								<input
									type="text"
									className="form-control form-control-lg"
									id="payee"
									name="payee"
									value={formData.payee}
									onChange={handleChange}
									placeholder="Enter payee name"
								/>
								{error && payee.length <= 0 ? (
									<span className="text-danger">Payee name is required!</span>
								) : (
									""
								)}
							</div>
							<div className="form-group">
								<label htmlFor="dueDate">Due Date</label>
								<input
									type="date"
									className="form-control form-control-lg"
									id="dueDate"
									name="dueDate"
									value={formData.dueDate}
									onChange={handleChange}
								/>
								{error && dueDate.length <= 0 ? (
									<span className="text-danger">Due Date is required!</span>
								) : (
									""
								)}
							</div>
							<div className="form-group d-none">
								<label htmlFor="paidDate">Paid Date</label>
								<input
									type="date"
									className="form-control form-control-lg"
									id="paidDate"
									name="paidDate"
									value={formData.paidDate}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="pending">Pending</label>
								<select
									className="form-select form-control form-control-lg"
									id="pending"
									name="pending"
									value={formData.pending}
									onChange={handleChange}
								>
									<option disabled defaultValue>
										Select one
									</option>
									<option value="YES">YES</option>
									<option value="NO">NO</option>
									{error && pending.length <= 0 ? (
										<span className="text-danger">
											Pending status is required!
										</span>
									) : (
										""
									)}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="completed">Completed</label>
								<select
									className="form-select form-control form-control-lg"
									id="completed"
									name="completed"
									value={formData.completed}
									onChange={handleChange}
								>
									<option disabled defaultValue>
										Select one
									</option>
									<option value="YES">YES</option>
									<option value="NO">NO</option>
								</select>
								{error && completed.length <= 0 ? (
									<span className="text-danger">
										Completed status is required!
									</span>
								) : (
									""
								)}
							</div>
							<button
								type="submit"
								className="btn btn-outline-primary fw-bold btn-lg mt-2"
							>
								Submit
							</button>
						</form>{" "}
					</div>
				</div>
			</div>
		</article>
	);
};

export default AddNewPaymentComponent;
