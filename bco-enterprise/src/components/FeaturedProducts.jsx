import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/FeaturedProducts.css";
import { getProducts } from "../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        console.log("FEATURED PRODUCTS:", data);

        // Show only the first 8 products
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="featured-products">

      <div className="featured-header">
        <div>
          <span className="section-label">
            OUR COLLECTION
          </span>

          <h2>Featured Products</h2>

          <p>
            Discover some of our most popular
            products, carefully selected for you.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="featured-empty">
          Loading products...
        </p>
      ) : (
        <div className="featured-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default FeaturedProducts;