import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "../styles/AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        alert("Please login again.");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/products`,
        {
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product added successfully!");

      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });

    } catch (error) {
      console.error(
        "Failed to add product:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  return (
    <div className="admin-add-product-page">

      <main className="admin-add-product-content">

        <div className="admin-add-product-header">

          <p className="admin-add-product-label">
            BCO ENTERPRISE
          </p>

          <h1>Add Product</h1>

          <p>
            Add a new product to your store
            catalogue.
          </p>

        </div>

        <div className="admin-add-product-card">

          <form
            className="admin-add-product-form"
            onSubmit={submitHandler}
          >

            {/* PRODUCT NAME */}

            <div className="admin-add-product-field">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Solar Panel"
                value={product.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="admin-add-product-field">

              <label>
                Category
              </label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="Solar">
                  Solar
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Kitchen">
                  Kitchen
                </option>

                <option value="Lighting">
                  Lighting
                </option>

                <option value="School">
                  School
                </option>

                <option value="Shoe">
                  Shoe
                </option>

              </select>

            </div>


            {/* PRICE */}

            <div className="admin-add-product-field">

              <label>
                Price (₦)
              </label>

              <input
                type="number"
                name="price"
                placeholder="e.g. 250000"
                value={product.price}
                onChange={handleChange}
                min="0"
                required
              />

            </div>


            {/* STOCK */}

            <div className="admin-add-product-field">

              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                placeholder="e.g. 20"
                value={product.stock}
                onChange={handleChange}
                min="0"
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="admin-add-product-field admin-add-product-full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the product..."
                value={product.description}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>


            {/* IMAGE URL */}

            <div className="admin-add-product-field admin-add-product-full">

              <label>
                Product Image URL
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://example.com/product-image.jpg"
                value={product.image}
                onChange={handleChange}
                required
              />

              <small>
                Paste an image URL instead of
                uploading a file.
              </small>

            </div>


            {/* BUTTON */}

            <div className="admin-add-product-actions">

              <button
                type="submit"
                className="admin-add-product-submit"
              >
                Save Product
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddProduct;