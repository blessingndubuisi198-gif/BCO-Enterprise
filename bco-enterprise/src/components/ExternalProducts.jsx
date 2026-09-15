import { useEffect, useState } from "react";
import { getExternalProducts } from "../services/externalProductService";
import "../styles/ExternalProducts.css";

function ExternalProducts({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getExternalProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "External products error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /*
    Our externalProductService already converts
    the DummyJSON categories into BCO categories.

    So we simply check product.category.
  */

  const filteredProducts =
    category.toLowerCase() === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            category.toLowerCase()
        );

  if (loading) {
    return (
      <section className="external-products">
        <p className="external-loading">
          Loading products...
        </p>
      </section>
    );
  }

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="external-products">

      {/* HEADER */}

      <div className="external-products-header">

        <p>
          MORE FROM BCO
        </p>

        <h2>
          {category.toLowerCase() === "all"
            ? "Explore More Products"
            : `${category} Collection`}
        </h2>

      </div>

      {/* PRODUCTS */}

      <div className="external-products-grid">

        {filteredProducts
          .slice(0, 8)
          .map((product) => (

            <div
              className="external-product-card"
              key={product._id}
            >

              {/* IMAGE */}

              <div className="external-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

              </div>

              {/* PRODUCT INFO */}

              <div className="external-product-info">

                <span>
                  {product.category}
                </span>

                <h3>
                  {product.name}
                </h3>

                <strong>
                  ₦
                  {Number(
                    product.price
                  ).toLocaleString()}
                </strong>

              </div>

            </div>

          ))}

      </div>

    </section>
  );
}

export default ExternalProducts;