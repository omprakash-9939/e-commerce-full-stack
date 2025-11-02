import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, role, itemId, size } = req.body;
    if (role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "Admins cannot add to cart" });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, cart: cartData, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update quantity in cart
const updateCart = async (req, res) => {
  try {
    const { userId, role, itemId, size, quantity } = req.body;
    if (role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "Admins cannot update cart" });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, cart: cartData, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "Admins cannot access cart" });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};
    res.json({ success: true, cart: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
