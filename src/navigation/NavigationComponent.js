import React from "react";
import { Link } from "react-router-dom";

const NavigationComponent = () => {
  return (
    <div className="site-navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm border-0">
        <div className="container">
          {/* Brand/Logo with better spacing */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/assets/images/tri-payment-logo.png"
              alt="Tri-Payment Logo"
              className="img-fluid me-2"
              style={{ width: "100px", objectFit: "cover" }}
            />
          </Link>

          {/* Mobile Toggle Button with icon */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links with icons and hover effects */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <Link
                  className="nav-link d-flex align-items-center py-3 px-3 rounded"
                  to="/"
                  activeClassName="active"
                >
                  <i className="fa fa-home fa-lg me-2" aria-hidden="true"></i>
                  <span>Home</span>
                </Link>
              </li>

              <li className="nav-item mx-1">
                <Link
                  className="nav-link d-flex align-items-center py-3 px-3 rounded"
                  to="/payments/payment-actions"
                  activeClassName="active"
                >
                  <i
                    className="fa fa-credit-card fa-lg me-2"
                    aria-hidden="true"
                  ></i>
                  <span>Payments</span>
                </Link>
              </li>

              <li className="nav-item mx-1">
                <Link
                  className="nav-link d-flex align-items-center py-3 px-3 rounded"
                  to="/auth/sign-up"
                  activeClassName="active"
                >
                  <i
                    className="fa fa-user-plus fa-lg me-2"
                    aria-hidden="true"
                  ></i>
                  <span>Sign Up</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationComponent;
