import "../styles/Shipping.css";

function Shipping() {
  return (
    <main className="service-page-shipping">

      {/* HERO */}

      <section className="service-page-hero">

        <div className="service-page-hero-content">

          <p className="service-page-label">
            BCO ENTERPRISE
          </p>

          <h1>
            Shipping & Delivery
          </h1>

          <p>
            Everything you need to know about getting
            your BCO Enterprise order delivered to you.
          </p>

        </div>

      </section>


      {/* SHIPPING CONTENT */}

      <section className="service-page-content">

        <div className="service-page-container">

          <div className="service-page-heading">

            <p>
              DELIVERY INFORMATION
            </p>

            <h2>
              Simple and reliable delivery.
            </h2>

          </div>


          <div className="service-page-shipping-grid">

            {/* DELIVERY TIME */}

            <div className="service-page-info-card">

              <div className="service-page-info-icon">
                🚚
              </div>

              <h3>
                Delivery Time
              </h3>

              <p>
                Delivery times may vary depending on
                your location, product availability and
                the size of your order.
              </p>

            </div>


            {/* DELIVERY AREA */}

            <div className="service-page-info-card">

              <div className="service-page-info-icon">
                📍
              </div>

              <h3>
                Delivery Locations
              </h3>

              <p>
                We serve customers within Nigeria.
                Delivery availability may depend on
                your specific location.
              </p>

            </div>


            {/* ORDER PROCESSING */}

            <div className="service-page-info-card">

              <div className="service-page-info-icon">
                📦
              </div>

              <h3>
                Order Processing
              </h3>

              <p>
                Orders are processed after they have
                been successfully placed. You may be
                contacted when additional information
                is required.
              </p>

            </div>


            {/* DELIVERY UPDATES */}

            <div className="service-page-info-card">

              <div className="service-page-info-icon">
                🔔
              </div>

              <h3>
                Delivery Updates
              </h3>

              <p>
                Keep your contact information accurate
                so that we can reach you regarding your
                order and delivery.
              </p>

            </div>

          </div>


          {/* IMPORTANT NOTE */}

          <div className="service-page-note">

            <h3>
              Important
            </h3>

            <p>
              Please make sure your delivery information
              is correct before completing your order.
              If you have questions about a specific
              delivery, contact BCO Enterprise for
              assistance.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Shipping;