const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db.config")
const brandRouter = require("./router/brand.routes")
require("dotenv").config()
const errorMiddleware = require("./middleware/error.middleware")
const cookieParser=require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const profileRouter = require("./routes/profil.routes")
const passwordRouter = require("./routes/profile.password.routes")
const Modelrouter = require("./routes/model.routes")

const PORT = process.env.PORT  ||  3000
const app = express()

connectDb()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// profile Upload
app.use("/uploads", express.static("uploads"))

// router
app.use(brandRouter)
app.use(authRouter)
app.use(profileRouter)
app.use(passwordRouter)
app.use(Modelrouter)

app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
    
})