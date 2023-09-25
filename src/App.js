import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PaymentListComponent from "./payments/PaymentListComponent";
import NotFound from "./utils/NotFound";
import NavigationComponent from "./navigation/NavigationComponent";
import FooterComponent from "./components/footer/FooterComponent";
import EditPayment from "./payments/EditPayment";
import HomeComponent from "./components/home/HomeComponent";
import PaymentChart from "./chart/PaymentChart";
import React, { useState } from "react";
import Loading from "./utils/Loading";
import AddNewPaymentComponent from "./payments/AddNewPaymentComponent";
import PaymentLinks from "./payments/PaymentLinks";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
	const [loading, setLoading] = useState(true);
	const routes = [
		// { path: "/users/login", element: <LoginComponent /> },
		{ path: "/dashboard", element: <Dashboard /> },
		{ path: "/auth/sign-up", element: <SignUp /> },
		{ path: "/auth/sign-in", element: <SignIn /> },
		{ path: "/payments/payment-chart", element: <PaymentChart /> },
		{ path: "/payments/add-new-payment", element: <AddNewPaymentComponent /> },
		{ path: "/payments/payment-actions", element: <PaymentLinks /> },
		{ path: "/payments", element: <PaymentListComponent /> },
		{ path: "/payments/view-payment/:id", element: <EditPayment /> },
		{ path: "/", exact: true, element: <HomeComponent /> },

		{ path: "*", element: <NotFound /> },
	];
	const routeComponents = routes.map((route, index) => (
		<Route
			key={index}
			path={route.path}
			element={route.element}
			exact={route.exact}
		/>
	));

	return (
		<BrowserRouter>
			<ToastContainer />
			{loading ? (
				<>
					<Loading />
					{setLoading(false)}
				</>
			) : (
				<React.Fragment>
					<NavigationComponent />
					<Routes>{routeComponents}</Routes>
					<FooterComponent />
				</React.Fragment>
			)}
		</BrowserRouter>
	);
}

export default App;
