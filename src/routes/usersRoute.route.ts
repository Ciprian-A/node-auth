import {Router} from 'express'
import {getUsersHandler} from '../controllers/users.controller'
// import {validateRequestBody} from '../middlewares/validation/request'
// import {registerUserSchema} from '../middlewares/validation/user.schema'

export const usersRouter = Router()
usersRouter.get('/', getUsersHandler)
