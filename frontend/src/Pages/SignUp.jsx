import axios from "axios";
import { useServerUrl } from "../utils/useServerUrl";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();
	const server_url = useServerUrl();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const username = e.target.username.value;
		const password = e.target.password.value;

		axios
			.post(`${server_url}/user/signup`, {
				email,
				username,
				password,
			})
			.then((res) => {
				const data = res.data;
				localStorage.setItem("token", data.token);
				navigate("/");
			})
			.catch((err) => console.error(err));
	};
	return (
		<main className="flex items-center justify-center">
			<form action="" onSubmit={handleFormSubmit}>
				<h1>Signup</h1>

				<div className="my-3">
					<label htmlFor="email">Email</label>
					<input className="p-2 border-1" type="email" name="email" id="email" placeholder="enter your email" />
				</div>

				<div className="my-3">
					<label htmlFor="username">Username</label>
					<input className="p-2 border-1" type="text" name="username" id="username" placeholder="enter username" />
				</div>

				<div className="my-3">
					<label htmlFor="password">Password</label>
					<input className="p-2 border-1" type="password" name="password" id="password" placeholder="enter password" />
				</div>

				<button type="submit" className="bg-black text-white p-2">
					Sign Up
				</button>
			</form>
		</main>
	);
}
