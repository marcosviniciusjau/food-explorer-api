const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")
class SessionController {
  async create(request, response) {
    const { email, password } = request.body
    const user = await knex("users").where({ email }).first()

    if(!user){
      throw new AppError("E-mail ou senha inválidos",401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      throw new AppError("E-mail ou senha inválidos",401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({role: user.role}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.cookie("token", token, {
      maxAge: 15 * 60 * 1000, 
      httpOnly: true, 
      sameSite: "none",
      secure: true
    })
    delete user.password

    return response.json({ user, token })
  }
}

module.exports = SessionController