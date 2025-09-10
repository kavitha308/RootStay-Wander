const Hotel= require("./models/listings.js")
const Review= require("./models/review.js")
module.exports.isLoggedIn = (req , res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be logged in !!");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
   if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
} 

module.exports.isOwner = async (req , res , next)=>{
    let {id} = req.params;
    let listing = await Hotel.findById(id)
    if(! listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , "you dont have permission")
        return res.redirect(`/listings/${id}`)
    }
    next();
    // if(!res.locals.currUser._id.equals(listing.owner._id))
}
module.exports.isReviewAuthor = async(req , res , next)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals((res.locals.currUser._id))){
      req.flash("error" , "you dont have permission")
      return res.redirect(`/listings/${id}`)
    }
    next()
}