import {Router} from 'express'
import {registerUserHandler} from '../controllers/registerUser.controller'
import {validateRequestBody} from '../middlewares/validation/request'
import {registerUserSchema} from '../middlewares/validation/user.schema'

export const registerUserRouter = Router()
registerUserRouter.post(
	'/',
	validateRequestBody(registerUserSchema),
	registerUserHandler
)
