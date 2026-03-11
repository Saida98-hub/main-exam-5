const { Schema, model } = require("mongoose");

const brand = new Schema ({
    brandname: {
    type: String,
    required: true
    },

    imageUrl: {
        type: String,
        required: true
    }
})

const brandSchema = model("brand", brand)
module.exports = brandSchema