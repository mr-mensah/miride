import CarCategory from '#models/car_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CarCategoriesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const categories = await CarCategory.query().preload('cars')
    return view.render('admin/categories/index', { carCategories: categories })
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
    await CarCategory.create({ name: name })
    return response.redirect().back()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const id: number = params.id
    const carCategory = await CarCategory.findOrFail(id)
    return view.render('admin/categories/edit', { carCategory: carCategory })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, response, request }: HttpContext) {
    const id: number = params.id
    const { name } = await request.all()
    await CarCategory.updateOrCreate({ id: id }, { name: name })
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const id: number = params.id
    const carCategory = await CarCategory.findOrFail(id)
    carCategory.delete()
    return response.redirect().back()
  }
}
