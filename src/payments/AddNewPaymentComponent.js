import React, { useEffect, useState } from "react";

const AddNewPaymentComponent = () => {
	const [formData, setFormData] = useState({
		invoice: "", // Initialize as an empty string
		amount: "",
		type: "Visa",
		payer: "",
		payee: "",
		dueDate: "",
		paidDate: "",
		pending: "YES",
		completed: "NO",
	});

	useEffect(() => {
		// Generate a random number for the "invoice" field when the component mounts
		const randomInvoiceNumber = Math.floor(Math.random() * 1000000);
		setFormData({
			...formData,
			invoice: randomInvoiceNumber.toString(),
		});
	}, []); // Empty dependency array ensures this effect runs only once when the component mounts

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// You can handle form submission here
		console.log(formData);
	};

	return (
		<article className="AddNewPayment mt-3">
			<div className="container fw-bold ">
				<div className="row  align-items-center justify-content-center">
					<div className="col-md-8">
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
									type="text"
									className="form-control form-control-lg"
									id="amount"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0.00"
								/>
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
									<option value="Visa">Visa</option>
									<option value="Mastercard">Mastercard</option>
									<option value="Paypal">Paypal</option>
									<option value="Cash">Cash</option>
								</select>
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
									className="form-control form-control-lg"
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
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="completed">Completed</label>
								<select
									className="form-control form-control-lg"
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
