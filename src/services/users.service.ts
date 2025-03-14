import {PrismaClient} from '@prisma/client'
// import bcrypt from 'bcryptjs'
// import ClientError from '../middlewares/error/clientError'
import {StatusCodes} from 'http-status-codes'

const prisma = new PrismaClient()
export const getUsers = async (): Promise<any> => {
	try {
		const users = await prisma.user.findMany()
		return users
	} catch (error) {
		console.error('Error occurred when getting users:', error)
		throw new Error(
			`Error occurred when getting users, statusCode: ${StatusCodes.INTERNAL_SERVER_ERROR}, error: ${error}`
		)
	}
}
