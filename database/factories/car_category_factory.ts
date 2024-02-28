import factory from '@adonisjs/lucid/factories'
import CarCategory from '#models/car_category'

export const CarCategoryFactory = factory
  .define(CarCategory, async ({ faker }) => {
    return {
      name: faker.vehicle.type(),
    }
  })
  .build()
