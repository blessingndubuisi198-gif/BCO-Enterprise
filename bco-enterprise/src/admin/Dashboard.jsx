import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        if (!userInfo?.token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const [ordersResponse, productsResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:5000/api/orders",
              config
            ),

            axios.get(
              "http://localhost:5000/api/products"
            ),
          ]);

        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);

      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Only count successfully paid orders
  const paidOrders = orders.filter(
    (order) => order.isPaid
  );

  // Calculate real revenue
  const revenue = paidOrders.reduce(
    (total, order) =>
      total + Number(order.totalPrice || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => !order.isDelivered
  );

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="dashboard-content">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>
            <p className="dashboard-label">
              BCO ENTERPRISE
            </p>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage your store and monitor
              your business activity.
            </p>
          </div>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="dashboard-loading">
            Loading dashboard...
          </div>
        ) : (

          <>

            {/* STAT CARDS */}

            <div className="dashboard-stats">

              <div className="stat-card">

                <span>
                  Total Orders
                </span>

                <strong>
                  {orders.length}
                </strong>

                <small>
                  All customer orders
                </small>

              </div>

              <div className="stat-card">

                <span>
                  Paid Orders
                </span>

                <strong>
                  {paidOrders.length}
                </strong>

                <small>
                  Successfully paid
                </small>

              </div>

              <div className="stat-card">

                <span>
                  Revenue
                </span>

                <strong>
                  ₦{revenue.toLocaleString()}
                </strong>

                <small>
                  From paid orders
                </small>

              </div>

              <div className="stat-card">

                <span>
                  Products
                </span>

                <strong>
                  {products.length}
                </strong>

                <small>
                  Products in catalogue
                </small>

              </div>

            </div>

            {/* RECENT ORDERS */}

            <section className="dashboard-section">

              <div className="section-header">

                <div>
                  <p>
                    RECENT ACTIVITY
                  </p>

                  <h2>
                    Recent Orders
                  </h2>
                </div>

              </div>

              {orders.length === 0 ? (

                <div className="empty-dashboard">
                  <h3>
                    No orders yet
                  </h3>

                  <p>
                    Customer orders will appear
                    here once they are placed.
                  </p>
                </div>

              ) : (

                <div className="recent-orders">

                  {orders
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((order) => (

                      <div
                        className="recent-order"
                        key={order._id}
                      >

                        <div>

                          <strong>
                            Order #{order._id.slice(-6)}
                          </strong>

                          <span>
                            {order.paymentMethod ||
                              "Payment"}
                          </span>

                        </div>

                        <div>

                          <strong>
                            ₦
                            {Number(
                              order.totalPrice || 0
                            ).toLocaleString()}
                          </strong>

                          <span
                            className={
                              order.isPaid
                                ? "paid"
                                : "unpaid"
                            }
                          >
                            {order.isPaid
                              ? "Paid"
                              : "Pending Payment"}
                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              )}

            </section>

            {/* ORDER STATUS */}

            <section className="dashboard-section">

              <div className="section-header">

                <div>
                  <p>
                    ORDER STATUS
                  </p>

                  <h2>
                    Orders Requiring Attention
                  </h2>
                </div>

              </div>

              <div className="status-summary">

                <div>
                  <strong>
                    {pendingOrders.length}
                  </strong>

                  <span>
                    Processing / Pending Delivery
                  </span>
                </div>

                <div>
                  <strong>
                    {paidOrders.length}
                  </strong>

                  <span>
                    Successfully Paid
                  </span>
                </div>

              </div>

            </section>

          </>

        )}

      </main>

    </div>
  );
}

export default Dashboard;