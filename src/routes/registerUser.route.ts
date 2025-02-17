import {Router} from 'express'
import {createUserHandler} from '../controllers/registerUser.controller'

export const registerUserRouter = Router()
registerUserRouter.post('/', createUserHandler)
