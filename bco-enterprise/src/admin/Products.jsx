import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import API_BASE_URL from "../config/api";
import Sidebar from "../components/Sidebar";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products`
        );

        setProducts(data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        alert("Please login again.");
        return;
      }

      await axios.delete(
        `${API_BASE_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully!");

    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // Image helper
  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  return (
    <div className="admin-product-page">

      <Sidebar />

      <main className="admin-product-content">

        {/* HEADER */}

        <div className="admin-product-header">

          <div>
            <p className="admin-product-label">
              BCO ENTERPRISE
            </p>

            <h1>Products</h1>

            <p>
              Manage your store catalogue,
              stock and product information.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="admin-product-add-btn"
          >
            + Add Product
          </Link>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="admin-product-message">
            Loading products...
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          products.length === 0 && (
            <div className="admin-product-message">

              <h2>
                No products yet
              </h2>

              <p>
                Add your first product to your
                catalogue.
              </p>

            </div>
          )}

        {/* PRODUCTS */}

        {!loading &&
          products.length > 0 && (

            <div className="admin-product-table-container">

              <table className="admin-product-table">

                <thead>

                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr key={product._id}>

                      {/* IMAGE */}

                      <td>

                        <div className="admin-product-image">

                          {product.image ? (
                            <img
                              src={getImageUrl(
                                product.image
                              )}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <span>
                              No image
                            </span>
                          )}

                        </div>

                      </td>

                      {/* NAME */}

                      <td>

                        <div className="admin-product-name">

                          <strong>
                            {product.name}
                          </strong>

                          {product.description && (
                            <span>
                              {product.description.length >
                              45
                                ? `${product.description.slice(
                                    0,
                                    45
                                  )}...`
                                : product.description}
                            </span>
                          )}

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="admin-product-category">

                          {product.category}

                        </span>

                      </td>

                      {/* PRICE */}

                      <td>

                        <strong className="admin-product-price">

                          ₦
                          {Number(
                            product.price || 0
                          ).toLocaleString()}

                        </strong>

                      </td>

                      {/* STOCK */}

                      <td>

                        <span
                          className={
                            Number(product.stock) > 0
                              ? "admin-product-stock-available"
                              : "admin-product-stock-empty"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="admin-product-actions">

                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="admin-product-edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="admin-product-delete-btn"
                            onClick={() =>
                              deleteHandler(
                                product._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

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

export default Products;