import { useState, useEffect } from "react";
import Loading from "../../utils/Loading";
import "./HomeComponentStyle.css";
import PaymentChart from "../../chart/PaymentChart";

const HomeComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Updated image URLs with more reliable sources and fallbacks
  const images = [
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1642790552873-0a1a1a1a1a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  ];

  // Fallback images in case the primary ones fail
  const fallbackImages = [
    "https://via.placeholder.com/1500x1000/003366/FFFFFF?text=Currency+Exchange",
    "https://via.placeholder.com/1500x1000/006633/FFFFFF?text=Global+Finance",
    "https://via.placeholder.com/1500x1000/660033/FFFFFF?text=Investment",
    "https://via.placeholder.com/1500x1000/336600/FFFFFF?text=Digital+Assets",
  ];

  const features = [
    {
      title: "Currency Conversion Made Easy",
      description:
        "Explore hassle-free currency exchange services that provide real-time rates and user-friendly tools for travelers and businesses alike.",
      icon: "fa-exchange",
    },
    {
      title: "Foreign Exchange for Commerce",
      description:
        "Unlock global business opportunities with our international currency exchange solutions.",
      icon: "fa-globe",
    },
    {
      title: "Travel Smart: Get More Value",
      description:
        "Discover tips for maximizing your travel budget with favorable exchange rates and travel cards.",
      icon: "fa-plane",
    },
    {
      title: "Investing in the Digital Age",
      description:
        "Explore the world of digital assets and blockchain technology for your investments.",
      icon: "fa-bitcoin",
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle image loading errors
  const handleImageError = (e, index) => {
    e.target.onerror = null; // Prevent infinite loop if fallback fails
    e.target.src = fallbackImages[index];
  };

  return (
    <section className="home-page">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Loading />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-5">
          <h5>{error.message}</h5>
        </div>
      ) : (
        <>
          {/* Hero Carousel */}
          <div className="hero-carousel mb-5">
            <div
              id="heroCarousel"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="carousel-inner rounded-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                      onError={(e) => handleImageError(e, index)}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-4">
                      <h2 className="display-5 fw-bold">Financial Solutions</h2>
                      <p className="lead">
                        Tailored services for your money management needs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroCarousel"
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
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="container my-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark">Our Services</h2>
              <p className="lead text-muted">
                Comprehensive financial solutions tailored to your needs
              </p>
            </div>

            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body text-center p-4">
                      <div className="icon-wrapper bg-primary bg-gradient text-white rounded-circle mx-auto mb-3">
                        <i className={`fa ${feature.icon} fa-2x`}></i>
                      </div>
                      <h5 className="card-title fw-bold">{feature.title}</h5>
                      <p className="card-text text-muted">
                        {feature.description}
                      </p>
                      {/* <a href="#!" className="btn btn-outline-primary mt-3">
                        Learn More
                      </a> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-light py-5 my-5">
            <div className="container">
              <div className="row g-4 text-center">
                <div className="col-md-3">
                  <div className="p-3">
                    <h3 className="fw-bold text-primary">10,000+</h3>
                    <p className="text-muted mb-0">Happy Clients</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <h3 className="fw-bold text-primary">150+</h3>
                    <p className="text-muted mb-0">Currencies Supported</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <h3 className="fw-bold text-primary">24/7</h3>
                    <p className="text-muted mb-0">Customer Support</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <h3 className="fw-bold text-primary">99.9%</h3>
                    <p className="text-muted mb-0">Uptime Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="container-fluid my-5">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Payment Statistics</h3>
              </div>
              <div className="card-body">
                <PaymentChart />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HomeComponent;
