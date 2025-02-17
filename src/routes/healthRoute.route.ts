import {Router} from 'express'
import {getHealthHandler} from '../controllers/healthCheck.controller'

export const healthRouter = Router()

healthRouter.get('/', getHealthHandler)
