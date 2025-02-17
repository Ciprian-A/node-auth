import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

export const clientError = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message
	}
	return String(error)
}

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
		throw new Error('Missing credentials')
	}
	const existingUser = await prisma.user.findMany({
		where: {
			email
		}
	})
	if (existingUser.length)
		throw new Error('User with this email address already exists!')

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
		console.log(`Error when creating new user: ${clientError(error)})`)
	}
}
