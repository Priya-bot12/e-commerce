import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Update product quantity/size in user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    // If item and size exists in the cart, update its quantity
    if (cartData[itemId] && cartData[itemId][size]) {
      if (quantity > 0) {
        cartData[itemId][size] = quantity;
      } else {
        // If quantity is 0 or less, remove that size
        delete cartData[itemId][size];

        // If no sizes left for that item, remove the item itself
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({ success: true, message: "Cart updated successfully" });
    } else {
      res.json({ success: false, message: "Item/Size not found in cart" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Get user's cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body; // or req.params.userId if using route parameter

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({
      success: true,
      message: "Cart fetched successfully",
      cartData: cartData
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};