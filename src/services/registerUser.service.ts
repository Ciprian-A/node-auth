import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import ClientError from '../middlewares/error/clientError'
import {StatusCodes} from 'http-status-codes'

const prisma = new PrismaClient()
export const registerUser = async (
	userId: string,
	firstname: string,
	lastname: string,
	email: string,
	password: string
): Promise<void> => {
	const saltRounds = 10
	if (!firstname || !lastname || !email || !password) {
		throw new ClientError(
			'Missing credentials',
			StatusCodes.UNPROCESSABLE_ENTITY
		)
	}

	const existingUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (existingUser) {
		throw new ClientError(
			'User with this email address already exists!',
			StatusCodes.CONFLICT
		)
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds)

	try {
		await prisma.user.create({
			data: {
				id: userId,
				firstname,
				lastname,
				email,
				password: hashedPassword
			}
		})
	} catch (error) {
		console.error('Error occurred when creating new user:', error)
		throw new Error(
			`Error occurred when creating new user, statusCode: ${StatusCodes.INTERNAL_SERVER_ERROR}, error: ${error}`
		)
	}
}
