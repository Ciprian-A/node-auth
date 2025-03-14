import {Request, Response} from 'express'
// import {v4 as uuidv4} from 'uuid'
import {getUsers} from '../services/users.service'
import {StatusCodes} from 'http-status-codes'
import ClientError from '../middlewares/error/clientError'

export const getUsersHandler = async (
	_req: Request,
	res: Response
): Promise<any> => {
	try {
		const users = await getUsers()
		res.status(StatusCodes.OK).json(users)
		return
	} catch (error) {
		if (error instanceof ClientError) {
			console.warn('Client error occurred:', error)
			res.status(error.statusCode).json({message: error.message})
			return
		} else {
			console.error('Error occurred:', error)
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: `Error occurred: ${error}`
			})
			return
		}
	}
}
