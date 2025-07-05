import { useLocation } from "react-router-dom";
import PaymentComponent from "../components/PaymentComponent";

export default function ProductDetails() {
	const { state } = useLocation();
	const product = state?.product;
	const order = {};

	if (!product) {
		return (
			<main>
				<div className="flex w-fit justify-center rounded-lg bg-red-600 p-2 gap-2 text-white">
					<h1>Product not found</h1>
				</div>
			</main>
		);
	}

	return (
		<main className="flex justify-center items-center h-screen p-2 gap-2">
			<div className="flex max-w-[400px] flex-col justify-center rounded-lg bg-slate-400 p-2 gap-2">
				<img className="w-full max-h-[200px] object-cover" src={product?.images[0]} alt="" />

				<h1>{product.name}</h1>

				<p>{product.description}</p>

				<p>{product.price}</p>

				<button className="bg-blue-500 text-white">Buy Now</button>
			</div>

			<PaymentComponent />
		</main>
	);
}
