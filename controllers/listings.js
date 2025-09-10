const Hotel = require("../models/listings.js")
module.exports.index = async (req , res)=>{
    let allListings = await Hotel.find({})
    res.render("listings.ejs" , {allListings})
}
module.exports.renderNewForm = (req , res)=>{
    res.render("create.ejs");
}

module.exports.addNewListing = async ( req , res , next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Hotel(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename}
    await newListing.save()
    req.flash("success" , "New Listing Is added")
    res.redirect("/listings")
}

module.exports.showListings = async (req , res)=>{
    let {id} = req.params;
    let listing =  await Hotel.findById(id)
    .populate(
        {
        path:"reviews" , 
        populate:{
            path:"author"
        }
        }
    )
    .populate("owner");
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings")
    }
    res.render("show.ejs" ,{listing} )
}

module.exports.renderEditForm = async (req , res)=>{
    let {id} = req.params;
    let listing = await Hotel.findById(id)
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings")
    }
    let originalImage = listing.image?.url || "";
if (originalImage.includes("/upload")) {
  originalImage = originalImage.replace("/upload",  "/upload/h_300,w_250,e_blur:300/");
}
    res.render("edit.ejs" , {listing  , originalImage})
}

module.exports.updateListing = async (req , res)=>{
    let {id} = req.params;
   let updatedListing =  await Hotel.findByIdAndUpdate(id , {...req.body.listing})
    if(typeof req.file!=="undefined"){
         let url = req.file.path;
         let filename = req.file.filename;
         updatedListing.image = {url , filename};
         await updatedListing.save();
    }
    req.flash("success" , "Listing Is Updated")
    res.redirect("/listings")
}

module.exports.deleteListing = async (req , res)=>{
     if(!req.isAuthenticated()){
        req.flash("error" , "User is not logged in")
        return res.redirect("/login");
    }
    let {id} = req.params;
    await Hotel.findByIdAndDelete(id);
    req.flash("success" , "Listing Is deleted")
    res.redirect("/listings")
}