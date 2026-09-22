import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Sidebar from "../components/Sidebar";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        setError("Please login again.");
        return;
      }

      const { data } = await axios.get(
        `${API_BASE_URL}/api/orders`,
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
        setError(
          "Your session has expired. Please login again."
        );
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to load orders."
      );

    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        setError("Please login again.");
        return;
      }

      setUpdatingOrder(orderId);

      const { data } = await axios.put(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // Update the order immediately on the page
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? data
            : order
        )
      );

    } catch (err) {
      console.error(
        "Error updating order status:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to update order status."
      );

    } finally {
      setUpdatingOrder(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-page">

      <Sidebar />

      <main className="admin-page-content">

        {/* HEADER */}

        <div className="admin-page-header">

          <div>
            <p className="admin-page-label">
              BCO ENTERPRISE
            </p>

            <h1>
              Orders
            </h1>

            <p>
              View and manage customer orders.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchOrders}
          >
            Refresh Orders
          </button>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="admin-message">
            Loading orders...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="admin-message error-message">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="admin-message">

              <h2>
                No orders yet
              </h2>

              <p>
                Customer orders will appear here
                once they place an order.
              </p>

            </div>
          )}

        {/* ORDERS */}

        {!loading &&
          !error &&
          orders.length > 0 && (

            <div className="admin-orders-list">

              {orders
                .slice()
                .reverse()
                .map((order) => (

                  <div
                    className="admin-order-card"
                    key={order._id}
                  >

                    {/* ORDER HEADER */}

                    <div className="admin-order-header">

                      <div>

                        <span>
                          Order Reference
                        </span>

                        <strong>
                          #{order._id}
                        </strong>

                      </div>

                      <div className="admin-status-control">

                        <span
                          className={`admin-order-status ${
                            order.status === "Delivered"
                              ? "delivered"
                              : order.status === "Cancelled"
                              ? "cancelled"
                              : "processing"
                          }`}
                        >
                          {order.status ||
                            "Processing"}
                        </span>

                        <select
                          value={
                            order.status ||
                            "Processing"
                          }
                          onChange={(e) =>
                            updateOrderStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          disabled={
                            updatingOrder ===
                            order._id
                          }
                        >
                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </div>

                    </div>

                    {/* CUSTOMER */}

                    <div className="admin-order-customer">

                      <div>
                        <span>
                          Customer
                        </span>

                        <strong>
                          {order.user?.name ||
                            "Customer"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Email
                        </span>

                        <strong>
                          {order.user?.email ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Payment
                        </span>

                        <strong>
                          {order.paymentMethod ||
                            "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Payment Status
                        </span>

                        <strong
                          className={
                            order.isPaid
                              ? "paid"
                              : "unpaid"
                          }
                        >
                          {order.isPaid
                            ? "Paid"
                            : "Pending"}
                        </strong>
                      </div>

                    </div>

                    {/* ORDER ITEMS */}

                    <div className="admin-order-items">

                      <h3>
                        Order Items
                      </h3>

                      {order.orderItems?.map(
                        (item, index) => (

                          <div
                            className="admin-order-item"
                            key={
                              item.product ||
                              index
                            }
                          >

                            <div className="admin-item-image">

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

                            </div>

                            <div className="admin-item-info">

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                Quantity:{" "}
                                {item.quantity}
                              </span>

                            </div>

                            <strong>
                              ₦
                              {(
                                Number(
                                  item.price
                                ) *
                                Number(
                                  item.quantity
                                )
                              ).toLocaleString()}
                            </strong>

                          </div>

                        )
                      )}

                    </div>

                    {/* FOOTER */}

                    <div className="admin-order-footer">

                      <div>
                        <span>
                          Total Amount
                        </span>

                        <strong>
                          ₦
                          {Number(
                            order.totalPrice || 0
                          ).toLocaleString()}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Order Date
                        </span>

                        <strong>
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </strong>
                      </div>

                    </div>

                  </div>

                ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default Orders;