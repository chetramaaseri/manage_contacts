const express = require("express");
const router = express.Router();

const {registerUser,loginUser,currentUserInformation} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/login").post(loginUser)
router.route("/register").post(registerUser);
router.route("/current").get(validateToken,currentUserInformation)

module.exports = router