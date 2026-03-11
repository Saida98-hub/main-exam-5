const Model = require("../schema/model.schema")

const getAllModels = async (req, res, next) => {
    try {

        const models = await Model.find().populate("brandInfo")

        res.status(200).json(models)

    } catch (error) {
        next(error)
    }
}


const getOneModel = async (req, res, next) => {
    try {

        const { id } = req.params

        const model = await Model.findById(id).populate("brandInfo")

        res.status(200).json(model)

    } catch (error) {
        next(error)
    }
}


const addModel = async (req, res, next) => {
    try {

        const { title, price, imageURL, brandInfo } = req.body

        const model = await Model.create({
            title,
            price,
            imageURL,
            brandInfo
        })

        res.status(201).json(model)

    } catch (error) {
        next(error)
    }
}


const updateModel = async (req, res, next) => {
    try {

        const { id } = req.params
        const { title, price, imageURL, brandInfo } = req.body

        await Model.findByIdAndUpdate(id, {
            title,
            price,
            imageURL,
            brendInfo
        })

        res.status(200).json({
            message: "Model updated"
        })

    } catch (error) {
        next(error)
    }
}


const deleteModel = async (req, res, next) => {
    try {

        const { id } = req.params

        await Model.findByIdAndDelete(id)

        res.status(200).json({
            message: "Model deleted"
        })

    } catch (error) {
        next(error)
    }
}


const getModelsByBrand = async (req, res, next) => {
    try {

        const { brandId } = req.params

        const models = await Model.find({ brandInfo: brandId })
            .populate("brandInfo")

        res.status(200).json(models)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllModels,
    getOneModel,
    addModel,
    updateModel,
    deleteModel,
    getModelsByBrand
}