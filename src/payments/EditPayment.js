import { useState } from "react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaymentService from "../service/PaymentService";
import Loading from "../utils/Loading";
import Swal from "sweetalert2";

const EditPayment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all the required fields",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (id) {
      PaymentService.patchPayment(id, paymentData)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            text: `The ${payer}'s record updated successfully!`,
            showConfirmButton: false,
            timer: 2500,
            backdrop: `
                            rgba(0,0,123,0.4)
                            url("/images/nyan-cat.gif")
                            left top
                            no-repeat
                        `,
          });
          navigate("/payments");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: `Error updating payment: ${error.message}`,
            confirmButtonColor: "#d33",
          });
          console.error(error);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (id) {
      PaymentService.getPaymentById(id)
        .then((res) => {
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
            setAmount(amount);
            setType(type);
            setPayer(payer);
            setPayee(payee);
            setDueDate(dueDate);
            setPaidDate(paidDate);
            setPending(pending);
            setCompleted(completed);
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <i className="fa fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );

  return (
    <section className="container py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">
            <i className="fa fa-pencil-square-o me-2"></i>
            Edit Payment Record
          </h2>
        </div>

        <div className="card-body">
          <form onSubmit={updatePayment}>
            <div className="row g-4">
              {/* Left Column - Basic Info */}
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label fw-bold">
                    <i className="fa fa-money me-2 text-success"></i>
                    Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="payer" className="form-label fw-bold">
                    <i className="fa fa-user me-2 text-info"></i>
                    Payer Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="payer"
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="payee" className="form-label fw-bold">
                    <i className="fa fa-user-circle me-2 text-primary"></i>
                    Payee Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="payee"
                    value={payee}
                    onChange={(e) => setPayee(e.target.value)}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              {/* Middle Column - Status */}
              <div className="col-lg-4">
                <div className="mb-3">
                  <h5 className="fw-bold text-muted mb-3">
                    <i className="fa fa-hourglass-half me-2"></i>
                    Payment Status
                  </h5>

                  <div className="mb-3">
                    <label htmlFor="pending" className="form-label">
                      Pending Status
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="pending"
                      value={pending}
                      onChange={(e) => setPending(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="1">Pending</option>
                      <option value="0">Not Pending</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="completed" className="form-label">
                      Completion Status
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="completed"
                      value={completed}
                      onChange={(e) => setCompleted(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="0">Not Completed</option>
                      <option value="1">Completed</option>
                    </select>
                  </div>

                  <div className="alert alert-info mt-4">
                    <i className="fa fa-info-circle me-2"></i>
                    Update the payment status appropriately
                  </div>
                </div>
              </div>

              {/* Right Column - Dates & Type */}
              <div className="col-lg-4">
                <div className="mb-3">
                  <label htmlFor="type" className="form-label fw-bold">
                    <i className="fa fa-credit-card me-2 text-warning"></i>
                    Payment Method
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select payment method
                    </option>
                    <option value="visa">Visa</option>
                    <option value="americanexpress">American Express</option>
                    <option value="mastercard">Master Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash</option>
                    <option value="applepay">Apple Pay</option>
                    <option value="banktransfer">Bank Transfer</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label fw-bold">
                    <i className="fa fa-calendar-times-o me-2 text-danger"></i>
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="paidDate" className="form-label fw-bold">
                    <i className="fa fa-calendar-check-o me-2 text-success"></i>
                    Paid Date
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="paidDate"
                    value={paidDate}
                    onChange={(e) => setPaidDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4 border-top pt-3">
              <Link
                to="/payments"
                className="btn btn-lg btn-outline-secondary me-3"
              >
                <i className="fa fa-times me-2"></i>
                Cancel
              </Link>
              <button type="submit" className="btn btn-lg btn-primary">
                <i className="fa fa-save me-2"></i>
                Update Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPayment;
