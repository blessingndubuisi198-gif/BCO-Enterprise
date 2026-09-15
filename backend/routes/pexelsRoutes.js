
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: 10,
        },
      }
    );

    const photos = response.data.photos.map((photo) => ({
      id: photo.id,
      image: photo.src.large,
      thumbnail: photo.src.medium,
      photographer: photo.photographer,
    }));

    res.json(photos);
  } catch (error) {
    console.error(
      "Pexels error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to fetch Pexels images",
    });
  }
});

module.exports = router;