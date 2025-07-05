import { useLocation } from "react-router-dom";

export default function ErrorScreen() {
	const { state } = useLocation();
	const status = state?.status || 500;
	const message = state?.message || "Something went wrong. No Error Message recieved as well.";

	return (
		<div className="text-center p-10 text-red-600">
			<h1 className="text-2xl font-bold mb-2">⚠️ ERROR {status} ⚠️</h1>
			<p>{message}</p>
		</div>
	);
}
