import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useServerUrl() {
	const [serverUrl, setServerUrl] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			const mode = import.meta.env.VITE_MODE;
			if (!mode) throw new Error("❌ VITE_MODE env is missing");

			const server_url = ["dev", "development"].includes(mode)
				? import.meta.env.VITE_DEV_SERVER_URL ??
				  (() => {
						throw new Error("VITE_DEV_SERVER_URL env is not defined");
				  })()
				: import.meta.env.VITE_PROD_SERVER_URL ??
				  (() => {
						throw new Error("VITE_PROD_SERVER_URL env is not defined");
				  })();

			setServerUrl(server_url);
		} catch (err) {
			navigate("/error", { state: { status: 500, message: err.message } });
		}
	}, [navigate]);

	return serverUrl;
}
