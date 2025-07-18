import express from "express";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImgUpload } from "../../controllers/admin/productsController.js";
import { upload } from "../../config/cloudinary.js";

const prodsRouter = express.Router();

prodsRouter.post('/upload-img', upload.single('my_file'), handleImgUpload);
prodsRouter.post('/add', addProduct);
prodsRouter.put('/edit/:id', editProduct);
prodsRouter.delete('/delete/:id', deleteProduct);
prodsRouter.get('/get', fetchAllProducts);


export default prodsRouter ; 
