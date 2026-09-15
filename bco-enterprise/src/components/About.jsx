import "../styles/About.css";

function About() {
  return (
    <section className="about-section">

      <div className="about-header">
        <span className="section-label">WHO WE ARE</span>

        <h2>
          Everything You Need,
          <br />
          All in One Place.
        </h2>

        <p>
          BCO Enterprise is a trusted marketplace created to make
          everyday shopping easier. We bring together reliable solar
          solutions, fashion, home essentials, appliances, school
          supplies, lighting products and more in one convenient place.
        </p>
      </div>

      <div className="about-cards">

        <div className="about-card">
          <div className="about-icon">01</div>

          <h3>Our Mission</h3>

          <p>
            To make quality everyday products and reliable solar
            solutions easily accessible while giving customers a
            convenient and trustworthy shopping experience.
          </p>
        </div>

        <div className="about-card featured-about-card">
          <div className="about-icon">02</div>

          <h3>Our Vision</h3>

          <p>
            To build a trusted marketplace that connects people with
            products they need while supporting businesses and creating
            better access to everyday essentials.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">03</div>

          <h3>Our Values</h3>

          <p>
            Quality, trust, convenience and customer satisfaction guide
            everything we do. We believe shopping should be simple,
            reliable and accessible.
          </p>
        </div>

      </div>

    </section>
  );
}

export default About;