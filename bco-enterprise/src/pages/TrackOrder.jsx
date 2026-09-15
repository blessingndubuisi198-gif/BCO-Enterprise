import { useState } from "react";
import axios from "axios";
import "../styles/TrackOrder.css";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackHandler = async (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter your order ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${orderId.trim()}`
      );

      setOrder(data);
    } catch (err) {
      console.error("Track order error:", err);

      setError(
        err.response?.data?.message ||
          "Order not found. Please check your order ID."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="track-order-page">

      {/* HERO */}

      <section className="track-order-hero">

        <div className="track-order-hero-content">

          <p className="track-order-label">
            BCO ENTERPRISE
          </p>

          <h1>
            Track Your Order
          </h1>

          <p>
            Enter your order ID below to check the
            current status of your order.
          </p>

        </div>

      </section>


      {/* TRACKING SECTION */}

      <section className="track-order-content">

        <div className="track-order-container">

          <div className="track-order-box">

            <h2>
              Order Tracking
            </h2>

            <p>
              Enter the order ID you received after
              placing your order.
            </p>


            <form onSubmit={trackHandler}>

              <input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) =>
                  setOrderId(e.target.value)
                }
              />

              <button type="submit">
                {loading
                  ? "Checking..."
                  : "Track Order"}
              </button>

            </form>


            {/* ERROR */}

            {error && (
              <div className="track-error">
                {error}
              </div>
            )}


            {/* ORDER RESULT */}

            {order && (

              <div className="track-result">

                <div className="track-result-header">

                  <div>

                    <span>
                      Order ID
                    </span>

                    <strong>
                      #{order._id}
                    </strong>

                  </div>

                  <span
                    className={
                      order.isDelivered
                        ? "track-status delivered"
                        : "track-status processing"
                    }
                  >
                    {order.isDelivered
                      ? "Delivered"
                      : "Processing"}
                  </span>

                </div>


                <div className="track-details">

                  <div>
                    <span>
                      Payment
                    </span>

                    <strong
                      className={
                        order.isPaid
                          ? "paid"
                          : "pending"
                      }
                    >
                      {order.isPaid
                        ? "Paid"
                        : "Pending"}
                    </strong>
                  </div>


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


                {/* ITEMS */}

                {order.orderItems?.length > 0 && (

                  <div className="track-items">

                    <h3>
                      Items in this order
                    </h3>

                    {order.orderItems.map(
                      (item, index) => (

                        <div
                          className="track-item"
                          key={
                            item.product ||
                            index
                          }
                        >

                          <div>

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
                                item.price || 0
                              ) *
                              Number(
                                item.quantity || 0
                              )
                            ).toLocaleString()}
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            )}

          </div>


          {/* HELP */}

          <div className="track-help">

            <h3>
              Can't find your order?
            </h3>

            <p>
              Make sure you entered the correct order
              ID. If you still need help, contact BCO
              Enterprise support.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default TrackOrder;