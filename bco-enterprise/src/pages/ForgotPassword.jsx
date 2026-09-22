import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ForgotPassword.css";
import API_BASE_URL from "../config/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE_URL}/api/users/forgot-password`,
        { email }
      );

      setMessage(
        "If an account exists with this email, a password reset link will be sent."
      );

      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to process your request."
      );
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-icon">
          🔐
        </div>

        <p className="forgot-label">
          PASSWORD RECOVERY
        </p>

        <h1>Forgot Password?</h1>

        <p className="forgot-text">
          Enter the email address associated with your
          account and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        {message && (
          <p className="forgot-message">
            {message}
          </p>
        )}

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;