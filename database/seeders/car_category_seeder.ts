import CarCategory from '#models/car_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  carBodyStyles: string[] = [
    'Sedan',
    'Hatchback',
    'SUV',
    'Crossover',
    'Coupe',
    'Convertible',
    'Wagon',
    'Van',
    'Pickup Truck',
    'Minivan',
    'Roadster',
    'Limousine',
    'Compact',
    'Subcompact',
    'Muscle Car',
    'Luxury Car',
    'Electric Car',
    'Hybrid Car',
    'Off-road Vehicle',
    'Supercar',
  ]
  async run() {
    // Write your database queries inside the run method
    this.carBodyStyles.forEach(async (bodyStyle) => {
      await CarCategory.create({ name: bodyStyle })
    })
  }
}
