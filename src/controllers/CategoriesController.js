const knex = require("../database/knex")

class CategoriesController {
  async index(request, response) {
    const {user} = request
    const categories = await knex("categories").where({ user_id: user.id })

    return response.json(categories)
  }
}

module.exports = CategoriesController