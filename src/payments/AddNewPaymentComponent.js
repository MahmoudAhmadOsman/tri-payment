import React, { useEffect, useState } from "react";
import PaymentService from "../service/PaymentService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./PaymentStyle.css";

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

  const { invoice, amount, type, payer, payee, dueDate } = formData;

  useEffect(() => {
    const randomInvoiceNumber = Math.floor(Math.random() * 10000000000);
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
      dueDate === ""
    ) {
      setError(true);
    } else {
      try {
        await PaymentService.savePayment(formData);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Success",
          text: "New payment record added successfully!",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/payments");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="/">Why do I have this issue?</a>',
        });
        console.error(error.message);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-primary text-white rounded-top-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">
                  <i className="fa fa-credit-card-alt fa-fw me-2"></i>
                  Add New Payment
                </h2>
                <span className="badge bg-light text-primary fs-6">
                  Invoice #: {invoice}
                </span>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                {/* Amount Field */}
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label fw-bold">
                    <i className="fa fa-money fa-fw me-2 text-primary"></i>
                    Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">$</span>
                    <input
                      type="number"
                      className={`form-control form-control-lg ${
                        error && amount.length <= 0 ? "is-invalid" : ""
                      }`}
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  {error && amount.length <= 0 && (
                    <div className="invalid-feedback">Amount is required!</div>
                  )}
                </div>

                {/* Payment Type Field */}
                <div className="mb-4">
                  <label htmlFor="type" className="form-label fw-bold">
                    <i className="fa fa-credit-card fa-fw me-2 text-primary"></i>
                    Payment Type
                  </label>
                  <select
                    className={`form-select form-select-lg ${
                      error && type.length <= 0 ? "is-invalid" : ""
                    }`}
                    id="type"
                    name="type"
                    value={type}
                    onChange={handleChange}
                  >
                    <option value="Visa">Visa</option>
                    <option value="American Express">American Express</option>
                    <option value="Master Card">Master Card</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Cash">Cash</option>
                    <option value="Apple Pay">Apple Pay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Other">Other</option>
                  </select>
                  {error && type.length <= 0 && (
                    <div className="invalid-feedback">
                      Payment type is required!
                    </div>
                  )}
                </div>

                {/* Payer and Payee Fields */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="payer" className="form-label fw-bold">
                      <i className="fa fa-user fa-fw me-2 text-primary"></i>
                      Payer
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        error && payer.length <= 0 ? "is-invalid" : ""
                      }`}
                      id="payer"
                      name="payer"
                      value={payer}
                      onChange={handleChange}
                      placeholder="Enter payer name"
                    />
                    {error && payer.length <= 0 && (
                      <div className="invalid-feedback">
                        Payer name is required!
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="payee" className="form-label fw-bold">
                      <i className="fa fa-user fa-fw me-2 text-primary"></i>
                      Payee
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        error && payee.length <= 0 ? "is-invalid" : ""
                      }`}
                      id="payee"
                      name="payee"
                      value={payee}
                      onChange={handleChange}
                      placeholder="Enter payee name"
                    />
                    {error && payee.length <= 0 && (
                      <div className="invalid-feedback">
                        Payee name is required!
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Date Field */}
                <div className="mb-4">
                  <label htmlFor="dueDate" className="form-label fw-bold">
                    <i className="fa fa-calendar fa-fw me-2 text-primary"></i>
                    Due Date
                  </label>
                  <input
                    type="date"
                    className={`form-control form-control-lg ${
                      error && dueDate.length <= 0 ? "is-invalid" : ""
                    }`}
                    id="dueDate"
                    name="dueDate"
                    value={dueDate}
                    onChange={handleChange}
                  />
                  {error && dueDate.length <= 0 && (
                    <div className="invalid-feedback">
                      Due Date is required!
                    </div>
                  )}
                </div>

                {/* Status Fields */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="pending" className="form-label fw-bold">
                      <i className="fa fa-exchange fa-fw me-2 text-primary"></i>
                      Pending Status
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="pending"
                      name="pending"
                      value={formData.pending}
                      onChange={handleChange}
                    >
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="completed" className="form-label fw-bold">
                      <i className="fa fa-check fa-fw me-2 text-primary"></i>
                      Completed Status
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="completed"
                      name="completed"
                      value={formData.completed}
                      onChange={handleChange}
                    >
                      <option value="NO">NO</option>
                      <option value="YES">YES</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Link
                    to="/payments/payment-actions"
                    className="btn btn-outline-danger btn-lg px-4 me-md-2"
                  >
                    <i className="fa fa-times fa-fw me-2"></i>
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary btn-lg px-4">
                    <i className="fa fa-paper-plane fa-fw me-2"></i>
                    Submit Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPaymentComponent;
