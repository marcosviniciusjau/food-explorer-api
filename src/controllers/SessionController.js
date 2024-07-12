const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")
class SessionController {
  async create(request, response) {
    const { email, password } = request.body
    const admin = await knex("admins").where({ email }).first()

    if(!admin){
      throw new AppError("E-mail ou senha inválidos",401)
    }

    const passwordMatched = await compare(password, admin.password)

    if(!passwordMatched){
      throw new AppError("E-mail ou senha inválidos",401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(admin.id),
      expiresIn
    })

    response.cookie("token", token, {
      maxAge: 15 * 60 * 1000, 
      httpOnly: true, 
      sameSite: "none",
      secure: true
    })
    delete admin.password

    return response.json({ admin, token })
  }
}

module.exports = SessionController