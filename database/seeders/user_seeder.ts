import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'user@miride.com',
        password: 'secret',
        role: 'USER',
      },
      {
        email: 'admin@miride.com',
        password: 'secret',
        role: 'ADMIN',
      },
      {
        email: 'vendor@miride.com',
        password: 'secret',
        role: 'VENDOR',
      },
    ])
  }
}
