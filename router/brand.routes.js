const {Router} = require("express")
const { getAllbrand, search, getOnebrand, addbrand, updatebrand, deletebrand } = require("../controller/brand.controller")

const brandRouter = Router()

brandRouter.get("/get_all_brand", getAllbrand)
brandRouter.get("/search_brand", search)
brandRouter.get("/get_one_brand/:id", getOnebrand)
brandRouter.post("/add_brand", addbrand)
brandRouter.put("/update_brand/:id", updatebrand)
brandRouter.delete("/delete_brand/:id", deletebrand)

module.exports = brandRouter