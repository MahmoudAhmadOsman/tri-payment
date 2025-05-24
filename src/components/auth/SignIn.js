import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AuthStyle.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
      toast.success("Google login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <h2 className="fw-bold mb-3">
                    <i className="fa fa-sign-in me-2 text-primary"></i> Welcome
                    Back
                  </h2>
                  <p className="text-muted">Please sign in to continue</p>
                </div>

                <form onSubmit={signIn}>
                  {/* Email Input */}
                  <div className="form-outline mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        id="email"
                        className={`form-control form-control-lg ${
                          error && email.length <= 0 ? "is-invalid" : ""
                        }`}
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className="form-label">
                        <i className="fa fa-envelope me-2"></i>Email Address
                      </label>
                    </div>
                    {error && email.length <= 0 && (
                      <div className="invalid-feedback d-block text-start">
                        Please enter your email address
                      </div>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-4">
                    <div className="form-floating input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`form-control form-control-lg ${
                          error && password.length <= 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password" className="form-label">
                        <i className="fa fa-lock me-2"></i>Password
                      </label>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 5,
                        }}
                      >
                        <i
                          className={`fa ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                    {error && password.length <= 0 && (
                      <div className="invalid-feedback d-block text-start">
                        Please enter your password
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/auth/forgot-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <button
                    className="btn btn-primary btn-lg w-100 mb-3"
                    type="submit"
                    disabled={!email || !password}
                  >
                    <i className="fa fa-sign-in me-2"></i> Sign In
                  </button>

                  {/* Divider */}
                  <div className="divider d-flex align-items-center my-4">
                    <div className="border-top flex-grow-1"></div>
                    <span className="px-3 text-muted">OR</span>
                    <div className="border-top flex-grow-1"></div>
                  </div>

                  {/* Google Sign In */}
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-lg w-100"
                    onClick={signInWithGoogle}
                  >
                    <i className="fa fa-google me-2"></i> Continue with Google
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-4">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/auth/sign-up" className="text-primary fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
