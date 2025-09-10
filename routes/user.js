const express = require("express");
const router = express.Router({mergeParams:true});
const User= require("../models/user.js")
const passport = require("passport")
const {saveRedirectUrl} = require("../middlewares.js")
const userController = require("../controllers/users.js")

// signup form && update user info
router.route("/signup")
.get( userController.renderSignUpForm)
.post( userController.updateUserInfo)

// loginRoute && saveUser
router.route("/login")
.get( userController.login)
.post(saveRedirectUrl , passport.authenticate("local" , {failureRedirect :"/login" , failureFlash :true}) , userController.saveUser)


// logout
router.get("/logout" , userController.logout)

module.exports = router;