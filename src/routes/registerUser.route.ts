import {Router} from 'express'
import {registerUserHandler} from '../controllers/registerUser.controller'

export const registerUserRouter = Router()
registerUserRouter.post('/', registerUserHandler)
