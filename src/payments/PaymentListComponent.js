import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import PaymentService from "../service/PaymentService";
import ViewPaymentModal from "./ViewPaymentModal";
import Swal from "sweetalert2";

const PaymentListComponent = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [unableToDelete, setUnableToDelete] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const currentYear = new Date().getFullYear();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this number
  const [totalItems, setTotalItems] = useState(0);

  const userRoleAdmin = "ADMIN1";
  const guestRole = "GUEST";

  // Format paidDate Date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Initialize an array to store week options
  const weekOptions = [];

  // Generate week option - 52 weeks
  for (let week = 1; week <= 52; week++) {
    const startDate = new Date(currentYear, 0, 1 + (week - 1) * 7);
    const endDate = new Date(currentYear, 0, 1 + week * 7 - 1);

    weekOptions.push({
      weekNumber: week,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (event) => {
    setSelectedWeek(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const getPaymentTypeIcon = (paymentType) => {
    const iconMappings = {
      creditcard: "fa-credit-card",
      paypal: "fa-paypal",
      banktransfer: "fa-university",
      cash: "fa-money",
      googlepay: "fa-google-wallet",
      applepay: "fa-apple",
      bitcoin: "fa-bitcoin",
      visa: "fa-cc-visa",
      mastercard: "fa-cc-mastercard",
      americanexpress: "fa-cc-amex",
    };

    return iconMappings[paymentType] || "fa-question";
  };

  const handleViewClick = (payment) => {
    setSelectedPayment(payment);
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      // In a real app, you would pass pagination parameters to your API
      // For example: const res = await PaymentService.getAllPayments(currentPage, itemsPerPage);
      const res = await PaymentService.getAllPayments();
      const sortedPayments = res.data;

      setPayments(sortedPayments);
      setTotalItems(sortedPayments.length); // In a real app, this would come from API response
      setLoading(false);
    } catch (error) {
      setError(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="/">Why do I have this issue?</a>',
      });
      console.error(error.message);
      setLoading(false);
    }
  };

  const unableToDeletePayment = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Oops!!",
      text: "Sorry! You don't have permission to delete this record!'",
      footer: '<a href="/">Why do I have this issue?</a>',
    });
    setTimeout(() => {
      setUnableToDelete(false);
      window.location.href = "/auth/sign-in";
    }, 2000);
  };

  const deletePayment = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await PaymentService.deletePayment(id);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `The record [${id}] was deleted successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          getPayments();
          navigate("/payments");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops!!",
            text: `An error occurred: ${error.message}`,
            footer: '<a href="/">Why do I have this issue?</a>',
          });
          console.error(error.message);
        }
      }
    });
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current payments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getPayments();
  }, [currentPage]); // Add currentPage to dependency array if your API supports pagination

  // Calculate statistics
  const totalAmount = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount || 0),
    0
  );
  const averagePayment =
    payments.length > 0 ? totalAmount / payments.length : 0;

  return (
    <section className="payment-list py-4 bg-light">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="container">
          <div className="alert alert-danger">Error loading payments</div>
        </div>
      ) : (
        <div className="container">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 fw-bold text-primary mb-1">
                <i className="fa fa-credit-card me-2"></i> Payment Management
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Payments
                  </li>
                </ol>
              </nav>
            </div>
            <Link
              to="/payments/add-new-payment"
              className="btn btn-primary btn-lg shadow-sm"
            >
              <i className="fa fa-plus me-2"></i> Add Payment
            </Link>
          </div>

          {/* Dashboard Cards */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Total Payments
                      </h6>
                      <h3 className="mb-0">{totalItems}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <i className="fa fa-credit-card text-primary fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Total Amount
                      </h6>
                      <h3 className="mb-0">
                        {totalAmount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </h3>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <i className="fa fa-money text-success fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Avg. Payment
                      </h6>
                      <h3 className="mb-0">
                        {averagePayment.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </h3>
                    </div>
                    <div className="bg-info bg-opacity-10 p-3 rounded">
                      <i className="fa fa-line-chart text-info fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 border-0">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5 className="mb-0">Payment Records</h5>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end">
                    <Link
                      to="/payments/payment-chart"
                      className="btn btn-outline-success me-2"
                    >
                      <i className="fa fa-bar-chart me-2"></i> View Charts
                    </Link>
                    <select
                      className="form-select w-auto"
                      id="weekSelect"
                      onChange={handleChange}
                      value={selectedWeek}
                    >
                      <option value="">All Weeks</option>
                      {weekOptions.map((weekOption) => (
                        <option
                          key={weekOption.weekNumber}
                          value={weekOption.weekNumber}
                        >
                          Week {weekOption.weekNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              {payments.length <= 0 ? (
                <div className="text-center py-5">
                  <i className="fa fa-credit-card fa-4x text-muted mb-4 opacity-25"></i>
                  <h4 className="text-muted mb-3">No Payment Records Found</h4>
                  <p className="text-muted mb-4">
                    Get started by adding your first payment record
                  </p>
                  <Link
                    to="/payments/add-new-payment"
                    className="btn btn-primary btn-lg"
                  >
                    <i className="fa fa-plus me-2"></i> Add Payment
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Invoice</th>
                        <th>Amount</th>
                        <th>Payer</th>
                        <th>Payee</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPayments.map((payment) => (
                        <tr key={payment.id} className="position-relative">
                          <td className="ps-4">
                            <span className="badge bg-primary bg-opacity-10 text-primary fw-normal">
                              #{payment.invoice}
                            </span>
                          </td>
                          <td className="fw-bold">
                            {parseFloat(payment.amount).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "USD",
                              }
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                                  <i className="fa fa-user text-primary"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">{payment.payer}</div>
                            </div>
                          </td>
                          <td>{payment.payee}</td>
                          <td>
                            <span className="badge bg-light text-dark">
                              <i className="fa fa-calendar me-1"></i>
                              {formatDate(payment.dueDate)}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-success bg-opacity-10 text-success">
                              <i className="fa fa-check-circle me-1"></i> Paid
                            </span>
                          </td>
                          <td className="text-end pe-4">
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "32px", height: "32px" }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                title={`View ${payment.payee} record!`}
                                onClick={() => handleViewClick(payment)}
                              >
                                <i className="fa fa-eye"></i>
                              </button>

                              <Link
                                to={`/payments/view-payment/${payment.id}`}
                                className="btn btn-sm btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "32px", height: "32px" }}
                                title={`Update ${payment.payee} record!`}
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>

                              {userRoleAdmin === "ADMIN" ? (
                                <button
                                  className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "32px", height: "32px" }}
                                  title={`Delete ${payment.payee} record!`}
                                  onClick={(e) => deletePayment(e, payment.id)}
                                >
                                  <i className="fa fa-trash-o"></i>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: "32px", height: "32px" }}
                                  title={`Your role is: ${guestRole}. You are not allowed to delete a payment record!`}
                                  onClick={(e) =>
                                    unableToDeletePayment(e, payment.id)
                                  }
                                  disabled
                                >
                                  <i className="fa fa-trash-o"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {payments.length > 0 && (
              <div className="card-footer bg-white py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p className="mb-0 text-muted">
                      Showing <strong>{indexOfFirstItem + 1}</strong> to{" "}
                      <strong>{Math.min(indexOfLastItem, totalItems)}</strong>{" "}
                      of <strong>{totalItems}</strong> payments
                    </p>
                  </div>
                  <div className="col-md-6">
                    <nav
                      aria-label="Page navigation"
                      className="d-flex justify-content-end"
                    >
                      <ul className="pagination mb-0">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {pageNumbers.map((number) => (
                          <li
                            key={number}
                            className={`page-item ${
                              currentPage === number ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(number)}
                            >
                              {number}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === pageNumbers.length ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === pageNumbers.length}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for view payment component */}
      <ViewPaymentModal
        selectedPayment={selectedPayment}
        getPaymentTypeIcon={getPaymentTypeIcon}
        formatDate={formatDate}
        Capitalize={Capitalize}
      />
    </section>
  );
};

export default PaymentListComponent;
