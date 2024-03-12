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
import { CarFactory } from '#database/factories/car_factory'
import { CarBrandFactory } from '#database/factories/car_brand_factory'
const AdminDashboardController = () => import('#controllers/admin/admindashboards_controller')
const VendorDashboardController = () => import('#controllers/vendor/vendordashboards_controller')
const UserDashboardController = () => import('#controllers/user/userdashboards_controller')
const LandingPagesController = () => import('#controllers/landing_pages_controller')
const AuthController = () => import('#controllers/auth_controller')
const CarBrandsController = () => import('#controllers/car_brands_controller')
const CarCategoriesController = () => import('#controllers/car_categories_controller')
const CarsController = () => import('#controllers/cars_controller')

router
  .get('/init', async () => {
    // await CarCategoryFactory.createMany(5)
    await CarBrandFactory.createMany(4)
    await CarFactory.createMany(5)
  })
  .as('init')

router.get('/', [LandingPagesController, 'index']).as('home')
router.get('/cars', [LandingPagesController, 'cars']).as('cars')
router.get('/cars/view/:id', [LandingPagesController, 'viewCar']).as('cars.view')
router
  .get('/cars/book/:id', [LandingPagesController, 'bookCar'])
  .as('cars.book')
  .use([middleware.auth(), middleware.userRole({ role: 'user' })])

router.on('/about').render('pages/about', { title: 'about' }).as('about')
router.on('/services').render('pages/services', { title: 'services' }).as('services')
router.on('/contact').render('pages/contact', { title: 'contact' }).as('contact')

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
    router.get('/', [AdminDashboardController, 'index']).as('home')
    router.get('users', [AdminDashboardController, 'users']).as('users')
    router.get('vendors', [AdminDashboardController, 'vendors']).as('vendors')
    router.get('rentals', [AdminDashboardController, 'rentals']).as('rentals')
    router.resource('car_categories', CarCategoriesController).except(['show', 'create'])
    router.resource('car_brands', CarBrandsController).except(['show', 'create'])
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/admin')
  .as('admin')
  .use([middleware.auth(), middleware.userRole({ role: 'admin' })])

// User Routes
router
  .group(() => {
    router.get('/', [UserDashboardController, 'home']).as('home')
    router.get('rentals', () => {}).as('rentals')
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/user')
  .as('user')
  .use([middleware.auth(), middleware.userRole({ role: 'user' })])

// Vendor Routes
router
  .group(() => {
    router.get('/', [VendorDashboardController, 'index']).as('home')
    router.resource('cars', CarsController)
    router.get('rentals', [VendorDashboardController, 'rentals']).as('rentals')
    router.get('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('/vendor')
  .as('vendor')
  .use([middleware.auth(), middleware.userRole({ role: 'vendor' })])
