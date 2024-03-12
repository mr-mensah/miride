import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Rental from './rental.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Car from './car.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare role: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Rental, { localKey: 'id', foreignKey: 'userId' })
  declare rentals: HasMany<typeof Rental>

  @hasMany(() => Rental, { localKey: 'id', foreignKey: 'rentedBy' })
  declare rentProvided: HasMany<typeof Rental>

  @hasMany(() => Car, { localKey: 'id', foreignKey: 'ownerId' })
  declare cars: HasMany<typeof Car>
}
