import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-section footer-brand">

          <h2>BCO Enterprise</h2>

          <p>
            Powering your home with quality products
            and reliable solar solutions.
          </p>

        </div>


        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products?category=Solar">
                Solar
              </Link>
            </li>

            <li>
              <Link to="/products?category=Fashion">
                Fashion
              </Link>
            </li>

            <li>
              <Link to="/categories">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>

          </ul>

        </div>


        {/* Customer Service */}

        <div className="footer-section">

          <h3>Customer Service</h3>

          <ul>

            <li>
              <Link to="/faqs">
                FAQs
              </Link>
            </li>

            <li>
              <Link to="/shipping">
                Shipping
              </Link>
            </li>

            <li>
              <Link to="/returns">
                Returns
              </Link>
            </li>

            <li>
              <Link to="/payment-methods">
                Payment Methods
              </Link>
            </li>

            <li>
              <Link to="/track-order">
                Track Order
              </Link>
            </li>

          </ul>

        </div>


        {/* Contact */}

        <div className="footer-section">

          <h3>Contact Us</h3>

          <p>
            📞 +234 8039590461
          </p>

          <p>
            📍 Nigeria
          </p>

          <p>
            ✉️ blessingndubuisi198@gmail.com
          </p>

        </div>

      </div>


      {/* Footer Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 BCO Enterprise. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;