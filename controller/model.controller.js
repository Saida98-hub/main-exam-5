const Model = require("../schema/model.schema")
const CustomErrorhandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const brandSchema = require("../schema/brand.schema")

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
    const {
      brandInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description
    } = req.body

    const foundedBrand = await brandSchema.findById(brandInfo)

    if (!foundedBrand) {
      throw CustomErrorhandler.NotFound("Brand not found")
    }

    if (!req.files || !req.files.insideImage || !req.files.outsideImage || !req.files.imageURL) {
      throw CustomErrorhandler.BadRequest("3 ta rasm ham yuklanishi kerak")
    }

    const newModel = await ModelSchema.create({
      brandInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description,
      insideImage: req.files.insideImage[0].path.replace(/\\/g, "/"),
      outsideImage: req.files.outsideImage[0].path.replace(/\\/g, "/"),
      imageURL: req.files.imageURL[0].path.replace(/\\/g, "/"),
      createdBy: req.user.id
    })

    res.status(201).json({
      message: "Added model",
      data: newModel
    })
  } catch (error) {
    next(error)
  }
}


const updateModel = async (req, res, next) => {
    try {
    const { id } = req.params

    const {
      brandInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description
    } = req.body

    const foundedModel = await ModelSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Model not found")
    }

    const foundedBrand = await brandSchema.findById(brandInfo)

    if (!foundedBrand) {
      throw CustomErrorhandler.NotFound("Brand not found")
    }

    const updateData = {
      brandInfo,
      title,
      tanirovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      price,
      description
    }

    if (req.files && req.files.insideImage) {
      removeFile(foundedModel.insideImage)
      updateData.insideImage = req.files.insideImage[0].path.replace(/\\/g, "/")
    }
 
    if (req.files && req.files.outsideImage) {
      removeFile(foundedModel.outsideImage)
      updateData.outsideImage = req.files.outsideImage[0].path.replace(/\\/g, "/")
    }

    if (req.files && req.files.imageURL) {
      removeFile(foundedModel.imageURL)
      updateData.imageURL = req.files.imageURL[0].path.replace(/\\/g, "/")
    }

    const updatedModel = await ModelSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      message: "Updated model",
      data: updatedModel
    })
  } catch (error) {
    next(error)
  }
}


const deleteModel = async (req, res, next) => {
try {
    const { id } = req.params

    const foundedModel = await ModelSchema.findOne({
      _id: id,
      createdBy: req.user.id
    })

    if (!foundedModel) {
      throw CustomErrorhandler.NotFound("Model not found")
    }

    removeFile(foundedModel.insideImage)
    removeFile(foundedModel.outsideImage)
    removeFile(foundedModel.imageURL)

    await ModelSchema.findByIdAndDelete(id)

    res.status(200).json({
      message: "Deleted model"
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