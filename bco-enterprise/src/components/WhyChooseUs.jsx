import "../styles/WhyChooseUs.css";
import whyBackground from "../assets/images/why-choose-us.png";

function WhyChooseUs() {
  const reasons = [
    {
      number: "01",
      title: "Quality Products",
      text: "We carefully select products that offer quality, reliability and value for everyday use.",
    },
    {
      number: "02",
      title: "Trusted Marketplace",
      text: "Shop with confidence knowing that BCO Enterprise is built around trust and customer satisfaction.",
    },
    {
      number: "03",
      title: "Everyday Convenience",
      text: "From solar solutions to fashion, appliances and home essentials, find what you need in one place.",
    },
    {
      number: "04",
      title: "Customer First",
      text: "Your satisfaction matters to us. We are committed to making your shopping experience simple and enjoyable.",
    },
  ];

  return (
    <section className="why-section"
    style={{
      backgroundImage :`url(${whyBackground})`,
    }}
    >

      <div className="why-overlay"></div>

      <div className="why-content">

        <div className="why-heading">
          <span>WHY BCO ENTERPRISE</span>

          <h2>
            Shopping Made
            <br />
            Simple &amp; Reliable.
          </h2>

          <p>
            We combine quality products, convenience and trusted
            service to give you a better way to shop for the things
            that matter.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((reason) => (
            <div className="why-card" key={reason.number}>

              <div className="why-number">
                {reason.number}
              </div>

              <h3>{reason.title}</h3>

              <p>{reason.text}</p>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;