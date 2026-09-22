import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">

      <div className="cart-container">

        <div className="cart-header">
          <span>YOUR SHOPPING CART</span>
          <h1>Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <button
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="cart-layout">

            {/* CART ITEMS */}

            <div className="cart-items">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="cart-item"
                >

                  <div className="cart-item-image">
                    <img
                      src={`${API_BASE_URL}${item.image}`}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-item-info">

                    <p className="cart-category">
                      {item.category}
                    </p>

                    <h3>{item.name}</h3>

                    <p className="cart-price">
                      ₦{item.price.toLocaleString()}
                    </p>

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* ORDER SUMMARY */}

            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>
                  {cart.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ₦{total.toLocaleString()}
                </span>
              </div>

              <div className="summary-line"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  ₦{total.toLocaleString()}
                </strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout
              </button>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate("/products")
                }
              >
                Continue Shopping
              </button>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default Cart;