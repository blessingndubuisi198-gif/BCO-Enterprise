import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import API_BASE_URL from "../config/api";
import "../styles/Revenue.css";

function Revenue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRevenue = async () => {
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
      console.error("Error fetching revenue:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load revenue."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const paidOrders = orders.filter(
    (order) => order.isPaid
  );

  const totalRevenue = paidOrders.reduce(
    (sum, order) =>
      sum + Number(order.totalPrice || 0),
    0
  );

  const totalOrders = orders.length;

  const averageOrderValue =
    paidOrders.length > 0
      ? totalRevenue / paidOrders.length
      : 0;

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

            <h1>Revenue</h1>

            <p>
              Track your business revenue and sales
              performance.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchRevenue}
          >
            Refresh Revenue
          </button>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="admin-message">
            Loading revenue...
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="admin-message error-message">
            {error}
          </div>
        )}


        {/* REVENUE CONTENT */}

        {!loading && !error && (

          <>

            {/* STAT CARDS */}

            <div className="revenue-stats">

              <div className="revenue-card">

                <span className="revenue-card-label">
                  Total Revenue
                </span>

                <h2>
                  ₦{totalRevenue.toLocaleString()}
                </h2>

                <p>
                  From paid orders
                </p>

              </div>


              <div className="revenue-card">

                <span className="revenue-card-label">
                  Total Orders
                </span>

                <h2>
                  {totalOrders}
                </h2>

                <p>
                  Orders received
                </p>

              </div>


              <div className="revenue-card">

                <span className="revenue-card-label">
                  Paid Orders
                </span>

                <h2>
                  {paidOrders.length}
                </h2>

                <p>
                  Successfully paid
                </p>

              </div>


              <div className="revenue-card">

                <span className="revenue-card-label">
                  Average Order
                </span>

                <h2>
                  ₦{averageOrderValue.toLocaleString()}
                </h2>

                <p>
                  Per paid order
                </p>

              </div>

            </div>


            {/* EMPTY STATE */}

            {orders.length === 0 && (

              <div className="admin-message revenue-empty">

                <div className="revenue-empty-icon">
                  ₦
                </div>

                <h2>
                  No revenue yet
                </h2>

                <p>
                  Revenue statistics will appear here
                  when customers start placing orders.
                </p>

              </div>

            )}


            {/* RECENT PAID ORDERS */}

            {paidOrders.length > 0 && (

              <div className="revenue-orders">

                <div className="revenue-section-header">

                  <div>
                    <h2>
                      Recent Paid Orders
                    </h2>

                    <p>
                      Latest successful payments.
                    </p>
                  </div>

                </div>


                <div className="revenue-order-list">

                  {paidOrders
                    .slice()
                    .reverse()
                    .slice(0, 10)
                    .map((order) => (

                      <div
                        className="revenue-order"
                        key={order._id}
                      >

                        <div>

                          <span>
                            Order
                          </span>

                          <strong>
                            #{order._id}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Date
                          </span>

                          <strong>
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Payment
                          </span>

                          <strong className="paid">
                            Paid
                          </strong>

                        </div>


                        <div>

                          <span>
                            Amount
                          </span>

                          <strong>
                            ₦
                            {Number(
                              order.totalPrice || 0
                            ).toLocaleString()}
                          </strong>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

            )}

          </>

        )}

      </main>

    </div>
  );
}

export default Revenue;