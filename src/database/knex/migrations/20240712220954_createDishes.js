exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id") 
  table.text("name").notNullable()  
  table.text("description") 
  table.text("price").notNullable() 

  table.text("image").notNullable() 

  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE") 
  table.integer("category_id").references("id").inTable("categories").notNullable()

  table.timestamp("created_at").default(knex.fn.now()) 
  table.timestamp("updated_at").default(knex.fn.now()) 
}) 

exports.down = knex => knex.schema.dropTable("dishes") 