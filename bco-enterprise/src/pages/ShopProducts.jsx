
import {
  useContext,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import axios from "axios";

import { CartContext } from "../context/CartContext";

import {
  getExternalProducts,
  getPexelsImages,
} from "../services/externalProductService";

import "../styles/ShopProducts.css";

function Products() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState(categoryFromUrl);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 8;

  const { addToCart } = useContext(CartContext);

  /*
    ========================================
    BCO WHATSAPP NUMBER
    ========================================

    Replace the number below with the BCO
    WhatsApp number.

    IMPORTANT:
    Use the international format without
    the + sign or spaces.

    Example:
    2348012345678
  */

  const WHATSAPP_NUMBER = "09029619793";

  /*
    ========================================
    PEXELS PRODUCT HELPER
    ========================================
  */

  const getPexelsProducts = async (
    categoryName,
    query,
    startingPrice
  ) => {
    try {
      const images = await getPexelsImages(query);

      return images.map((photo, index) => {
        let productName;

        if (categoryName === "Solar") {
          const names = [
            "Solar Panel",
            "Solar Energy System",
            "Solar Power Panel",
            "Solar Panel System",
            "Solar Energy Equipment",
          ];

          productName =
            names[index % names.length];
        }

        if (categoryName === "Lighting") {
          const names = [
            "Outdoor Solar Light",
            "LED Lighting",
            "Solar Street Light",
            "Modern Outdoor Light",
            "LED Outdoor Lighting",
          ];

          productName =
            names[index % names.length];
        }

        if (categoryName === "School") {
          const names = [
            "School Bag",
            "Student Backpack",
            "School Supplies",
            "School Essentials",
            "Student Backpack Set",
          ];

          productName =
            names[index % names.length];
        }

        return {
          _id:
            "pexels-" +
            categoryName +
            "-" +
            photo.id,

          name: productName,

          price:
            startingPrice +
            index * 10000,

          image: photo.image,

          category: categoryName,

          description:
            "Quality " +
            categoryName.toLowerCase() +
            " product for demonstration purposes.",

          quantity: 1,

          external: true,

          pexels: true,

          photographer:
            photo.photographer,

          originalId: photo.id,
        };
      });
    } catch (error) {
      console.error(
        "Failed to load " +
          categoryName +
          " images:",
        error
      );

      return [];
    }
  };

  /*
    ========================================
    FETCH ALL PRODUCTS
    ========================================
  */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          BCO PRODUCTS
        */

        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        const bcoProducts = data.map(
          (product) => ({
            ...product,
            external: false,
          })
        );

        /*
          DUMMYJSON PRODUCTS
        */

        const externalProducts =
          await getExternalProducts();

        /*
          PEXELS SOLAR PRODUCTS
        */

        const solarProducts =
          await getPexelsProducts(
            "Solar",
            "solar panel solar energy equipment",
            120000
          );

        /*
          PEXELS LIGHTING PRODUCTS
        */

        const lightingProducts =
          await getPexelsProducts(
            "Lighting",
            "solar street light outdoor lighting LED",
            50000
          );

        /*
          PEXELS SCHOOL PRODUCTS
        */

        const schoolProducts =
          await getPexelsProducts(
            "School",
            "school bag backpack school supplies stationery",
            15000
          );

        /*
          COMBINE EVERYTHING
        */

        setProducts([
          ...bcoProducts,
          ...externalProducts,
          ...solarProducts,
          ...lightingProducts,
          ...schoolProducts,
        ]);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /*
    ========================================
    UPDATE CATEGORY FROM URL
    ========================================
  */

  useEffect(() => {
    setCategory(categoryFromUrl);
    setCurrentPage(1);
    setSearch("");
  }, [categoryFromUrl]);

  /*
    ========================================
    BCO CATEGORIES
    ========================================
  */

  const categories = [
    "All",
    "Variety",
    "Solar",
    "Fashion",
    "Shoes",
    "Home",
    "Kitchen",
    "School",
    "Lighting",
    "Electronics",
  ];

  /*
    ========================================
    SEARCH + CATEGORY FILTER
    ========================================
  */

  let filteredProducts = products.filter(
    (product) => {
      const productName =
        product.name?.toLowerCase() || "";

      const searchTerm =
        search.toLowerCase();

      const matchesSearch =
        productName.includes(searchTerm);

      const matchesCategory =
        category === "All" ||
        product.category === category ||
        (category === "Variety" &&
          product.category !== "Solar");

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /*
    ========================================
    SORTING
    ========================================
  */

  if (sort === "low") {
    filteredProducts.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );
  }

  /*
    ========================================
    PAGINATION
    ========================================
  */

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  /*
    ========================================
    HANDLERS
    ========================================
  */

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  /*
    ========================================
    WHATSAPP
    ========================================
  */

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello BCO Enterprise, I am looking for a product that I cannot find on the website."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  };

  /*
    ========================================
    LOADING
    ========================================
  */

  if (loading) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>

        <p className="no-products">
          Loading products...
        </p>
      </div>
    );
  }

  /*
    ========================================
    ERROR
    ========================================
  */

  if (error) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>

        <p className="no-products">
          {error}
        </p>
      </div>
    );
  }

  /*
    ========================================
    PAGE
    ========================================
  */

  return (
    <div className="products-page">

      <h1>Our Products</h1>

      {/* SHOP CONTROLS */}

      <div className="shop-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={handleSortChange}
        >
          <option value="">
            Sort by
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>

      </div>

      {/* PRODUCTS */}

      {currentProducts.length === 0 ? (
        <p className="no-products">
          No products found.
        </p>
      ) : (
        <div className="products-grid">

          {currentProducts.map(
            (product) => (
              <div
                className="product-card"
                key={product._id}
              >

                <img
                  src={
                    product.image?.startsWith(
                      "http"
                    )
                      ? product.image
                      : "http://localhost:5000" +
                        product.image
                  }
                  alt={product.name}
                />

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.category}
                </p>

                <h2>
                  ₦
                  {Number(
                    product.price
                  ).toLocaleString()}
                </h2>

                {product.external && (
                  <small className="external-label">
                    Demo Product
                  </small>
                )}

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>
            )
          )}

        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                className={
                  currentPage ===
                  index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>

        </div>
      )}

      {/* ==================================
          MORE PRODUCTS / CHAT SECTION
      ================================== */}

      <section className="more-products">

        <h2>
          Can't find what you're looking for?
        </h2>

        <p>
          We may have more products available.
          Chat with BCO Enterprise and tell us
          what you need.
        </p>

        <button
          className="chat-button"
          onClick={handleWhatsApp}
        >
          Chat with BCO
        </button>

      </section>

    </div>
  );
}

export default Products;
