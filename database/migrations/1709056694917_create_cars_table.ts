import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description')
      table.string('name').unique()
      table.string('image_url').nullable()
      table.integer('brand_id').unsigned()
      table.integer('category_id').unsigned()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.foreign('brand_id').references('car_brands.id')
      table.foreign('category_id').references('car_categories.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
