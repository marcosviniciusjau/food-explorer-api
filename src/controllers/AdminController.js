const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require("../database/knex")
class AdminController {
  async create(request, response) {
    const { name, email, password } = request.body

   const admin = await knex("admins").where({ email })

    if (admin.length > 0){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("admins").insert({
      name,
      email,
      password: hashedPassword
    })
    return response.status(201).json()
  }

  async update(request, response) {
     const { name, email, password, old_password } = request.body
     const admin_id  = request.admin.id

     const admin = await knex("admins")
      .where({ id: admin_id })
    
     if(!admin) {
      throw new AppError("Admin não encontrado")
     }

     const adminWithUpdatedEmail = await knex("admins").select("email").where({ email })

     if(adminWithUpdatedEmail && adminWithUpdatedEmail.id !== admin.id) {
      throw new AppError("Este e-mail já está em uso.")
     }

     admin.name = name ?? admin.name
     admin.email= email ?? admin.email

     if(password && old_password) {
      const checkOldPassword = await compare(old_password, admin.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      admin.password = await hash(password, 8)
     }

      await knex("admins").where({ id: admin_id }).update({
        name: admin.name,
        email: admin.email,
        password: admin.password
      })

    return response.json()
  }
}

module.exports = AdminController