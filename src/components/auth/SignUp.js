import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "./AuthStyle.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (fullName === "" || email === "" || password === "") {
      setError(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success(
            `New user ${userCredential.user.email} has been created successfully!!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          setTimeout(() => {
            navigate("/auth/sign-in");
          }, 4000);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <section className="sign-up vh-100 bg-light">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2 text-primary">
                    <i className="fa fa-user-plus me-2"></i> Create Account
                  </h2>
                  <p className="text-muted">Fill in your details to register</p>
                </div>

                <form onSubmit={signUp}>
                  {/* Full Name Field */}
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      <i className="fa fa-user me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        error && fullName.length <= 0 ? "is-invalid" : ""
                      }`}
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {error && fullName.length <= 0 && (
                      <div className="invalid-feedback">
                        Please enter your full name
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fa fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${
                        error && email.length <= 0 ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && email.length <= 0 && (
                      <div className="invalid-feedback">
                        Please enter a valid email address
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <i className="fa fa-lock me-2"></i>Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg ${
                          error && password.length <= 0 ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                      {error && password.length <= 0 && (
                        <div className="invalid-feedback d-block">
                          Password must be at least 6 characters
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-bold"
                      disabled={!fullName || !email || !password}
                    >
                      <i className="fa fa-user-plus me-2"></i> Sign Up
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mb-4">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/auth/sign-in" className="text-primary fw-bold">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
