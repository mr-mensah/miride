import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true

export const validateCreateCar = vine.compile(
  vine.object({
    name: vine.string().trim().alphaNumeric(),
    description: vine.string(),
    mileage: vine.number().positive(),
    seats: vine.number().positive(),
    price: vine.number().positive(),
    imageUrl: vine.string().optional(),
    transmission: vine.string(),
    fuelType: vine.string(),
    brandId: vine.number().positive(),
    categoryId: vine.number().positive(),
  })
)
