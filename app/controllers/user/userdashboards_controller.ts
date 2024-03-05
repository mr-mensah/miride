// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class UserDashboardController {
  async home({ view }: HttpContext) {
    return view.render('user/home')
  }
}
