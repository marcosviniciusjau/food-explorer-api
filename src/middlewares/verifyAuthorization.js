const AppError = require("../utils/AppError")

function verifyAuthorization(roleToVerify) {
  return (request, response, next) => {
    const {role} = request.user
    if(role !== roleToVerify){
      throw new AppError('Não autorizado para acessar este recurso',401)
    }
    return next()
  }
}

module.exports = verifyAuthorization