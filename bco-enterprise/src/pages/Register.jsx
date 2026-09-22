import "../styles/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import registerBackground from "../assets/images/register-background.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

      console.log(data);

      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${registerBackground})`,
      }}
    >

      <div className="register-card">

        <div className="register-icon">
          <FaUser />
        </div>

        <p className="register-label">
          CREATE YOUR ACCOUNT
        </p>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join BCO Enterprise and start shopping today.
        </p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="register-input-group">

            <label>Full Name</label>

            <div className="register-input-wrapper">

              <FaUser className="register-input-icon" />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="register-input-group">

            <label>Email Address</label>

            <div className="register-input-wrapper">

              <FaEnvelope className="register-input-icon" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="register-input-group">

            <label>Password</label>

            <div className="register-input-wrapper">

              <FaLock className="register-input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="register-eye"
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

          <button
            type="submit"
            className="register-btn"
          >
            Create Account
          </button>

        </form>

        <p className="register-login">
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;