import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
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

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const [productsResponse, customersResponse, ordersResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:5000/api/products",
            config
          ),

          axios.get(
            "http://localhost:5000/api/users",
            config
          ),

          axios.get(
            "http://localhost:5000/api/orders",
            config
          ),
        ]);

      setProducts(productsResponse.data);
      setCustomers(customersResponse.data);
      setOrders(ordersResponse.data);

    } catch (err) {
      console.error(
        "Error loading dashboard:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);


  // Revenue from paid orders
  const paidOrders = orders.filter(
    (order) => order.isPaid
  );

  const totalRevenue = paidOrders.reduce(
    (sum, order) =>
      sum + Number(order.totalPrice || 0),
    0
  );


  // Recent orders
  const recentOrders = orders
    .slice()
    .reverse()
    .slice(0, 5);


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
              Admin Dashboard
            </h1>

            <p>
              Overview of your store and business
              activity.
            </p>

          </div>


          <button
            className="dashboard-refresh-btn"
            onClick={fetchDashboardData}
          >
            Refresh Dashboard
          </button>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="admin-message">
            Loading dashboard...
          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="admin-message error-message">
            {error}
          </div>

        )}


        {/* DASHBOARD */}

        {!loading && !error && (

          <>

            {/* STAT CARDS */}

            <div className="dashboard-stats">

              {/* REVENUE */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <span>
                    Total Revenue
                  </span>

                  <div className="dashboard-icon revenue-icon">
                    ₦
                  </div>

                </div>

                <h2>
                  ₦{totalRevenue.toLocaleString()}
                </h2>

                <p>
                  From paid orders
                </p>

              </div>


              {/* ORDERS */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <span>
                    Total Orders
                  </span>

                  <div className="dashboard-icon order-icon">
                    #
                  </div>

                </div>

                <h2>
                  {orders.length}
                </h2>

                <p>
                  Orders received
                </p>

              </div>


              {/* CUSTOMERS */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <span>
                    Customers
                  </span>

                  <div className="dashboard-icon customer-icon">
                    C
                  </div>

                </div>

                <h2>
                  {customers.length}
                </h2>

                <p>
                  Registered users
                </p>

              </div>


              {/* PRODUCTS */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <span>
                    Products
                  </span>

                  <div className="dashboard-icon product-icon">
                    P
                  </div>

                </div>

                <h2>
                  {products.length}
                </h2>

                <p>
                  Products in store
                </p>

              </div>

            </div>


            {/* OVERVIEW SECTION */}

            <div className="dashboard-grid">

              {/* RECENT ORDERS */}

              <div className="dashboard-section">

                <div className="dashboard-section-header">

                  <div>

                    <h2>
                      Recent Orders
                    </h2>

                    <p>
                      Latest customer orders.
                    </p>

                  </div>

                </div>


                {recentOrders.length === 0 ? (

                  <div className="dashboard-empty">

                    <h3>
                      No orders yet
                    </h3>

                    <p>
                      Customer orders will appear
                      here once they place an order.
                    </p>

                  </div>

                ) : (

                  <div className="recent-orders-list">

                    {recentOrders.map((order) => (

                      <div
                        className="recent-order"
                        key={order._id}
                      >

                        <div>

                          <span>
                            Order
                          </span>

                          <strong>
                            #{order._id.slice(-6)}
                          </strong>

                        </div>


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
                            Amount
                          </span>

                          <strong>
                            ₦
                            {Number(
                              order.totalPrice || 0
                            ).toLocaleString()}
                          </strong>

                        </div>


                        <span
                          className={`dashboard-status ${
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

                    ))}

                  </div>

                )}

              </div>


              {/* STORE OVERVIEW */}

              <div className="dashboard-section">

                <div className="dashboard-section-header">

                  <div>

                    <h2>
                      Store Overview
                    </h2>

                    <p>
                      Current store statistics.
                    </p>

                  </div>

                </div>


                <div className="store-overview">

                  <div className="overview-row">

                    <span>
                      Products
                    </span>

                    <strong>
                      {products.length}
                    </strong>

                  </div>


                  <div className="overview-row">

                    <span>
                      Customers
                    </span>

                    <strong>
                      {customers.length}
                    </strong>

                  </div>


                  <div className="overview-row">

                    <span>
                      Orders
                    </span>

                    <strong>
                      {orders.length}
                    </strong>

                  </div>


                  <div className="overview-row">

                    <span>
                      Paid Orders
                    </span>

                    <strong>
                      {paidOrders.length}
                    </strong>

                  </div>


                  <div className="overview-row total-row">

                    <span>
                      Revenue
                    </span>

                    <strong>
                      ₦{totalRevenue.toLocaleString()}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default AdminDashboard;