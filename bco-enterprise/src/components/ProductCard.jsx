import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const getImageUrl = (image) => {
    if (!image) return "";

    // If the database already contains a full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Remove /uploads/ if it is already included
    const cleanImage = image
      .replace(/^\/uploads\//, "")
      .replace(/^uploads\//, "");

    return `http://localhost:5000/uploads/${cleanImage}`;
  };

  const imageUrl = getImageUrl(product.image);

  console.log("Product:", product.name);
  console.log("Image value:", product.image);
  console.log("Image URL:", imageUrl);

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              console.error(
                "PRODUCT IMAGE FAILED:",
                imageUrl
              );
            }}
          />
        ) : (
          <span>No image</span>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <p className="product-price">
          ₦{Number(product.price || 0).toLocaleString()}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => {
            addToCart(product);
            alert("Added to Cart!");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;