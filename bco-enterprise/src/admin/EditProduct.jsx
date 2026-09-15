import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  // THEN call it
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("USERINFO:", userInfo);
      console.log("TOKEN:", userInfo?.token);

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product updated successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="dashboard-content">
      <h2>Edit Product</h2>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="/uploads/product.jpg"
        />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;