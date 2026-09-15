import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        "http://localhost:5000/api/users"
      );

      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
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

            <h1>Customers</h1>

            <p>
              View and manage registered customers.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchCustomers}
          >
            Refresh Customers
          </button>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="admin-message">
            Loading customers...
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
          customers.length === 0 && (
            <div className="admin-message">

              <h2>No customers yet</h2>

              <p>
                Registered customers will appear here.
              </p>

            </div>
          )}

        {/* CUSTOMERS */}
        {!loading &&
          !error &&
          customers.length > 0 && (

            <div className="customers-table-wrapper">

              <table className="customers-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Account Type</th>
                    <th>Joined</th>
                  </tr>
                </thead>

                <tbody>

                  {customers.map((customer, index) => (

                    <tr key={customer._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <div className="customer-name">
                          <div className="customer-avatar">
                            {customer.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {customer.name}
                          </strong>
                        </div>
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>

                        <span
                          className={
                            customer.isAdmin
                              ? "account-badge admin"
                              : "account-badge customer"
                          }
                        >
                          {customer.isAdmin
                            ? "Admin"
                            : "Customer"}
                        </span>

                      </td>

                      <td>
                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </main>

    </div>
  );
}

export default Customers;