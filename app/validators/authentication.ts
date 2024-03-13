import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().alphaNumeric().minLength(8),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().alphaNumeric().minLength(8),
    // confirmPassword: vine.string().trim().alphaNumeric().confirmed(),
    role: vine.string().trim().minLength(4).maxLength(6),
    fullName: vine.string().trim(),
  })
)
