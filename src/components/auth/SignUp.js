import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

const SignUp = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const signUp = (e) => {
		e.preventDefault();

		if (fullName === "" || email === "" || password === "") {
			setError(true);
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					navigate("/auth/sign-in");
					console.log(userCredential);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<section className="sign-up">
			<div className="container mt-3">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<div className="wrap bg-success shadow-lg mb-5 bg-body rounded">
							<div className="login-wraps p-4 p-md-5">
								<div className="d-flex">
									<div>
										<h4 className="mb-2">Create An Account</h4>
										<p>Please fill out the required fields below.</p>
									</div>
								</div>
								<form action="#" className="signin-form" onSubmit={signUp}>
									<div className="form-group mb-3">
										<label
											className="form-control-placeholder"
											htmlFor="fullName"
										>
											Full Name
										</label>
										<input
											type="text"
											id="email"
											placeholder="Enter your full name"
											className="form-control form-control-lg"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
										/>
										{error && fullName.length <= 0 ? (
											<span className="text-danger">
												Full name is required!
											</span>
										) : (
											""
										)}
									</div>
									<div className="form-group mb-3">
										<label className="form-control-placeholder" htmlFor="email">
											Emai Address
										</label>
										<input
											type="email"
											id="email"
											placeholder="Enter your email"
											className="form-control form-control-lg"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										{error && email.length <= 0 ? (
											<span className="text-danger">
												Email address is required!
											</span>
										) : (
											""
										)}
									</div>
									<div className="form-group mb-3">
										<label htmlFor="password">Password</label>
										<input
											id="password"
											type="password"
											className="form-control form-control-lg"
											placeholder="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										{error && password.length <= 0 ? (
											<span className="text-danger">
												Password is required & must be at least 6 characters
												long.!
											</span>
										) : (
											""
										)}
									</div>
									<div className="form-group mb-1">
										<button
											type="submit"
											className="btn btn-outline-primary fw-bold btn-lg"
										>
											Sign Up
										</button>
									</div>
								</form>
								<p className="text-muted">
									Don't have an account?{" "}
									<Link className="text-primary" to="/auth/sign-in">
										Sign In
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
