import {z} from 'zod'
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
export const registerUserSchema = z.object({
	firstname: z
		.string()
		.min(3, {message: 'Username must be at least three characters long.'}),
	lastname: z
		.string()
		.min(3, {message: 'Lastname must be at least 3 characters long.'}),
	email: z.string().email({message: 'Invalid email address.'}),
	password: z
		.string()
		.min(8, {message: 'Password needs to be at least 8 characters long.'})
		.max(10, 'Password should not be more than 12 characters long.')
		.regex(passwordRegEx, {
			message:
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
		})
})

