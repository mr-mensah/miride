import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('transmission', ['MANUAL', 'AUTOMATIC']).nullable()
      table.enum('fuel_type', ['PETROL', 'DIESEL', 'GASOLINE', 'ELECTRIC', 'HYBRID']).nullable()
      table.integer('mileage').unsigned().defaultTo(0)
      table.tinyint('seats', 2).unsigned().defaultTo(1)
    })
  }

  async down() {
    // this.schema.dropTable(this.tableName)
  }
}
