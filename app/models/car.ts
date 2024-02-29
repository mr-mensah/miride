import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import CarBrand from './car_brand.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Rental from './rental.js'
import CarCategory from './car_category.js'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare brandId: number

  @column()
  declare categoryId: number

  @column()
  declare imageUrl: string | null

  @belongsTo(() => CarBrand, { localKey: 'brandId', foreignKey: 'id' })
  declare brand: BelongsTo<typeof CarBrand>

  @hasMany(() => Rental)
  declare rentals: HasMany<typeof Rental>

  @hasOne(() => CarCategory, { localKey: 'categoryId', foreignKey: 'id' })
  declare category: HasOne<typeof CarCategory>
}
