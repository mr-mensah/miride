import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true

export const validateCreateCar = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string(),
    mileage: vine.number().positive(),
    seats: vine.number().positive(),
    price: vine.number().positive(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp'],
    }),
    transmission: vine.string(),
    fuelType: vine.string(),
    brandId: vine.number().positive(),
    categoryId: vine.number().positive(),
  })
)

export const validateUpdateCar = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string(),
    mileage: vine.number().positive(),
    seats: vine.number().positive(),
    price: vine.number().positive(),
    image: vine
      .file({
        size: '1mb',
        extnames: ['jpg', 'png', 'jpeg', 'bmp'],
      })
      .optional(),
    transmission: vine.string(),
    fuelType: vine.string(),
    brandId: vine.number().positive(),
    categoryId: vine.number().positive(),
  })
)
