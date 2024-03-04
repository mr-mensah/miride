import vine from '@vinejs/vine'

export const validateCreateCar =  vine.compile(vine.object({
    name: vine.string().trim().alphaNumeric(),
    description: vine.string().
}))