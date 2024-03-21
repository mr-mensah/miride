import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/authentication'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  redirectTo: { [key: string]: string } = { ADMIN: '/admin', USER: '/user', VENDOR: '/vendor' }

  async login({ view, request }: HttpContext) {
    console.log(request.url())
    return view.render('auth/login')
  }

  async register({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async doLogin({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(payload.email, payload.password)
    await auth.use('web').login(user)

    response.redirect().toRoute(this.redirectTo[user!.role])
  }

  async doRegister({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.firstOrCreate(
      { email: payload.email },
      { fullName: payload.fullName, password: payload.password, role: payload.role }
    )

    await auth.use('web').login(user)

    // return response.json(payload)
    response.redirect().toRoute(this.redirectTo[user!.role])
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login.create')
  }
}
