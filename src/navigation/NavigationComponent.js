import React from "react";
import { Link } from "react-router-dom";

const NavigationComponent = () => {
	return (
		<div className="site_navigation fw-bold">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand text-uppercase" to="/">
						<img
							className="img-fluid"
							src="/assets/images/tri-payment-logo.png"
							alt="tri-payment logo"
						/>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse  "
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link active"
									aria-current="page"
									to="/payments/payment-actions"
								>
									Payments
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link active"
									aria-current="page"
									to="/auth/sign-up"
								>
									Sign Up
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
