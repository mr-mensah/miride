// import type { HttpContext } from '@adonisjs/core/http'

import Car from '#models/car'
import CarBrand from '#models/car_brand'
import CarCategory from '#models/car_category'
import Rental from '#models/rental'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminDashboardController {
  async index({ view }: HttpContext) {
    const users = await User.query().where('role', 'USER').preload('rentals')
    const vendors = await User.query()
      .where('role', 'VENDOR')
      .preload('rentProvided')
      .preload('cars')
    const cars = await Car.all()
    const rentals = await Rental.query().preload('rentProvider').preload('user').preload('car')

    return view.render('admin/home', {
      users: users,
      vendors: vendors,
      rentals: rentals,
      cars: cars,
    })
  }

  async users({ view }: HttpContext) {
    const users = await User.query().where('role', 'USER').preload('rentals')
    return view.render('admin/users/index', { users: users })
  }

  async vendors({ view }: HttpContext) {
    const vendors = await User.query()
      .where('role', 'VENDOR')
      .preload('rentProvided')
      .preload('cars')
    return view.render('admin/vendors/index', { vendors: vendors })
  }

  async rentals({ view }: HttpContext) {
    const rentals = await Rental.query().preload('rentProvider').preload('user').preload('car')
    return view.render('admin/rentals/index', { rentals: rentals })
  }
}
