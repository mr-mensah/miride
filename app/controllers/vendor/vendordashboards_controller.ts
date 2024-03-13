import Car from '#models/car'
import Rental from '#models/rental'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendorDashboardController {
  async index({ view, auth }: HttpContext) {
    const rentals = await Rental.query()
      .where('rentedBy', auth.user!.id)
      .preload('car')
      .preload('user')
    const cars = await Car.query().where('ownerId', auth.user!.id).orderBy('createdAt', 'desc')
    // .paginate(1, 20)
    return view.render('vendor/home', { cars: cars, rentals: rentals })
  }

  async rentals({ view, auth }: HttpContext) {
    const rentals = await Rental.query()
      .where('rentedBy', auth.user!.id)
      .preload('car')
      .preload('user')
    return view.render('vendor/rentals/index', { rentals: rentals })
  }
}
