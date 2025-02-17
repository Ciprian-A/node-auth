import {Request, Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import {clientError, registerUser} from '../services/registerUser.service'

export const createUserHandler = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {firstname, lastname, email, password} = req.body
	try {
		await registerUser(uuidv4(), firstname, lastname, email, password)
		res.status(201).json({message: 'New user created successfully!'})
	} catch (error) {
		res.status(500).json({message: clientError(error)})
	}
}
