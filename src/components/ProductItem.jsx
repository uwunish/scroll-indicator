import React from "react";

function ProductItem({ item }) {
	return (
		<p key={item.id} className="item-container">
			{item.title}
		</p>
	);
}

export default ProductItem;
