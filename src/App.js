import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentListComponent from "./payments/PaymentListComponent";
import Loading from "./utils/Loading";
import NotFound from "./utils/NotFound";

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
					<Routes>
						<Route path="/" exact element={<PaymentListComponent />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</>
			)}
		</BrowserRouter>
	);
}

export default App;
