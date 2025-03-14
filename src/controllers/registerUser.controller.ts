import {Request, Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import {registerUser} from '../services/auth/registerUser.service'
import {StatusCodes} from 'http-status-codes'
import ClientError from '../middlewares/error/clientError'

export const registerUserHandler = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {firstname, lastname, email, password} = req.body

	try {
		await registerUser(uuidv4(), firstname, lastname, email, password)
		res
			.status(StatusCodes.CREATED)
			.json({message: 'New user created successfully!'})
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
