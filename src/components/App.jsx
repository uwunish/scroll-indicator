import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [scrollPercentage, setScrollPercentage] = useState();

	async function handleFetch() {
		try {
			setLoading(true);
			const response = await fetch(
				"https://dummyjson.com/products?limit=100"
			);

			let data = await response.json();
			data = data.products;
			console.log(data);
			if (data && data.length) {
				setProducts(data);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		handleFetch();
	}, []);

	function handleScroll() {
		console.log(
			document.body.scrollTop,
			document.documentElement.scrollTop,
			document.documentElement.scrollHeight,
			document.documentElement.clientHeight
		);

		const howMuchScrolled =
			document.body.scrollTop || document.documentElement.scrollTop;

		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;

		setScrollPercentage((howMuchScrolled / height) * 100);
	}

	console.log(scrollPercentage);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			handleScroll();
		});
	}, []);

	if (loading) {
		return <div>Loading... Please Wait</div>;
	}

	return (
		<div className="app-container">
			<div className="header">
				<h1>Scroll Indicator</h1>
				<div
					style={{
						width: `${scrollPercentage}%`,
					}}
					className="progress-bar-container"></div>
			</div>
			<div className="main-container">
				{products && products.length
					? products.map((item) => <ProductItem item={item} />)
					: null}
			</div>
		</div>
	);
}

export default App;
