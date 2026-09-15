import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";
import heroBackground from "../assets/hero-background.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero"
    style={{
      backgroundImage :`url(${heroBackground})`,
    }}>

      <div className="hero-overlay"></div>

      <div className="hero-left">

        <span className="hero-tag">
          WELCOME TO BCO ENTERPRISE
        </span>

        <h1>
          Power Your Home.
          <br />
          Style Your Life.
        </h1>

        <p>
          Shop reliable solar solutions and quality
          everyday essentials all in one trusted
          marketplace.
        </p>

        <div className="hero-buttons">

          <button
            className="solar-btn"
            onClick={() =>
              navigate("/products?category=Solar")
            }
          >
            Shop Solar
          </button>

          <button
            className="variety-btn"
            onClick={() =>
              navigate("/products?category=Variety")
            }
          >
            Shop Variety
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;