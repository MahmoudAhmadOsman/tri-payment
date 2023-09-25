import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
	const image = "https://source.unsplash.com/1500x1000/?stock-exchange";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const auth = getAuth();
	const navigate = useNavigate();

	const signIn = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((useCredentials) => {
				navigate("/dashboard");
				console.log(useCredentials.user);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<section className="sign-in">
			<div className="container mt-3">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<div className="wrap bg-success shadow-lg p-3 mb-5 bg-body rounded">
							<div className="login-wraps p-4 p-md-5">
								<div className="d-flex">
									<div className="w-100">
										<h2 className="mb-4">Sign In </h2>
										<p>Please enter your email and password to sign in.</p>
									</div>
								</div>
								<form action="#" className="signin-form" onSubmit={signIn}>
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
								<p className="text-muted">
									Don't have an account?{" "}
									<Link className="text-primary" to="/auth/sign-up">
										Sign Up
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

export default SignIn;
