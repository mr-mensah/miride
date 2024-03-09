import Car from '#models/car'
import cloudinary from '#services/cloudinary_service'
import { validateCreateCar, validateUpdateCar } from '#validators/car'
import type { HttpContext } from '@adonisjs/core/http'

export default class CarsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const cars = await Car.query().orderBy('createdAt', 'desc').paginate(1, 20)
    return view.render('', { cars: cars })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('vendor/cars/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(validateCreateCar)

    //Upload to cloudinary and return url
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(payload.image.tmpPath!, {
        folder: 'miride/cars',
      })

      await Car.create({
        name: payload.name,
        description: payload.description,
        mileage: payload.mileage,
        seats: payload.seats,
        fuelType: payload.fuelType,
        brandId: payload.brandId,
        categoryId: payload.categoryId,
        price: payload.price,
        transmission: payload.transmission,
        imageUrl: cloudinaryResponse.secure_url,
        ownerId: auth.user?.id,
      })
      session.flash({ success: 'Successfully added car' })
      return response.redirect().back()
    } catch (e) {
      session.flash({ error: 'Error Uploading Image' })
      return response.redirect().back()
    }
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const car = await Car.findOrFail(params.id)
    return view.render('vendor/cars/show', { car: car })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const car = await Car.findOrFail(params.id)
    return view.render('vendor/cars/edit', { car: car })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const id: number = params.id
    const payload = await request.validateUsing(validateUpdateCar)
    const car = await Car.findOrFail(id)
    await car
      .merge({
        name: payload.name,
        description: payload.description,
        mileage: payload.mileage,
        seats: payload.seats,
        fuelType: payload.fuelType,
        brandId: payload.brandId,
        categoryId: payload.categoryId,
        price: payload.price,
        transmission: payload.transmission,
        // imageUrl: cloudinaryResponse.secure_url,
      })
      .save()
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const id: number = params.id
    const car = await Car.findOrFail(id)
    await car.delete()
    return response.redirect().back()
  }
}
