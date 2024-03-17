// import type { HttpContext } from '@adonisjs/core/http'

import Rental from '#models/rental'
import { HttpContext } from '@adonisjs/core/http'

export default class UserDashboardController {
  async home({ view, auth }: HttpContext) {
    const rentals = await Rental.query()
      .where('userId', auth.user!.id)
      .preload('car')
      .preload('user')
      .preload('rentProvider')
    return view.render('user/home', { rentals: rentals })
  }
}
