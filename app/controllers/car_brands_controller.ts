import CarBrand from '#models/car_brand'
import type { HttpContext } from '@adonisjs/core/http'

export default class CarBrandsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const carBrands = await CarBrand.query().preload('cars')
    return view.render('admin/brands/index', { carBrands: carBrands })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
