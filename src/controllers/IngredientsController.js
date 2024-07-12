const knex = require("../database/knex")

class MovieTagsController {
  async index(request, response) {
    const { admin_id } = request.params

    const ingredients = await knex("ingredients")
    .where({ admin_id })

    return response.json(ingredients)
  }
}

module.exports = MovieTagsController