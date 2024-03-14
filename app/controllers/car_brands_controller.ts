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
  async store({ request, response }: HttpContext) {
    const { name } = await request.all()
    await CarBrand.create({ name: name })
    return response.redirect().back()
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const id: number = params.id
    const carBrand = await CarBrand.findOrFail(id)
    return view.render('admin/brands/edit', { carBrand: carBrand })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, response, request }: HttpContext) {
    const id: number = params.id
    const { name } = await request.all()
    await CarBrand.updateOrCreate({ id: id }, { name: name })
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const id: number = params.id
    const carBrand = await CarBrand.findOrFail(id)
    carBrand.delete()
    return response.redirect().back()
  }
}
