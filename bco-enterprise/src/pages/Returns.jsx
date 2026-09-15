import "../styles/Returns.css";

function Returns() {
  return (
    <main className="service-page-returns">

      {/* HERO */}

      <section className="returns-hero">

        <div className="returns-hero-content">

          <p className="returns-label">
            BCO ENTERPRISE
          </p>

          <h1>
            Returns & Refunds
          </h1>

          <p>
            Our return information is designed to make
            the process clear and straightforward.
          </p>

        </div>

      </section>


      {/* CONTENT */}

      <section className="returns-content">

        <div className="returns-container">

          <div className="returns-heading">

            <p>
              RETURN INFORMATION
            </p>

            <h2>
              What you need to know
            </h2>

          </div>


          <div className="returns-grid">

            {/* ELIGIBILITY */}

            <div className="returns-card">

              <div className="returns-icon">
                ↩️
              </div>

              <h3>
                Return Eligibility
              </h3>

              <p>
                If you receive a product that is damaged,
                incorrect or has an issue, please contact
                BCO Enterprise as soon as possible.
              </p>

            </div>


            {/* CONTACT */}

            <div className="returns-card">

              <div className="returns-icon">
                📞
              </div>

              <h3>
                Contact Us First
              </h3>

              <p>
                Please contact our support team before
                sending any product back. We will guide
                you through the appropriate next steps.
              </p>

            </div>


            {/* PRODUCT CONDITION */}

            <div className="returns-card">

              <div className="returns-icon">
                📦
              </div>

              <h3>
                Product Condition
              </h3>

              <p>
                Returned products should be kept in
                reasonable condition and, where possible,
                returned with their original packaging.
              </p>

            </div>


            {/* REFUNDS */}

            <div className="returns-card">

              <div className="returns-icon">
                💳
              </div>

              <h3>
                Refunds
              </h3>

              <p>
                Approved refunds will be handled according
                to the payment method and circumstances
                surrounding the return.
              </p>

            </div>

          </div>


          {/* NOTE */}

          <div className="returns-note">

            <h3>
              Need help with a return?
            </h3>

            <p>
              Contact BCO Enterprise with your order
              details and explain the issue with your
              product. Our team will help you determine
              the next step.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Returns;