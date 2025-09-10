const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const ejs = require("ejs")

// app.use(cookieParser())
const sessionOptions = {
    secret:"mysecret" ,
    resave:false ,
    saveUninitialized:true
}
app.use(session(sessionOptions));
app.use(flash())

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "../views"))
////////////////////////////////////////////////////////////////////////////////////////////////////////
// storing & using session info
// storing the name in this session while registering using query string 
app.get("/register" , (req , res)=>{  // will be sending the name in the query string
    let {name="anonymous"} = req.query; //destructuring the name from query
     req.session.name = name; // we are storing the name in the session storage
    if(name==="anonymous"){
        req.flash("successMsg" , "User Not Registered Successfully")
    }
    else{
        req.flash("errorMsg" , "User Registered Successfully")
    }
    res.redirect("/greet")
})
// storing the flash msg key value pairs in locals 
app.use((req , res , next)=>{
    res.locals.successMsg = req.flash("successMsg")
    res.locals.errorMsg = req.flash("errorMsg")
    next()
})
// we are creating another route to greet user with their name
app.get("/greet" , (req , res)=>{
    // we are using the session info to greet the user when navigated to other page 
    res.render("flash.ejs" , {name:req.session.name})
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.use("/reqCount" , (req , res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else {
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`)
// })
// app.get("/test" , (req , res)=>{
//     res.send("test successful")
// })
// app.listen(3000 , ()=>{
//     console.log("listening to 3000 ...")
// })

// app.get("/" , (req , res)=>{
//     res.send("i am root")
// })
// app.get("/getcookies" , (req , res)=>{
//     console.dir(req.cookies)
//     res.cookie("greet" , "hello");
//     res.send("sent an cookie");
// })