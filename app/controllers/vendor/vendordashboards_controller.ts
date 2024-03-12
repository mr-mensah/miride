import Rental from '#models/rental'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendorDashboardController {
  async index({ view }: HttpContext) {
    return view.render('vendor/home')
  }

  async rentals({ view, auth }: HttpContext) {
    const rentals = await Rental.query()
      .where('rentedBy', auth.user!.id)
      .preload('car')
      .preload('user')
    return view.render('vendor/rentals/index', { rentals: rentals })
  }
}
