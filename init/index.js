const initdata = require("./initData.js")
const mongoose  = require("mongoose")
const Hotel = require("../models/listings.js")
main()
.then(()=>{
    console.log("connection successful... .")
})
.catch((e)=>{
    console.log(e)
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}
const initDB = async()=>{
    await Hotel.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj , owner: "68aadcdb1c1f9de4c13b1670"}))
   let res =  await Hotel.insertMany(initdata.data);
    console.log("data was initialized");
    console.log(res)
}
initDB()