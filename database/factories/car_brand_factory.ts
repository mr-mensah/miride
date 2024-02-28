import factory from '@adonisjs/lucid/factories'
import CarBrand from '#models/car_brand'

export const CarBrandFactory = factory
  .define(CarBrand, async ({ faker }) => {
    return {
      name: faker.vehicle.manufacturer(),
    }
  })
  .build()
