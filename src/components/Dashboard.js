import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logoutUser = async (e) => {
    e.preventDefault();
    await signOut(auth);

    toast.success("Logged out Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/auth/sign-in");
    }, 200);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">
                  <i className="fa fa-tachometer mr-2"></i> Dashboard
                </h3>
                <button
                  onClick={(e) => logoutUser(e)}
                  className="btn btn-light btn-sm"
                >
                  <i className="fa fa-sign-out mr-1"></i> Logout
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <div
                    className="bg-light p-4 rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <i className="fa fa-user fa-4x text-primary"></i>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex align-items-center p-3">
                      <i
                        className="fa fa-envelope fa-fw text-muted mr-3"
                        style={{ width: "24px" }}
                      ></i>
                      <div>
                        <h6 className="mb-0 text-muted">Email Address</h6>
                        <p className="mb-0 font-weight-bold">{user.email}</p>
                      </div>
                    </div>

                    <div className="list-group-item d-flex align-items-center p-3">
                      <i
                        className="fa fa-calendar fa-fw text-muted mr-3"
                        style={{ width: "24px" }}
                      ></i>
                      <div>
                        <h6 className="mb-0 text-muted">Account Status</h6>
                        <p className="mb-0 font-weight-bold text-success">
                          Active
                        </p>
                      </div>
                    </div>

                    <div className="list-group-item d-flex align-items-center p-3">
                      <i
                        className="fa fa-shield fa-fw text-muted mr-3"
                        style={{ width: "24px" }}
                      ></i>
                      <div>
                        <h6 className="mb-0 text-muted">Security</h6>
                        <p className="mb-0 font-weight-bold">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between">
                <small className="text-muted">
                  <i className="fa fa-info-circle mr-1"></i> Last login:{" "}
                  {new Date().toLocaleString()}
                </small>
                <small className="text-muted">
                  <i className="fa fa-copyright mr-1"></i>{" "}
                  {new Date().getFullYear()} Tri Payment Solutions
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
