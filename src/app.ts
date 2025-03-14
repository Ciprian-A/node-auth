import express, {Express} from 'express'

import {registerUserRouter} from './routes/registerUser.route'
import {usersRouter} from './routes/usersRoute.route'
import {healthRouter} from './routes/healthRoute.route'
const HEALTH_ENDPOINT = '/api/v1/health'
const USERS_ENDPOINT = '/api/v1/users'
const REGISTER_ENDPOINT = '/api/v1/auth/register'
export const createApp = async (): Promise<{app: Express}> => {
	const app = express()
	app.use(express.json())

	app.use(HEALTH_ENDPOINT, healthRouter)
	app.use(REGISTER_ENDPOINT, registerUserRouter)
	app.use(USERS_ENDPOINT, usersRouter)
	return {app}
}
