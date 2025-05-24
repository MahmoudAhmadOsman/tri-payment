import React from "react";
import { Link } from "react-router-dom";
import "./PaymentStyle.css";

const PaymentLinks = () => {
  return (
    <div className="payment-links">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            {/* <i className="fa fa-credit-card-alt mr-2" aria-hidden="true"></i> */}
            Payment Options
          </h2>
          <p className="lead text-muted">
            Please select the option you'd like to perform
          </p>
          <hr
            className="w-25 mx-auto bg-primary mt-4"
            style={{ height: "2px" }}
          />
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-effect">
              <div className="card-body text-center p-4 p-lg-5">
                <div className="icon-wrapper bg-success bg-opacity-10 rounded-circle p-4 mb-4 d-inline-block">
                  <i
                    className="fa fa-plus-circle fa-3x text-success"
                    aria-hidden="true"
                  ></i>
                </div>
                <h3 className="h4 mb-3">Add New Payment</h3>
                <p className="text-muted mb-4">
                  Choose this option to create a new payment record.
                </p>
                <Link
                  to="/payments/add-new-payment"
                  className="btn btn-success btn-lg px-4 py-2 stretched-link"
                >
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>&nbsp;
                  Create Payment
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-effect">
              <div className="card-body text-center p-4 p-lg-5">
                <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-4 mb-4 d-inline-block">
                  <i
                    className="fa fa-list-alt fa-3x text-primary"
                    aria-hidden="true"
                  ></i>
                </div>
                <h3 className="h4 mb-3">Payment List</h3>
                <p className="text-muted mb-4">
                  Choose this option to view a list of payment records.
                </p>
                <Link
                  to="/payments"
                  className="btn btn-primary btn-lg px-4 py-2 stretched-link"
                >
                  <i className="fa fa-list mr-2" aria-hidden="true"></i>&nbsp;
                  View Payments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinks;
