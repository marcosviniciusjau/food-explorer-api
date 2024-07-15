const knex = require("../database/knex")
const AppError = require("../utils/AppError")
class DishesController {
  async create(request, response) {
    const { name, description, category, image, ingredients } = request.body
    
    const user_id  = request.user.id
    const checkDishExists = await knex("dishes").where({ name: name }).orderBy("name")
  
    if (checkDishExists === name){
      throw new AppError("Este prato já existe")
    }
    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      image,
      user_id
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name,
        user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    const user_id  = request.user.id

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(tag => tag.trim())

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.user_id",
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name")
        
    } else {
      dishes = await knex("dishes")
      .where({ user_id })
      .whereLike("name", `%${name}%`)
      .orderBy("name")
    }

    const userIngredients = await knex("ingredients").where({ user_id })
    const dishesWithIngredients = dishes.map(dish => {
      const dishesIngredients = userIngredients.filter(tag => tag.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishesIngredients
      }
    })

    return response.json(dishesWithIngredients)
  }
}
module.exports = DishesController