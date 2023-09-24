import { useState } from "react";
import Loading from "../../utils/Loading";

import "./HomeComponentStyle.css";
import PaymentChart from "../../chart/PaymentChart";

const HomeComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const images = [
		"https://source.unsplash.com/1500x1000/?money",
		"https://source.unsplash.com/1500x1000/?dollar-exchange",
		"https://source.unsplash.com/1500x1000/?stock-exchange",
		"https://source.unsplash.com/1500x1000/?euro",
	];
	return (
		<section className="home-page">
			{loading ? (
				<div className="loading">
					<Loading />
					{setLoading(false)}
				</div>
			) : error ? (
				<div className="alert alert-danger text-center">
					<h5>{setError(error.message)}</h5>
				</div>
			) : (
				<>
					<div className="money-carousel-container">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									{/* Start of Carousel */}

									<div
										id="carouselExampleIndicators"
										className="carousel slide"
										data-bs-ride="carousel"
									>
										<div className="carousel-indicators">
											{images.map((image, index) => (
												<button
													key={index}
													type="button"
													data-bs-target="#carouselExampleIndicators"
													data-bs-slide-to={index}
													className={index === 0 ? "active" : ""}
													aria-current={index === 0 ? "true" : "false"}
													aria-label={`Slide ${index + 1}`}
												></button>
											))}
										</div>
										<div className="carousel-inner">
											{images.map((image, index) => (
												<div
													key={index}
													className={`carousel-item ${
														index === 0 ? "active" : ""
													}`}
												>
													<img
														src={image}
														className="d-block w-100"
														alt={`Slide ${index + 1}`}
													/>
												</div>
											))}
										</div>
										<button
											className="carousel-control-prev"
											type="button"
											data-bs-target="#carouselExampleIndicators"
											data-bs-slide="prev"
										>
											<span
												className="carousel-control-prev-icon"
												aria-hidden="true"
											></span>
											<span className="visually-hidden">Previous</span>
										</button>
										<button
											className="carousel-control-next"
											type="button"
											data-bs-target="#carouselExampleIndicators"
											data-bs-slide="next"
										>
											<span
												className="carousel-control-next-icon"
												aria-hidden="true"
											></span>
											<span className="visually-hidden">Next</span>
										</button>
									</div>
									{/* End of Carousel */}
								</div>
							</div>
						</div>
					</div>
					<hr />
				</>
			)}

			{/* money */}

			<div className="container mt-4">
				<div className="row">
					{/* Card 1 */}
					<div className="col-md-3 mb-4">
						<div className="card">
							<img src={images[3]} alt="Card Image" className="card-img-top" />
							<div className="card-body">
								<h4 className="card-title">Currency Conversion Made Easy</h4>
								<p className="card-text">
									Explore hassle-free currency exchange services that provide
									real-time rates and user-friendly tools for travelers and
									businesses alike. Say goodbye to complex calculations and
									hello to seamless money exchange.{" "}
								</p>
							</div>
						</div>
					</div>
					{/* Card 2 */}
					<div className="col-md-3 mb-4">
						<div className="card">
							<img src={images[1]} alt="Card Image" className="card-img-top" />

							<div className="card-body">
								<h4 className="card-title">
									Foreign Exchange for International Commerce
								</h4>
								<p className="card-text">
									Unlock global business opportunities with our international
									currency exchange solutions. Simplify cross-border
									transactions, protect against currency risks, and optimize
									your profit margins.
								</p>
							</div>
						</div>
					</div>
					{/* Card 3 */}
					<div className="col-md-3 mb-4">
						<div className="card">
							<img src={images[2]} alt="Card Image" className="card-img-top" />

							<div className="card-body">
								<h4 className="card-title">
									Travel Smart: Get More Bang for Your Buck
								</h4>
								<p className="card-text">
									Planning your next vacation? Discover tips and tricks for
									maximizing your travel budget. Learn about favorable exchange
									rates, travel cards, and currency exchange options to make the
									most of your overseas adventures.{" "}
								</p>
							</div>
						</div>
					</div>
					{/* Card 4 */}
					<div className="col-md-3 mb-4">
						<div className="card">
							<img src={images[0]} alt="Card Image" className="card-img-top" />

							<div className="card-body">
								<h4 className="card-title">Investing in the Digital Age</h4>
								<p className="card-text">
									Dive into the world of digital assets and blockchain
									technology. Explore the potential of cryptocurrencies as an
									investment vehicle and discover how to buy, trade, and secure
									your digital wealth. Join the financial revolution today!{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeComponent;
