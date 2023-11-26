import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
	const image = "https://source.unsplash.com/1500x1000/?stock-exchange";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const signIn = async (e) => {
		e.preventDefault();

		if (email === "" || password === "") {
			setError(true);
		} else {
			setError(false);
		}

		await signInWithEmailAndPassword(auth, email, password)
			.then((useCredentials) => {
				navigate("/dashboard");
				console.log(useCredentials.user);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
		}
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
										<h2 className="mb-4 text-center">Sign In </h2>
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
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										{error && password.length <= 0 ? (
											<span className="text-danger">Password is required!</span>
										) : (
											""
										)}
									</div>
									<div className="form-group mb-2">
										<button
											type="submit"
											className="btn btn-outline-primary fw-bold btn-lg w-100"
										>
											Login
										</button>
										<button
											type="submit"
											className="btn btn-outline-success fw-bold btn-lg w-100 mt-2"
											onClick={signInWithGoogle}
										>
											Login with Google
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
