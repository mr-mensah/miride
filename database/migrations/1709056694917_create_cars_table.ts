import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description').nullable()
      table.string('name').notNullable()
      table.string('image_url').nullable()
      table.decimal('price', 8, 2).notNullable().defaultTo(0)
      table.integer('brand_id').unsigned()
      table.integer('category_id').unsigned()
      table.integer('owner_id').unsigned()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.foreign('brand_id').references('car_brands.id')
      table.foreign('category_id').references('car_categories.id')
      table.foreign('owner_id').references('users.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
