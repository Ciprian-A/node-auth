import {Request, Response} from 'express'

export const getHealthHandler = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		res.header('Content-Type', 'application/json').send({status: 'UP'})
	} catch (error) {
		res.status(500).end(error)
	}
}
