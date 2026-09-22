import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import Paystack from "@paystack/inline-js";
import API_BASE_URL from "../config/api";
import "../styles/Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // CREATE ORDER
  // ==============================

  const createOrder = async (paymentMethod) => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!userInfo?.token) {
      throw new Error(
        "Please login before placing your order."
      );
    }

    await axios.post(
      `${API_BASE_URL}/api/orders`,
      {
        orderItems: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        })),

        shippingAddress: {
          address: formData.address,
          city: "",
          state: "",
          postalCode: "",
          country: "Nigeria",
        },

        paymentMethod,
        totalPrice: total,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
  };

  // ==============================
  // PAYSTACK
  // ==============================

  const startPaystackPayment = () => {
    if (!formData.email) {
      alert("Please enter your email address.");
      setLoading(false);
      return;
    }

    const publicKey =
      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      alert("Paystack is not configured correctly.");
      setLoading(false);
      return;
    }

    try {
      const paystack = new Paystack();

      paystack.newTransaction({
        key: publicKey,
        email: formData.email,
        amount: Math.round(total * 100),
        currency: "NGN",

        onSuccess: async (transaction) => {
          console.log(
            "PAYSTACK SUCCESS:",
            transaction
          );

          try {
            await createOrder("Paystack");

            clearCart();

            navigate("/order-success", {
              state: {
                reference: transaction.reference,
                paymentMethod: "Paystack",
                total: total,
              },
            });
          } catch (error) {
            console.error(
              "ORDER CREATION ERROR:",
              error
            );

            alert(
              "Payment succeeded, but there was a problem creating your order."
            );
          } finally {
            setLoading(false);
          }
        },

        onCancel: () => {
          setLoading(false);
          alert("Payment cancelled.");
        },
      });
    } catch (error) {
      console.error(
        "PAYSTACK ERROR:",
        error
      );

      setLoading(false);

      alert(
        `Paystack error: ${
          error?.message ||
          "Unable to start payment."
        }`
      );
    }
  };

  // ==============================
  // CHECKOUT SUBMIT
  // ==============================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    // DEMO CARD
    if (
      formData.paymentMethod ===
      "Pay with Card (Demo)"
    ) {
      setLoading(false);
      setShowCardModal(true);
      return;
    }

    // PAYSTACK
    if (formData.paymentMethod === "Paystack") {
      startPaystackPayment();
      return;
    }

    // CASH / BANK TRANSFER
    try {
      await createOrder(formData.paymentMethod);
      clearCart();

      navigate("/order-success", {
        state: {
          reference: "BCO-" + Date.now(),
          paymentMethod: formData.paymentMethod,
          total: total,
        },
      });
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.message ===
        "Please login before placing your order."
      ) {
        localStorage.removeItem("userInfo");

        alert(
          "You session has expired. Please sign in again."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.messsage ||
        "Order failed. Please try agin."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DEMO CARD PAYMENT
  // ==============================

  const handleDemoCardPayment = async (e) => {
    e.preventDefault();

    const cleanCardNumber =
      cardData.cardNumber.replace(/\s/g, "");

    if (cleanCardNumber.length !== 16) {
      alert(
        "Please enter a 16-digit demo card number."
      );
      return;
    }

    if (
      !/^\d{2}\/\d{2}$/.test(
        cardData.expiry
      )
    ) {
      alert(
        "Enter expiry date as MM/YY."
      );
      return;
    }

    if (!/^\d{3}$/.test(cardData.cvv)) {
      alert("CVV must contain 3 digits.");
      return;
    }

    if (!cardData.cardName.trim()) {
      alert(
        "Please enter the cardholder name."
      );
      return;
    }

    setLoading(true);

    try {
      // Simulated payment only.
      // No real payment is processed.

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      await createOrder(
        "Card Payment (Demo)"
      );

      clearCart();

      setShowCardModal(false);

      setCardData({
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardName: "",
      });

      navigate("/order-success", {
        state: {
          reference: "BCO-" + Date.now(),
          paymentMethod:
            "Card Payment (Demo)",
          total: total,
        },
      });
    } catch (error) {
      console.error(
        "DEMO PAYMENT ERROR:",
        error
      );

      alert("Demo payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      {/* LEFT SIDE */}

      <div className="checkout-form">

        <h2>Checkout Details</h2>

        <form onSubmit={submitHandler}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">
              Cash on Delivery
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="Pay with Card (Demo)">
              Pay with Card (Demo)
            </option>

            <option value="Paystack">
              Pay with Paystack
            </option>
          </select>

          <button
            type="submit"
            className="checkout-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : formData.paymentMethod ===
                "Paystack"
              ? "Pay with Paystack"
              : formData.paymentMethod ===
                "Pay with Card (Demo)"
              ? "Enter Card Details"
              : "Place Order"}
          </button>

        </form>

      </div>

      {/* RIGHT SIDE */}

      <div className="order-summary">

        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div
            className="summary-item"
            key={item._id}
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₦
              {(
                item.price *
                item.quantity
              ).toLocaleString()}
            </span>
          </div>
        ))}

        <hr />

        <div className="summary-total">
          Total: ₦{total.toLocaleString()}
        </div>

      </div>

      {/* ==============================
          DEMO CARD MODAL
      ============================== */}

      {showCardModal && (
        <div className="card-modal-overlay">

          <div className="card-modal">

            <button
              type="button"
              className="close-card-modal"
              onClick={() =>
                setShowCardModal(false)
              }
            >
              ×
            </button>

            <p className="demo-label">
              DEMO PAYMENT
            </p>

            <h2>Pay with Card</h2>

            <p className="demo-description">
              This is a simulated card payment.
              No real money will be charged.
            </p>

            <form
              onSubmit={
                handleDemoCardPayment
              }
            >

              <label>
                Cardholder Name
              </label>

              <input
                type="text"
                name="cardName"
                placeholder="Demo Customer"
                value={cardData.cardName}
                onChange={handleCardChange}
                autoComplete="off"
                required
              />

              <label>
                Card Number
              </label>

              <input
                type="text"
                name="cardNumber"
                placeholder="1111 1111 1111 1111"
                value={cardData.cardNumber}
                onChange={handleCardChange}
                maxLength="19"
                autoComplete="off"
                required
              />

              <div className="card-row">

                <div>
                  <label>
                    Expiry
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    maxLength="5"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label>
                    CVV
                  </label>

                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    maxLength="3"
                    autoComplete="off"
                    required
                  />
                </div>

              </div>

              <button
                type="submit"
                className="demo-pay-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay ₦${total.toLocaleString()}`}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Checkout;