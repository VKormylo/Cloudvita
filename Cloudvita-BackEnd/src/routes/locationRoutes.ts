import express from 'express'
import * as locationController from './../controllers/locationController'
import * as locationMiddleware from './../middlewares/locationMiddleware'
import * as authController from './../controllers/authController'

const router = express.Router()

router
  .route('/')
  .get(authController.protect, locationController.getLocations)
  .post(
    authController.protect,
    locationMiddleware.updateDate,
    locationController.createLocation
  )

router
  .route('/:id')
  .get(
    authController.protect,
    locationMiddleware.updateDate,
    locationController.getLocation
  )
  .patch(
    authController.protect,
    locationMiddleware.updateDate,
    locationController.updateLocation
  )
  .delete(authController.protect, locationController.deleteLocation)

export default router
