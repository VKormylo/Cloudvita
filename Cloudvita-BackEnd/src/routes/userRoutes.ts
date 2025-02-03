import express from 'express'
import * as authController from '../controllers/authController'
import * as userController from '../controllers/userController'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.delete('/deleteMe', authController.protect, userController.deleteMe)

router.route('/').get(userController.getAllUsers)

export default router
