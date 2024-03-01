/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const CarBrandsController = () => import('#controllers/car_brands_controller')
const CarCategoriesController = () => import('#controllers/car_categories_controller')
const CarsController = () => import('#controllers/cars_controller')
// const AuthController = () => import('#controllers/auth_controller')

// router
//   .get('/init', async () => {
//     await CarCategoryFactory.createMany(5)
//     await CarBrandFactory.createMany(4)
//     await CarFactory.createMany(5)
//   })
//   .as('init')

router.get('/', async ({ view }) => {
  return view.render('pages/home')
})

//   Auth routes
router.get('/login', [AuthController, 'login']).as('auth.login.create').use(middleware.guest())
router.post('/login', [AuthController, 'doLogin']).as('auth.login')
router
  .get('/register', [AuthController, 'register'])
  .as('auth.register.create')
  .use(middleware.guest())
router.post('/register', [AuthController, 'doRegister']).as('auth.register')

// Admin Routes
router
  .group(() => {
    router.get('/', () => {}).as('home')
    router.get('users', () => {}).as('users')
    router.get('rentals', () => {}).as('rentals')
    router.resource('car_categories', CarCategoriesController)
    router.resource('car_brands', CarBrandsController)
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/admin')
  .as('admin')
  .use([middleware.auth(), middleware.userRole({ role: 'admin' })])

// User Routes
router
  .group(() => {
    router.get('/', () => {}).as('home')
    router.get('rentals', () => {}).as('rentals')
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/user')
  .as('user')
  .use([middleware.auth(), middleware.userRole({ role: 'user' })])

// Vendor Routes
router
  .group(() => {
    router.get('/', () => {}).as('home')
    router.resource('cars', CarsController)
    router.get('rentals', () => {}).as('rentals')
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/vendor')
  .as('vendor')
  .use([middleware.auth(), middleware.userRole({ role: 'vendor' })])
