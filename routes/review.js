const express = require("express");
const router = express.Router({mergeParams:true});
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {HotelSchema} = require("../SchemaValidation.js")
const {reviewsSchema} = require("../ReviewValidation.js")
const engine = require("ejs-mate")
const {isLoggedIn , isReviewAuthor} = require("../middlewares.js")
const reviewController = require("../controllers/reviews.js")

// doing server side validations for listings and reviews
let validateReview = (req , res , next)=>{
    let result = reviewsSchema.validate(req.body.review)
    if(result.error){
        throw new ExpressError(400 , result.error);
    }
     else{
        next()
    }
}
// review creation route
router.post("/"  ,isLoggedIn , validateReview , wrapAsync(reviewController.createReview))

// delete review route
router.delete("/:reviewId" ,isLoggedIn , isReviewAuthor ,  reviewController.deleteReview)

module.exports = router;