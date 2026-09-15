
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem("userInfo");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("userInfo");

    setUserInfo(null);

    alert("You have been logged out.");

    navigate("/login");
  };

  return (
    <nav>

      {/* LOGO */}
      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        <h2>BCO</h2>
        <p>Enterprise</p>
      </div>

      {/* NAVIGATION */}
      <ul className="nav-links">

        <li onClick={() => navigate("/")}>
          Home
        </li>

        <li
          onClick={() =>
            navigate("/products?category=Solar")
          }
        >
          Solar
        </li>

        <li
          onClick={() =>
            navigate("/products?category=Fashion")
          }
        >
          Fashion
        </li>

        <li
          onClick={() => navigate("/products")}
        >
          Categories
        </li>

        <li
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>

      </ul>

      {/* ICONS */}
      <div className="nav-icons">

        {/* SEARCH */}
        <FaSearch
          title="Search Products"
          onClick={() =>
            navigate("/products")
          }
        />

        {/* CART */}
        <FaShoppingCart
          title="Cart"
          onClick={() =>
            navigate("/cart")
          }
        />

        {/* USER / ADMIN / LOGOUT */}
        {userInfo ? (
          <div className="user-menu">

            {/* USER ORDERS */}
            <FaUser
              title={
                userInfo.name ||
                userInfo.email ||
                "Account"
              }
              onClick={() =>
                navigate("/orders")
              }
            />

            {/* ADMIN DASHBOARD */}
            {userInfo.isAdmin && (
              <FaTachometerAlt
                title="Admin Dashboard"
                onClick={() =>
                  navigate("/admin")
                }
              />
            )}

            {/* LOGOUT */}
            <FaSignOutAlt
              title="Logout"
              onClick={handleLogout}
            />

          </div>
        ) : (
          <FaUser
            title="Sign In"
            onClick={() =>
              navigate("/login")
            }
          />
        )}

      </div>

    </nav>
  );
}

export default Navbar;