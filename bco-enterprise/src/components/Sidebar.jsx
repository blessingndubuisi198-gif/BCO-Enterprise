import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <h2 className="logo">
        BCO Admin
      </h2>

      <ul>

        <li>
          <Link to="/admin">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/products">
            Products
          </Link>
        </li>

        <li>
          <Link to="/admin/category">
            Category
          </Link>
        </li>

        <li>
          <Link to="/admin/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/admin/customers">
            Customers
          </Link>
        </li>

        <li>
          <Link to="/admin/revenue">
            Revenue
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;