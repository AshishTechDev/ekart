const Product = require("../models/product");

exports.getLatestProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: "desc" });

    res.status(200).json({products: products});
  } catch (err) {
    res.status(500).json({message : err.message});
  }
}

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.prodId);
    res.status(200).json({ product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.productId");
    const cartItems = user.cart;

   res.status(200).json({ cartItems : cartItems });
  } catch (err) {
    res.status(500).json({ message : err.message});
  }
};

exports.addToCart = async (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(prodId);
  console.log("product id rec"); //31:00 - 3 sep

  try {
    const updatedUser = await req.user.addToCart(prodId);
    // console.log(response);
    console.log(updatedUser);

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCart = async (req, res, next) => {
  console.log("update cart");

  try {
    const updateCart = await req.user.updateCart(
      req.body.productId, req.body.qty);

      const user = await updateCart.populate("cart.productId");
      console.log(user);
   
    res.status(200).json({ updatedCart: user.cart });
  } catch (err) {
    res.status(500).json({ error : err.message });
  }
};

exports.deleteItemFromCart = async (req, res, next) => {
  const prodId  = req.params.productId;
  try {
    const response = await req.user.removeFromCart(prodId);
    const user = await response.populate("cart.productId");
    const updatedCart = user.cart;
    res.status(200).json({ updatedCart: updatedCart });
  } catch (err) {
    res.status(500).json({ message : err.message });
  }
};

exports.getCheckout = (req, res, next) => {
  const addresses = req.user.address ;
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    addresses: addresses
  });
};

exports.addAddress = async (req, res, next) => {
  // console.log(req.body);

  try {
    const response = await req.user.setAddress(req.body);
    res.redirect("/checkout");
  } catch (err) {
    console.log(err.message);
  }
};
