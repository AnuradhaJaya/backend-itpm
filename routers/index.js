const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const autherToken = require("../middleware/autherToken");
const userLogout = require("../controller/user/userLogout");
const allUsersDetails = require("../controller/user/AllUserDetails");
const updateUser = require("../controller/user/updateUser");






router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details",autherToken,userDetailsController)
router.get("/user-logout",userLogout)

//admin penel
router.get("/all-user-details",autherToken,allUsersDetails)
router.post("/update-user-role",autherToken,updateUser)







module.exports = router;
