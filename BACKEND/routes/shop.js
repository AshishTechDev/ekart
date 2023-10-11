const express = require("express");

const {
  getCart,
  addToCart,
  updateCart,
  deleteItemFromCart,
  getSingleProduct,
  getLatestProducts,
  getCheckout,
  addAddress,
} = require("../controllers/shop");


const router = express.Router();
const isAuth = require("../middlewares/is-Auth");

router.get("/latest-products", getLatestProducts);

router.get("/get-product/:prodId", getSingleProduct);




// router.use(isAuth);

router.get("/cart",isAuth, getCart);

router.patch("/cart/:productId",isAuth, addToCart);

router.patch("/updateCart",isAuth, updateCart);

router.delete("/cart/:productId", isAuth, deleteItemFromCart);

// router.get("/checkout",isAuth, getCheckout);

// router.post("/addAddress", addAddress);

module.exports = router;
