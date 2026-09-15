import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";

import solarImage from "../assets/images/solar-category.png";
import fashionImage from "../assets/images/fashion-category.png";
import kitchenImage from "../assets/images/kitchen-category.png";
import lightingImage from "../assets/images/lighting-category.png";
import schoolImage from "../assets/images/school-category.png";
// import homeImage from "../assets/images/home-category.png";
import shoeImage from "../assets/images/shoe-category.png";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Solar",
      description:
        "Power solutions for your home and business.",
      image: solarImage,
      category: "Solar",
    },
    {
      name: "Fashion",
      description:
        "Trendy clothing and accessories for every occasion.",
      image: fashionImage,
      category: "Fashion",
    },
    {
      name: "Kitchen",
      description:
        "Essential kitchen appliances and gadgets for your everyday needs.",
      image: kitchenImage,
      category: "Kitchen",
    },
    {
      name: "Lighting",
      description:
        "Stylish and smart lighting solutions for every space.",
      image: lightingImage,
      category: "Lighting",
    },
    {
      name: "School",
      description:
        "Quality educational supplies and learning tools.",
      image: schoolImage,
      category: "School",
    },
    {
      name: "Shoe",
      description:
        "A wide range of footwear for all seasons.",
      image: shoeImage,
      category: "Shoe",
    },
  ];

  return (
    <section className="customer-categories">

      {/* HEADING */}

      <div className="customer-categories-heading">

        <i>
          <span>EXPLORE BCO</span>
        </i>

        <h2>Shop by Categories</h2>

        <p>
          Everything you need, carefully selected and
          made available in one trusted marketplace.
          From solar solutions to everyday essentials,
          we have you covered.
        </p>

      </div>

      {/* CATEGORY GRID */}

      <div className="customer-category-grid">

        {categories.map((category) => (

          <div
            className="customer-category-card"
            key={category.name}
            onClick={() =>
              navigate(
                `/products?category=${category.category}`
              )
            }
          >

            {/* IMAGE */}

            <div className="customer-category-image">

              <img
                src={category.image}
                alt={category.name}
              />

            </div>

            {/* CONTENT */}

            <div className="customer-category-content">

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span className="customer-category-link">
                Explore <span>→</span>
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;