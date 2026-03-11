const mongoose = require("mongoose")

async function connectDb() {

    await mongoose.connect(process.env.MONGO_URI).then(() =>
        console.log("Conected to db "))
        .catch((error) => console.log(error.message))  // agar bog'lanishda xatolik bo'lsa catchda tutvolsin
}

module.exports = connectDb