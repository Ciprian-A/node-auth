import express, {Express} from 'express'
import {getHealthHandler} from './controllers/healthCheck.controller'
const HEALTH_ENDPOINT = '/api/v1/health'
export const createApp = async (): Promise<{app: Express}> => {
	const app = express()
	app.use(express.json())

	app.use(HEALTH_ENDPOINT, getHealthHandler)
	return {app}
}
