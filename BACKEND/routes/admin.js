const express = require("express");
const {body} = require("express-validator");
const router = express.Router();

const {
  getAddProduct,
  getProducts,
  postAddProduct,
  deleteProduct,
  getEditProduct,
  updateProduct,
} = require("../controllers/admin");
const isAuth = require("../middlewares/is-Auth");
const upload = require("../middlewares/file-upload");


router.post("/add-product", isAuth,
  upload.single("imageUrl"),
 postAddProduct);

 router.get("/get-products",isAuth, getProducts); 


router.put("/update-product/:prodId", isAuth,   upload.single("imageUrl"), updateProduct);

router.delete("/delete-product/:prodId", isAuth, deleteProduct);

module.exports = router;
