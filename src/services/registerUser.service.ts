import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import ClientError from '../middlewares/error/clientError'
import {StatusCodes} from 'http-status-codes'
import {unknownError} from '../middlewares/error/unknownError'

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
	const existingUser = await prisma.user.findMany({
		where: {
			email
		}
	})
	if (existingUser.length)
		throw new ClientError(
			'User with this email address already exists!',
			StatusCodes.CONFLICT
		)

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds)
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
		throw new ClientError(
			`Error when creating new user: ${unknownError(error)})`,
			StatusCodes.INTERNAL_SERVER_ERROR
		)
	}
}
