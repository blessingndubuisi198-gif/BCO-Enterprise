const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Create a new product
const createProduct = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const product = await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {

        console.log("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Failed to create product",
            error: error.message,
        });

    }
};


const updateProduct = async (req, res) =>{
    console.log("UPDATE CONTROLLER REACHED");
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators : true,
            }
        );

        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }

        res.status(200).json(product);

        } catch (error) {

    console.log(error);

    res.status(500).json({
        message: "Failed to create product",
        error: error.message,
    });
}
   
};

const deleteProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }
        res.status(200).json({
            message:"Product deleted succesfully"
        });
    }catch(error){
        res.status(500).json({
            message:"failed to delete product",
            error:error.message,
        });
    }
};
// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};