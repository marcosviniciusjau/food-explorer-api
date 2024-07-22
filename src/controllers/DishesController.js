const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage") 
class DishesController {
  async create(request, response) {
    const { name, description, category, image, ingredients } = request.body
    
    const user_id  = request.user.id    
    const photoFilename = request.file.image

    const diskStorage = new DiskStorage() 

    const checkDishExists = await knex("dishes").where({ name: name }).orderBy("name")
  
    if (checkDishExists === name){
      throw new AppError("Este prato já existe")
    }
    const filename = await diskStorage.saveFile(photoFilename)


    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      image: filename,
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
  async update(request, response) {
    const { name, description, category, image, ingredients } = request.body
  
    const { user } = request;
    const photoFilename = request.file.image 
    const diskStorage = new DiskStorage() 

    const dish = await knex("dishes").where({ user_id: user.id }).first()
   
    if(!dish) {
     throw new AppError("user não encontrado")
    }

    dish.name = name ?? dish.name
    dish.description = description ?? dish.description
    dish.category = category ?? dish.category
  
    if (dish.image) {
      await diskStorage.deleteFile(dish.image) 
    }

    dish.ingredients = ingredients ?? dish.ingredients

    const filename = await diskStorage.saveFile(photoFilename) 
    dish.image = filename 
     await knex("dishes").where({ id: user_id }).update({
       name: dish.name,
       description: dish.description,
       category: dish.category,
       ingredients: dish.ingredients
     })

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