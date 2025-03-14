import {z} from 'zod'
import {registerUserSchema} from '../middlewares/validation/user.schema'

export type UserDto = {
	firstname: string
	lastname: string
	email: string
	password: string
}
export type RegisterUser = z.infer<typeof registerUserSchema>
