// import type { HttpContext } from '@adonisjs/core/http'

import Rental from '#models/rental'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminDashboardController {
  async index({ view }: HttpContext) {
    return view.render('admin/home')
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
