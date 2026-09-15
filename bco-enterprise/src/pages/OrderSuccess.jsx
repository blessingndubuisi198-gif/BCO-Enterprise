import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    reference = "BCO-" + Date.now(),
    paymentMethod = "Payment",
    total = 0,
  } = location.state || {};

  return (
    <div className="order-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h1>
          Thank you for your order!
        </h1>

        <p className="success-message">
          Your order has been received successfully.
          We will begin processing it shortly.
        </p>

        <div className="success-details">

          <div>
            <span>Order Reference</span>
            <strong>{reference}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{paymentMethod}</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>
              ₦{Number(total).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Order Status</span>
            <strong className="status">
              Processing
            </strong>
          </div>

        </div>

        <div className="success-actions">

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;