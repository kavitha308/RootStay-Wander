const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
    title :{
        type :String
      } , 
    description :{
        type: String
      } , 
    image: {
  url:String , 
  filename:String
  },
    price :{
        type:Number , 
        default:0
      } , 
    location:{
        type:String
    } , 
    country :{type:String} , 
    reviews:[
      {
        type:Schema.Types.ObjectId , 
        ref : "Review"
      }
    ] , 
    owner:{
      type:Schema.Types.ObjectId , 
      ref :"User" , 
    } , 
    category:{
      type:String , 
      enum:["Trending" , "Rooms" , "Mountains" , "Farms" , "Pools" , "Snow" ,"Camping" , "Iconic Places" , "Beaches" , "Domes" ]
    }


})
HotelSchema.post("findOneAndDelete" , async (listing)=>{
if(listing){
  await Hotel.deleteMany({_id:{$in:listing.reviews}})
}
})
const Hotel = new mongoose.model( "Hotel", HotelSchema);
module.exports =  Hotel