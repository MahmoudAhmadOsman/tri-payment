import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Dashboard = () => {
	const navigate = useNavigate();
	const user = auth.currentUser;
	// const name = auth.currentUser;

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
		}, 4000);
	};

	return (
		<div className="container">
			<h2 className="text-primary">Dashboard</h2> <hr />
			<div className="row">
				<div className="col-md-4">
					<ul className="list-group">
						{/* <li class="list-group-item">Full Name: {name.name}</li> */}
						<li className="list-group-item">
							<h6>Emaill Address:</h6> {user.email}
						</li>{" "}
						{/* <li className="list-group-item">
							<h5>Member Since:</h5> {user.providerId}
						</li> */}
						<br />
						<li className="list-group-item">
							<button
								type="submit"
								className="btn btn-danger btn-sm"
								onClick={(e) => logoutUser(e)}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
	// return <div>Dashboard</div>;
};

export default Dashboard;
