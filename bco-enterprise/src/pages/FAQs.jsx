import "../styles/FAQs.css";

function FAQs() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, select the item you want, add it to your cart, and proceed to checkout to complete your order.",
    },
    {
      question: "How can I check my order?",
      answer:
        "You can check your orders from the My Orders section after signing in to your account.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Use the Track Order page and enter the order ID provided after placing your order.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "Available payment options are displayed during checkout. Follow the payment instructions provided for your order.",
    },
    {
      question: "Can I return a product?",
      answer:
        "If you receive a damaged, incorrect, or problematic product, contact BCO Enterprise support as soon as possible for assistance.",
    },
    {
      question: "How do I contact BCO Enterprise?",
      answer:
        "You can reach us through the Contact page using the contact information provided there.",
    },
  ];

  return (
    <main className="faq-page">

      {/* HERO */}

      <section className="faq-hero">

        <div className="faq-hero-content">

          <p className="faq-label">
            BCO ENTERPRISE
          </p>

          <h1>
            Frequently Asked Questions
          </h1>

          <p>
            Find answers to some of the most common
            questions about shopping with BCO Enterprise.
          </p>

        </div>

      </section>


      {/* FAQ CONTENT */}

      <section className="faq-content">

        <div className="faq-container">

          <div className="faq-heading">

            <p>
              NEED HELP?
            </p>

            <h2>
              We've got answers.
            </h2>

          </div>


          <div className="faq-list">

            {faqs.map((faq, index) => (

              <details
                className="faq-item"
                key={index}
              >

                <summary>
                  <span>
                    {faq.question}
                  </span>

                  <strong>
                    +
                  </strong>
                </summary>

                <p>
                  {faq.answer}
                </p>

              </details>

            ))}

          </div>


          {/* HELP */}

          <div className="faq-help">

            <h3>
              Still need help?
            </h3>

            <p>
              If you couldn't find the answer you're
              looking for, contact BCO Enterprise and
              we'll help you with your question.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default FAQs;