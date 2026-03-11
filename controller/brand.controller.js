const CustomErrorhandler = require("../error/custom-error.handler")
const brandSchema = require("../schema/brand.schema")


const getAllBrand = async (req,res, next)=>{
try{
  const brand=await brandSchema.find()

  res.status(200).json(brand)
}catch(error){
  next(error)
}
}

const search  = async (req,res, next)=>{
try{
  const {searchingValue}=req.query
  const result=await brandSchema.find({
    brandName: { $regex: searchingValue, $options: "i"}
  })

  res.status(200).json(result)
}catch(error){
  next(error)
}
}

const getOneBrand = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedBrand=await brandSchema.findById(id)

  if(!foundedBrand){
    throw CustomErrorhandler.NotFound("Brand not found")
  }

  res.status(200).json(foundedBrand)
}catch(error){
  next(error)
}
}

const addBrand = async (req,res, next)=>{
try{
 const {brandName, imageURL}=req.body

 await brandSchema.create({brandName, imageURL})

 res.status(201).json({
  message: "Added brand"
 })
}catch(error){
 next(error)
}
}

const updateBrand = async (req,res, next)=>{
try{
  const {brandName, imageURL}=req.body
  const {id}=req.params

  foundedBrand=await brandSchema.findById(id)

  if(!foundedBrand){
    throw CustomErrorhandler.NotFound("Brand not found")
  }

  await brandSchema.findByIdAndUpdate(id, {brandName, imageURL})

  res.status(200).json({
    message: "Updated brand"
  })
}catch(error){
 next(error)
}
}

const deleteBrand = async (req,res, next)=>{
try{
  const {id}=req.params

  foundedBrand=await brandSchema.findById(id)

  if(!foundedBrand){
    throw CustomErrorhandler.NotFound("Brand not found")
  }

  await brandSchema.findByIdAndDelete(id)

  res.status(200).json({
    message: "Deleted brand"
  })
}catch(error){
  next(error)
}
}


module.exports={
  getAllBrand,
  search,
  getOneBrand,
  addBrand,
  updateBrand,
  deleteBrand
}