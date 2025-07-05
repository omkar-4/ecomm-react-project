import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServerUrl } from "../utils/useServerUrl";

export default function Home() {
	const [products, setProducts] = useState([]);
	console.log("products :", products);

	const navigate = useNavigate();

	const getProducts = () => {
		axios
			.get(`${useServerUrl}/user/products`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => setProducts(res.data.products))
			.catch((err) => console.error("Error getting products :", err));
	};

	useEffect(() => {
		getProducts();
	}, []);

	// using ? in products? prevents entire Home component from crashing
	return (
		<main>
			<div className="container flex flex-wrap gap-4">
				<h2 className="text-2xl">Products :</h2>

				{products?.map((product) => {
					<div
						className="p-2 rounded-md bg-slate-300 max-w-[300px] w-full flex flex-col gap-2 items-center"
						key={product._id}
						onClick={() =>
							navigate("/product-details", {
								state: { product },
							})
						}
					>
						<img src={product.images[0]} alt="" className="max-h-[200px] w-full object-cover aspect-square" />
						<h1>{product.name}</h1>
						<p>{product.description}</p>
						<p>{product.price}</p>
					</div>;
				})}
			</div>

			{/* <PaymentComponent /> */}
		</main>
	);
}
