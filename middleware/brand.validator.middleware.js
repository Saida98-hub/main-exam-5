const CustomErrorhandler = require("../error/custom-error.handler")
const brandValidator = require("../validator/brend.validate")

module.exports = function (req, res, next) {
  const { error } = brandValidator(req.body)

  if (error) {
    throw CustomErrorhandler.BadRequest(error.message)
  }

  next()
}