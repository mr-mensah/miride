// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ view, request }: HttpContext) {
    console.log(request.url())
    // return `The URL is ${request.url()}`
    return view.render('auth/login')
  }

  async register({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async doLogin({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.json(user)
    // response.redirect().toRoute
  }

  async doRegister({ request, response, auth }: HttpContext) {
    const { fullName, email, password, role } = request.only([
      'fullName',
      'email',
      'password',
      'role',
    ])

    const user = await User.firstOrCreate(
      { email: email },
      { fullName: fullName, password: password, role: role }
    )

    await auth.use('web').login(user)

    return response.json(user.role)
    // response.redirect().toRoute
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login.create')
  }
}
