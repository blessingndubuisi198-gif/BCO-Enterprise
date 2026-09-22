import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Sidebar from "../components/Sidebar";
import "../styles/Category.css";

function Category() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products`
        );

        setProducts(data);
      } catch (err) {
        console.error(
          "Error fetching categories:",
          err
        );

        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by category
  const categoryData = products.reduce(
    (acc, product) => {
      const category = product.category;

      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = {
          name: category,
          products: 0,
          stock: 0,
        };
      }

      acc[category].products += 1;

      acc[category].stock += Number(
        product.stock || 0
      );

      return acc;
    },
    {}
  );

  const categories = Object.values(categoryData);

  return (
    <div className="admin-category-page">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="admin-category-content">

        {/* HEADER */}

        <div className="admin-category-header">

          <div>

            <p className="admin-category-label">
              BCO ENTERPRISE
            </p>

            <h1>Categories</h1>

            <p>
              Organise and monitor your product
              categories.
            </p>

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="admin-category-message">
            Loading categories...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="admin-category-message admin-category-error">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          categories.length === 0 && (

            <div className="admin-category-message">

              <h2>
                No categories yet
              </h2>

              <p>
                Categories will appear once
                products have been added.
              </p>

            </div>

          )}

        {/* CATEGORY CARDS */}

        {!loading &&
          !error &&
          categories.length > 0 && (

            <div className="admin-category-grid">

              {categories.map((category) => (

                <div
                  className="admin-category-card"
                  key={category.name}
                >

                  {/* ICON */}

                  <div className="admin-category-icon">
                    {category.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  {/* CATEGORY INFORMATION */}

                  <div className="admin-category-info">

                    <h2>
                      {category.name}
                    </h2>

                    <p>
                      {category.products}{" "}
                      {category.products === 1
                        ? "product"
                        : "products"}
                    </p>

                  </div>

                  {/* STOCK */}

                  <div className="admin-category-stock">

                    <span>
                      Stock
                    </span>

                    <strong>
                      {category.stock}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default Category;