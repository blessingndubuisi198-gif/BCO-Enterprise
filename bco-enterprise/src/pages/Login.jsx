import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaShieldAlt,
  FaTruck,
  FaStar,
} from "react-icons/fa";

import loginBackground from "../assets/images/login-background.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setEmail("");
      setPassword("");
      setShowPassword("");

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Lgin Failed"
      );
    }
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >

      {/* DARK OVERLAY */}
      <div className="page-overlay"></div>

      {/* LEFT SIDE */}
      <div className="login-brand">

        <div className="brand-content">

          <div className="brand-logo">
            <h1>BCO</h1>
            <span>Enterprise</span>
          </div>

          <div className="brand-text">

            <p className="brand-small">
              YOUR TRUSTED MARKETPLACE
            </p>

            <h2>
              Solar. Fashion.
              <br />
              Variety.
            </h2>

            <p>
              Everything you need,
              <br />
              all in one place.
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-content">

        <div className="login-card">

          <div className="login-icon">
            <FaUser />
          </div>

          <p className="login-label">
            CUSTOMER LOGIN
          </p>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Shop smarter. Live better.
          </p>

          <form onSubmit={handleSubmit}
          autoComplete="on">

            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <FaUser className="input-icon" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="username"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <FaLock className="input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-password">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
            >
              Login to Your Account
            </button>

          </form>

          {/* DIVIDER */}
          <div className="login-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="social-buttons">

            <button
              type="button"
              className="social-btn"
            >
              <FaGoogle />
              Google
            </button>

            <button
              type="button"
              className="social-btn"
            >
              <FaFacebookF />
              Facebook
            </button>

          </div>

          {/* REGISTER */}
          <p className="register-text">
            Don't have an account?

            <Link to="/register">
              Create one
            </Link>
          </p>

        </div>

        {/* BENEFITS */}
        <div className="login-benefits">

          <div>
            <FaStar />
            <span>Quality Products</span>
          </div>

          <div>
            <FaShieldAlt />
            <span>Secure Shopping</span>
          </div>

          <div>
            <FaTruck />
            <span>Reliable Delivery</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;