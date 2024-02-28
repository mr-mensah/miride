import factory from '@adonisjs/lucid/factories'
import Car from '#models/car'
import CarBrand from '#models/car_brand'
import CarCategory from '#models/car_category'

export const CarFactory = factory
  .define(Car, async ({ faker }) => {
    return {
      name: faker.vehicle.model(),
      imageUrl: faker.internet.url(),
      description: faker.lorem.sentences(5),
    }
  })
  .relation('brand', () => CarBrand)
  .relation('category', () => CarCategory)
  .build()
