import React from "react";

export const LoginComponent = () => {
	const image = "https://source.unsplash.com/1500x1000/?stock-exchange";
	return (
		<section className="ftco-section">
			<div className="container mt-3">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<div className="wrap bg-success shadow-lg p-3 mb-5 bg-body rounded">
							<div className="login-wrap p-4 p-md-5">
								<div className="d-flex">
									<div className="w-100">
										<h2 className="mb-4 text-center">Sign In</h2>
									</div>
								</div>
								<form action="#" className="signin-form">
									<div className="form-group mb-3">
										<label
											className="form-control-placeholder"
											htmlFor="username"
										>
											Username
										</label>
										<input
											type="text"
											placeholder="username"
											className="form-control form-control-lg"
											required=""
										/>
									</div>
									<div className="form-group mb-3">
										<label htmlFor="password">Password</label>
										<input
											id="password-field"
											type="password"
											className="form-control form-control-lg"
											placeholder="Password"
											required=""
										/>
									</div>
									<div className="form-group mb-1">
										<button
											type="submit"
											className="btn btn-outline-primary fw-bold btn-lg"
										>
											Sign In
										</button>
									</div>
								</form>
								<p className="text-center">
									Not a member?{" "}
									<a data-toggle="tab" href="#signup">
										Sign Up
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
