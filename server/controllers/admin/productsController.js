import { imgUploadUtil } from "../../config/cloudinary.js";
import Product from "../../models/Products.js";

const handleImgUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imgUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const createProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await createProduct.save();
    res.status(201).json({
        success : true,
        data : createProduct
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {

    const listProducts = await Product.find({});
     res.status(200).json({
        success : true,
        data : listProducts
    });

  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const editProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if(!findProduct){
        res.status(404).json({
        success : false,
        data : "Product not found"
    });
    }

    findProduct.title = title || findProduct.title ;
    findProduct.description = description || findProduct.description ;
    findProduct.category = category || findProduct.category ;
    findProduct.brand = brand || findProduct.brand ;
    findProduct.price = price || findProduct.price ;
    findProduct.salePrice = salePrice || findProduct.salePrice ;
    findProduct.totalStock = totalStock || findProduct.totalStock ;
    findProduct.image = image || findProduct.image ;

    await findProduct.save();
    res.status(200).json({
        success : true,
        data : findProduct,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id);

    if(!product) {
        res.status(404).json({
        success : false,
        data : "Product not found"
    })
    }

    res.status(200).json({
        success : true,
        message : "Product deleted succesfully"
    });

  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

export {
  handleImgUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
