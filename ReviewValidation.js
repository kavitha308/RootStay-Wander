const joi = require("joi")
module.exports .reviewsSchema = joi.object({
    reviews:joi.object({
    comment :joi.string().required() , 
    })
})
