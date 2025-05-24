import { Link } from "react-router-dom";
import "./FooterStyle.css";
const FooterComponent = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4">
      {/* Top Section - Social Media */}
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="mb-0 text-white">LET'S STAY CONNECTED</h5>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="social-icons">
              <Link to="#" className="text-white me-3">
                <i className="fa fa-facebook-f fa-lg" />
              </Link>
              <Link to="#" className="text-white me-3">
                <i className="fa fa-twitter fa-lg" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/mahmoudaosman/"
                className="text-white me-3"
              >
                <i className="fa fa-linkedin fa-lg" />
              </Link>
              <Link to="/#" className="text-white">
                <i className="fa fa-github fa-lg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4 text-white">
              <i className="fa fa-gem me-2 text-white" />
              TRI-PAYMENT SYSTEMS, INC.
            </h5>
            <p className="text-white-50">
              Mahmoud Osman, a seasoned software engineer with extensive
              experience in the field, has spearheaded the development of this
              project.
            </p>
          </div>

          {/* Products */}
          <div className="col-lg-2 col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4 text-white">Products</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="text-white-50">
                  Spring Boot
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-white-50">
                  React
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-white-50">
                  JPA
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white-50">
                  SQL
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4 text-white">
              Useful Links
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="text-white-50">
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-white-50">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white-50">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-uppercase fw-bold mb-4 text-white">Contact</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="fa fa-home me-2 text-white" /> Minnesota, MN
                10012, US
              </li>
              <li className="mb-2">
                <i className="fa fa-envelope me-2 text-white" />{" "}
                tri-payment@suport.com
              </li>
              <li className="mb-2">
                <i className="fa fa-phone me-2 text-white" /> + 01 234 567 88
              </li>
              <li>
                <i className="fa fa-print me-2 text-white" /> + 01 234 567 89
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3 bg-black mt-4 border-top border-secondary">
        <small className="text-white-50">
          &copy; {new Date().getFullYear()} TRI-PAYMENT SYSTEMS, INC. All rights
          reserved. Created by{" "}
          <Link
            to="http://www.mahmoudosman.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Mahmoud Osman
          </Link>
        </small>
      </div>
    </footer>
  );
};

export default FooterComponent;
