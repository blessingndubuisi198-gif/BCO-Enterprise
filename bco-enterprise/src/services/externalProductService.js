import axios from "axios";

const API_URL = "https://dummyjson.com/products";

/*
  DummyJSON categories that we can
  sensibly use for BCO categories.
*/

const categoryMap = {
  Fashion: [
    "mens-shirts",
    "mens-watches",
    "womens-dresses",
    "womens-bags",
    "womens-watches",
    "tops",
    "womens-jewellery",
  ],

  Shoes: [
    "mens-shoes",
    "womens-shoes",
  ],

  Kitchen: [
    "kitchen-accessories",
  ],

  Home: [
    "furniture",
    "home-decoration",
  ],

  Electronics: [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ],
};

/*
  Convert an API product into the
  same structure our BCO products use.
*/

const formatProduct = (
  product,
  category
) => ({
  _id: `external-${product.id}`,

  name: product.title,

  /*
    DEMO PRICE ONLY

    DummyJSON prices are in USD.
    We are using a small demo conversion
    so the displayed prices don't look
    ridiculous in the BCO demo.

    These are NOT real BCO prices.
  */

  price: Math.round(
    product.price * 100
  ),

  image: product.thumbnail,

  category,

  description:
    product.description,

  quantity: 1,

  external: true,

  originalId: product.id,
});

/*
  Fetch products for one BCO category.
*/

const getProductsByCategory = async (
  bcoCategory
) => {
  const apiCategories =
    categoryMap[bcoCategory];

  if (!apiCategories) {
    return [];
  }

  const requests =
    apiCategories.map(
      (apiCategory) =>
        axios.get(
          `${API_URL}/category/${apiCategory}`
        )
    );

  const responses =
    await Promise.all(requests);

  return responses.flatMap(
    (response) =>
      response.data.products.map(
        (product) =>
          formatProduct(
            product,
            bcoCategory
          )
      )
  );
};

/*
  Get ALL useful external products.
*/

export const getExternalProducts =
  async () => {
    const categories = Object.keys(
      categoryMap
    );

    const results =
      await Promise.all(
        categories.map(
          (category) =>
            getProductsByCategory(
              category
            )
        )
      );

    return results.flat();
  };

/*
  Fashion
*/

export const getExternalFashionProducts =
  async () => {
    return getProductsByCategory(
      "Fashion"
    );
  };

/*
  Shoes
*/

export const getExternalShoesProducts =
  async () => {
    return getProductsByCategory(
      "Shoes"
    );
  };

/*
  Kitchen
*/

export const getExternalKitchenProducts =
  async () => {
    return getProductsByCategory(
      "Kitchen"
    );
  };

/*
  Home
*/

export const getExternalHomeProducts =
  async () => {
    return getProductsByCategory(
      "Home"
    );
  };

/*
  Electronics
*/

export const getExternalElectronicsProducts =
  async () => {
    return getProductsByCategory(
      "Electronics"
    );
  };

/*
  Pexels
  Fetch images through our BCO backend.

  The Pexels API key stays safely
  inside the backend .env file.
*/

export const getPexelsImages =
  async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pexels/search",
        {
          params: {
            query,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch Pexels images:",
        error
      );

      return [];
    }
  };