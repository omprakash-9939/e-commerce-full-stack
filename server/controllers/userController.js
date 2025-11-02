import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createToken = (id, role) => {
  const secret =
    role === "admin" ? process.env.ADMIN_JWT_SECRET : process.env.JWT_SECRET;
  return jwt.sign({ id, role }, secret, { expiresIn: "1d" });
};

// create user controller logic.

// Login for user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // then generate token
      const token = createToken(user._id, user.role);
      res.json({ success: true, tokenName: "user-token", token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Registration for user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // After hash password we can add new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // Save newUser in db
    const user = await newUser.save();
    // We will add token for user login
    const token = createToken(user._id, user.role);
    // res.json({ success: true, token });
    res.json({ success: true, tokenName: "user-token", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// admin register
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "Admin already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = createToken(newAdmin._id, newAdmin.role);
    // res.status(201).json({ success: true, token });
    res.json({ success: true, tokenName: "admin-token", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(admin._id, admin.role);
    res.json({
      success: true,
      // token,
      tokenName: "admin-token",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Export the controller
export { loginUser, registerUser, registerAdmin, adminLogin };
