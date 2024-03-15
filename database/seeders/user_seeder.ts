import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Test User',
        email: 'user@miride.com',
        password: 'nosecret',
        role: 'USER',
      },
      {
        fullName: 'Test Admin',
        email: 'admin@miride.com',
        password: 'nosecret',
        role: 'ADMIN',
      },
      {
        fullName: 'Test Vendor',
        email: 'vendor@miride.com',
        password: 'nosecret',
        role: 'VENDOR',
      },
    ])
  }
}
