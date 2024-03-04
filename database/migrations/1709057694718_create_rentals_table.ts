import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rentals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('car_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('rented_by').unsigned()
      table.decimal('price', 8, 2).notNullable()
      table
        .enum('status', ['PENDING', 'ACTIVE', 'RETURNED', 'PAID'], {
          useNative: true,
          enumName: 'user_account_status',
          existingType: false,
        })
        .notNullable()
        .defaultTo('PENDING')
      table.timestamp('started_at').nullable()
      table.timestamp('ended_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
      table.foreign('car_id').references('cars.id')
      table.foreign('user_id').references('users.id')
      table.foreign('rented_by').references('users.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
