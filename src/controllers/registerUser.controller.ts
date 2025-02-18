import {Request, Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import {registerUser} from '../services/registerUser.service'
import {StatusCodes} from 'http-status-codes'
import {unknownError} from '../middlewares/error/unknownError'

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
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({message: unknownError(error)})
	}
}
