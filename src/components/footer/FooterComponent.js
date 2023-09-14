import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
	return (
		<section className="footer">
			<div className="container">
				<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
					<div className="col-md-4 d-flex align-items-center">
						<span
							className="mb-3 mb-md-0 text-muted"
							style={{ fontSize: "11px" }}
						>
							&copy; Copyright &nbsp;
							{new Date().getFullYear()}.{" "}
							<span className="text-uppercase">Tri-Payment, Inc.</span>&nbsp;
							Developed by Mahmoud Osman.
						</span>
					</div>
					<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
						<li className="ms-3">
							<Link className="text-muted" href="#">
								<i className="fa fa-twitter" aria-hidden="true"></i>
							</Link>
						</li>
						<li className="ms-3">
							<Link className="text-muted" href="#">
								<i className="fa fa-instagram" aria-hidden="true"></i>
							</Link>
						</li>
						<li className="ms-3">
							<Link className="text-muted" href="#">
								<i className="fa fa-facebook-official" aria-hidden="true"></i>
							</Link>
						</li>
					</ul>
				</footer>
			</div>
		</section>
	);
};

export default FooterComponent;
