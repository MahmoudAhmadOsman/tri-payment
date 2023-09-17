import React from "react";
import { useParams } from "react-router-dom";

const EditPayment = () => {
	const { id } = useParams();

	return (
		<div className="container">
			<h1>Edit Payment</h1> <hr />
			<h3> {id}</h3>
			<p className="lead">Coming Soon...</p>
		</div>
	);
};

export default EditPayment;
