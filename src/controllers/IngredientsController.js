const knex = require("../database/knex")

class IngredientsController {
  async index(request, response) {
    const {user} = request
    const ingredients = await knex("ingredients")
    .where({ user_id: user.id })

    return response.json(ingredients)
  }
}

module.exports = IngredientsController