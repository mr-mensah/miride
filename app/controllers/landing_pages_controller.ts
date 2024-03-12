// import type { HttpContext } from '@adonisjs/core/http'

import Car from '#models/car'
import { HttpContext } from '@adonisjs/core/http'

export default class LandingPagesController {
  async index({ view }: HttpContext) {
    const featuredCars = await Car.query().preload('brand').preload('category').limit(12)

    return view.render('pages/home', { featuredCars: featuredCars, title: 'home' })
  }

  async cars({ view, request }: HttpContext) {
    const page = request.input('page') || 1
    const cars = await Car.query()
      .orderBy('createdAt', 'desc')
      .preload('brand')
      .preload('category')
      .paginate(page, 3)

    cars.baseUrl('/cars')

    const pages = new Array(cars.getMeta().lastPage).fill(null).map((_, i) => i + 1)

    return view.render('pages/cars', { cars: cars, pages: pages, title: 'cars' })
  }

  async viewCar({ view, request }: HttpContext) {
    const id: number = request.param('id')
    const car = await Car.query().preload('brand').preload('category').where('id', id).first()
    return view.render('pages/view_car', { car: car, title: 'cars' })
  }

  async bookCar({ view, request }: HttpContext) {
    const id: number = request.param('id')
    const car = Car.findOrFail(id)
    return view.render('pages/view_car', { car: car, title: 'cars' })
  }
}
