import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type UserRoles = 'admin' | 'user' | 'vendor'

export default class UserRoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { role: UserRoles; guards?: (keyof Authenticators)[] }
  ) {
    /**
     * Middleware logic goes here (before the next call)
     */

    // Check if the user is authenticated
    if (!ctx.auth.isAuthenticated) {
      // If not authenticated, redirect to the login page
      return ctx.response.redirect().toRoute('login')
    }

    const { role } = options

    // Check if the user's role is admin
    if (ctx.auth.user!.role !== role.toUpperCase()) {
      // If the user's role is not admin, redirect to the login page
      return ctx.response.redirect().toRoute('auth.login.create')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
