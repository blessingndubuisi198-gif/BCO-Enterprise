import "../styles/PaymentMethods.css";

function PaymentMethods() {
  return (
    <main className="payment-page">

      {/* HERO */}

      <section className="payment-hero">

        <div className="payment-hero-content">

          <p className="payment-label">
            BCO ENTERPRISE
          </p>

          <h1>
            Payment Methods
          </h1>

          <p>
            Choose a convenient and secure way to pay
            for your BCO Enterprise order.
          </p>

        </div>

      </section>


      {/* PAYMENT CONTENT */}

      <section className="payment-content">

        <div className="payment-container">

          <div className="payment-heading">

            <p>
              PAYMENT INFORMATION
            </p>

            <h2>
              Simple and secure payments.
            </h2>

          </div>


          <div className="payment-grid">

            {/* ONLINE PAYMENT */}

            <div className="payment-card">

              <div className="payment-icon">
                💳
              </div>

              <h3>
                Online Payment
              </h3>

              <p>
                Pay for your order securely through the
                available online payment options during
                checkout.
              </p>

            </div>


            {/* BANK TRANSFER */}

            <div className="payment-card">

              <div className="payment-icon">
                🏦
              </div>

              <h3>
                Bank Transfer
              </h3>

              <p>
                Where available, customers may complete
                payment through a bank transfer using
                the payment instructions provided.
              </p>

            </div>


            {/* PAYMENT CONFIRMATION */}

            <div className="payment-card">

              <div className="payment-icon">
                ✅
              </div>

              <h3>
                Payment Confirmation
              </h3>

              <p>
                Your order will be processed according
                to the payment status recorded for the
                order.
              </p>

            </div>


            {/* SECURE PAYMENT */}

            <div className="payment-card">

              <div className="payment-icon">
                🔒
              </div>

              <h3>
                Secure Checkout
              </h3>

              <p>
                Always make payments through the official
                BCO Enterprise checkout process and avoid
                sharing your payment details with others.
              </p>

            </div>

          </div>


          {/* NOTE */}

          <div className="payment-note">

            <h3>
              Having trouble with payment?
            </h3>

            <p>
              If your payment was unsuccessful or your
              order status has not updated, contact BCO
              Enterprise support with your order details.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default PaymentMethods;