const AppError = require('../utils/AppError')
const knex = require("../database/knex")

class adminsValidatedController {
  async index(request, response) {
    const { admin } = request

    const checkadminExists = await knex("admins").where({ id: admin.id })

    if (checkadminExists.length === 0){
      throw new AppError("Não autorizado para acessar este recurso", 401)
    }

    return response.status(200).json()
  }

}

module.exports = adminsValidatedController