import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "../styles/MyOrders.css";

function MyOrders() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        if (!userInfo?.token) {
          navigate("/login");
          return;
        }

        const { data } = await axios.get(
          `${API_BASE_URL}/api/orders/myorders`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (err) {
        console.error(
          "Error fetching orders:",
          err
        );

        if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-message">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-message error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        <div className="orders-header">
          <div>
            <p className="orders-label">
              BCO ENTERPRISE
            </p>

            <h1>My Orders</h1>

            <p>
              View and track your recent orders.
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">

            <div className="empty-orders-icon">
              🛍️
            </div>

            <h2>No orders yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() =>
                navigate("/products")
              }
            >
              Start Shopping
            </button>

          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                <div className="order-card-header">

                  <div>
                    <span>
                      Order Reference
                    </span>

                    <strong>
                      {order._id}
                    </strong>
                  </div>

                  <span
                    className={`order-status ${
                      order.isDelivered
                        ? "delivered"
                        : "processing"
                    }`}
                  >
                    {order.isDelivered
                      ? "Delivered"
                      : "Processing"}
                  </span>

                </div>

                <div className="order-items">

                  {order.orderItems?.map(
                    (item, index) => (
                      <div
                        className="order-item"
                        key={
                          item.product ||
                          index
                        }
                      >

                        <img
                          src={
                            item.image?.startsWith(
                              "http"
                            )
                              ? item.image
                              : `${API_BASE_URL}${item.image}`
                          }
                          alt={item.name}
                        />

                        <div>
                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            Quantity:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <strong>
                          ₦
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </strong>

                      </div>
                    )
                  )}

                </div>

                <div className="order-card-footer">

                  <div>
                    <span>
                      Payment
                    </span>

                    <strong>
                      {order.paymentMethod}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Total
                    </span>

                    <strong>
                      ₦
                      {Number(
                        order.totalPrice
                      ).toLocaleString()}
                    </strong>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyOrders;