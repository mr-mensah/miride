/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { CarCategoryFactory } from '#database/factories/car_category_factory'
import { CarBrandFactory } from '#database/factories/car_brand_factory'
import { CarFactory } from '#database/factories/car_factory'
router.on('/').render('pages/home')

router
  .get('/init', async () => {
    await CarCategoryFactory.createMany(5)
    await CarBrandFactory.createMany(4)
    await CarFactory.createMany(5)
  })
  .as('init')
