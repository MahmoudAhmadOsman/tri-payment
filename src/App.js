import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentListComponent from "./payments/PaymentListComponent";
import Loading from "./utils/Loading";
import NotFound from "./utils/NotFound";
import NavigationComponent from "./navigation/NavigationComponent";
import FooterComponent from "./components/footer/FooterComponent";

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<BrowserRouter>
			{loading ? (
				<>
					<Loading />
					{setLoading(false)}
				</>
			) : (
				<>
					<NavigationComponent />
					<Routes>
						<Route path="/" exact element={<PaymentListComponent />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<FooterComponent />
				</>
			)}
		</BrowserRouter>
	);
}

export default App;
