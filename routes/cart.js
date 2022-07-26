const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart");

//create
router.post("/", verifyToken, async(req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update Cart
router.put("/:id", verifyTokenAndAuthorization, async(req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true});
    res.status(200).json(updatedCart);
  } catch(err) {
    res.status(500).json(err);
  }
});

//delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "the Cart has been deleted successfully" });
  } catch (err) {
    res.status(500).json(err)
  }
});

//get a single Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(foundCart);
  } catch (err) {
    res.status(500).json(err);
  }


  
});

//get Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;