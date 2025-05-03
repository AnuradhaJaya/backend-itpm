const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name, phone, address } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists.");
    }

    if (!email) {
      throw new Error("Please provide email.");
    }
    if (!password) {
      throw new Error("Please provide password.");
    }
    if (!name) {
      throw new Error("Please provide name.");
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      throw new Error("Please provide a valid 10-digit phone number.");
    }
    if (!address) {
      throw new Error("Please provide an address.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong.");
    }

    const payload = {
      email,
      password: hashPassword,
      name,
      phone,
      address,
      role: "ADMIN", // default role is User
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;