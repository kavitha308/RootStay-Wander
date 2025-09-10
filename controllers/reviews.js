const Review = require("../models/review.js")
const Hotel = require("../models/listings.js")

module.exports.createReview = async (req , res , next)=>{
    let id = req.params.id;
    let listing = await Hotel.findById(id);
    let newReview = new Review (req.body.reviews)
    newReview.author =req.user._id;
    let reviewAdded = await newReview.save();
    await listing.reviews.push(newReview);
    let lisAndReview = await listing.save();
    console.log(lisAndReview);
    req.flash("success" , "New Review is created")
    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteReview = async(req , res)=>{
    let {id , reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId)
    await Hotel.findByIdAndUpdate(id , {$pull :{reviews:reviewId}});
    req.flash("success" , "Review is deleted")
    res.redirect(`/listings/${id}`)

}