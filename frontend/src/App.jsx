import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import ErrorScreen from "./Pages/ErrorScreen";
import ProductDetails from "./Pages/ProductDetails";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
	return (
		<Routes>
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/"
				element={
					<ErrorBoundary fallback={<p>Oops! Failed to load Home page.</p>}>
						<Home />
					</ErrorBoundary>
				}
			/>
			<Route path="/error" element={<ErrorScreen />} />
			<Route
				path="/product-details"
				element={
					<ErrorBoundary fallback={<p>Oops! Failed to load Product Details page.</p>}>
						<ProductDetails />{" "}
					</ErrorBoundary>
				}
			/>
		</Routes>
	);
}
