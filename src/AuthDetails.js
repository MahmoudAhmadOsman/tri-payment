import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthDetails = () => {
	const [authUser, setAuthUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				// setAuthUser(user.currentUser);
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});

		return () => {
			listen();
		};
	}, []);

	// const userSignOut = () => {
	// 	signOut(auth)
	// 		.then(() => {
	// 			navigate("/auth/sign-in");
	// 			console.log("sign out successful");
	// 		})
	// 		.catch((error) => console.log(error.message));
	// };

	return (
		<div>
			{authUser ? (
				<>
					<p>{`Signed In as ${authUser.email}`}</p>
					{/* <button onClick={userSignOut}>Sign Out</button> */}
				</>
			) : (
				<p>Signed Out</p>
			)}
		</div>
	);
};

export default AuthDetails;
