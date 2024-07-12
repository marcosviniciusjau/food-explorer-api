const { verify } = require('jsonwebtoken')
const AppError  = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers 

  if (!authHeader.cookie) {
    throw new AppError('JWT Token não informado', 401) 
  }

  const [, token] = authHeader.cookie.split('token=') 

  try {
    const { sub: admin_id } = verify(token, authConfig.jwt.secret) 

    request.admin = {
      id: Number(admin_id),
    }

    return next() 
  } catch {
    throw new AppError('Token inválido', 401) 
  }
}
module.exports = ensureAuthenticated