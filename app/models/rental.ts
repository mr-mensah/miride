import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Car from './car.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Rental extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: false })
  declare startedAt: DateTime

  @column.dateTime({ autoCreate: false })
  declare endedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare carId: number

  @column()
  declare price: number

  @column()
  declare status: string

  @column()
  declare rentedBy: number

  @column()
  declare userId: number

  @hasOne(() => Car)
  declare car: HasOne<typeof Car>

  @hasOne(() => User, {
    localKey: 'rented_by',
    foreignKey: 'id',
  })
  declare rentProvider: HasOne<typeof User>

  @belongsTo(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  declare user: BelongsTo<typeof User>
}
