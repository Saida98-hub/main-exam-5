const { Schema, model } = require("mongoose");

const brand = new Schema ({
    brendName: {
      type: String,
      required: [true, "Brend nomi majburiy"],
      trim: true,
      minlength: [3, "Brend nomi kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxlength: [50,"Brend nomi juda uzun"],
    },

   imageURL: {
      type: String,
      required: [true, "Brend resm manzili majburiy"],
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        "Rasm havolasi noto'g'ri formatda",
      ],
    },

    createdBy:{
    type:Schema.Types.ObjectId,
    ref:"auth"
    },
    },
    {
    versionKey: false,
    timestamps: true,
    },
);


const brandSchema = model("brand", brand)
module.exports = brandSchema