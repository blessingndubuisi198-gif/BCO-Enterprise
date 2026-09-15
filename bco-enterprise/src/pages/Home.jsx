import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import ExternalProducts from "../components/ExternalProducts";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      <main>
        <Hero />

        <Categories />

        <FeaturedProducts />

        <ExternalProducts />

        <About />

        <WhyChooseUs />

        <Contact />
      </main>

    </div>
  );
}

export default Home;