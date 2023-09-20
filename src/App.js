import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentListComponent from "./payments/PaymentListComponent";
import NotFound from "./utils/NotFound";
import NavigationComponent from "./navigation/NavigationComponent";
import FooterComponent from "./components/footer/FooterComponent";
import EditPayment from "./payments/EditPayment";
import HomeComponent from "./components/home/HomeComponent";
import PaymentChart from "./chart/PaymentChart";

function App() {
	const routes = [
		{ path: "/payments/payment-chart", element: <PaymentChart /> },
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
			<>
				<NavigationComponent />
				<Routes>{routeComponents}</Routes>
				<FooterComponent />
			</>
		</BrowserRouter>
	);
}

export default App;
