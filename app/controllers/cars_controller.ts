import Car from '#models/car'
import CarBrand from '#models/car_brand'
import CarCategory from '#models/car_category'
import { validateCreateCar, validateUpdateCar } from '#validators/car'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export default class CarsController {
  /**
   * Display a list of resource
   */
  async index({ view, auth }: HttpContext) {
    const cars = await Car.query()
      .where('ownerId', auth.user!.id)
      .orderBy('createdAt', 'desc')
      .preload('brand')
      .preload('category')
      .preload('rentals')
      .paginate(1, 20)
    return view.render('vendor/cars/index', {
      cars: cars,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const carCategories = await CarCategory.all()
    const carBrands = await CarBrand.all()
    return view.render('vendor/cars/create', {
      carCategories: carCategories,
      carBrands: carBrands,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(validateCreateCar)

    //Upload to cloudinary and return url
    try {
      const carImage = payload.image
      await carImage.move(app.makePath('uploads'), { name: `${cuid()}.${carImage.extname}` })

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
        imageUrl: carImage.fileName!,
        ownerId: auth.user!.id,
      })
      session.flash({ success: 'Successfully added car' })
      return response.redirect().toRoute('vendor.cars.index')
    } catch (e) {
      session.flash({ error: e })
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
    const carCategories = await CarCategory.all()
    const carBrands = await CarBrand.all()
    return view.render('vendor/cars/edit', {
      car: car,
      carCategories: carCategories,
      carBrands: carBrands,
    })
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
