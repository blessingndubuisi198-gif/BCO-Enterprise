import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Thank you for contacting BCO Enterprise. We will get back to you soon."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* HERO */}

      <section className="contact-page-hero">

        <div className="contact-page-hero-content">

          <p className="contact-page-label">
            GET IN TOUCH
          </p>

          <h1>
            Contact Us
          </h1>

          <p className="contact-page-intro">
            Have a question about our products, your order,
            or our services? We are here to help.
          </p>

        </div>

      </section>


      {/* CONTACT CONTENT */}

      <section className="contact-page-section">

        <div className="contact-page-container">

          {/* CONTACT INFORMATION */}

          <div className="contact-page-info">

            <p className="contact-page-small-title">
              CONTACT BCO
            </p>

            <h2>
              We would love to hear from you.
            </h2>

            <p className="contact-page-description">
              Whether you need help choosing a product,
              have a question about an order, or simply
              want to learn more about BCO Enterprise,
              feel free to reach out.
            </p>


            {/* PHONE */}

            <div className="contact-page-detail">

              <div className="contact-page-icon">
                📞
              </div>

              <div>
                <h3>Phone</h3>

                <p>
                  +234 803 959 0461
                </p>
              </div>

            </div>


            {/* EMAIL */}

            <div className="contact-page-detail">

              <div className="contact-page-icon">
                ✉️
              </div>

              <div>
                <h3>Email</h3>

                <p>
                  blessingndubisi198@gmail.com
                </p>
              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-page-detail">

              <div className="contact-page-icon">
                📍
              </div>

              <div>
                <h3>Location</h3>

                <p>
                  Nigeria
                </p>
              </div>

            </div>

          </div>


          {/* CONTACT FORM */}

          <div className="contact-page-form-wrapper">

            <form
              className="contact-page-form"
              onSubmit={handleSubmit}
            >

              <div className="contact-page-form-row">

                <div className="contact-page-field">

                  <label htmlFor="name">
                    Your Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="contact-page-field">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              <div className="contact-page-field">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                />

              </div>


              <div className="contact-page-field">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-page-submit"
              >
                Send Message
                <span>→</span>
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* BOTTOM MESSAGE */}

      <section className="contact-page-bottom">

        <div>

          <p>
            BCO ENTERPRISE
          </p>

          <h2>
            Quality products. Reliable solutions.
          </h2>

          <span>
            From solar solutions to everyday essentials,
            we have you covered.
          </span>

        </div>

      </section>

    </main>
  );
}

export default Contact;
