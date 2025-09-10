const User = require("../models/user.js")
module.exports.login = (req , res)=>{
    res.render("../users/login.ejs");
}
 
 module.exports.saveUser = async (req , res)=>{
        req.flash("success" , "Welcome back to wanderLust");
        let redirectUrl =  res.locals.redirectUrl ||  "/listings" ;
    res.redirect(redirectUrl);
}

module.exports.logout = (req , res , next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success" , "logged out");
        res.redirect("/listings");
    })
}

module.exports.renderSignUpForm = (req , res)=>{
    res.render("../users/signup.ejs")
}

module.exports.updateUserInfo = async (req , res)=>{
 try{
    let {username , email , password} = req.body;
    const NewUser = new User({
    email , username
})
let userNew = await User.register(NewUser , password);
console.log(userNew);
req.login(userNew , (err)=>{
    if(err){
        return next(err);
    }
    req.flash("success" , "welcome to wanderlust");
    res.redirect("/listings");
})
 }
catch(e){
    req.flash("error" , e.message);
    res.redirect("/signup");
}
}