import {NextFunction, Request, RequestHandler, Response} from 'express'
import {z} from 'zod'
import ClientError from '../error/clientError'

export const validateRequestBody = (
	requestInput: z.ZodSchema
): RequestHandler => {
	const requestHandler: RequestHandler = async (
		req: Request,
		_res: Response,
		next: NextFunction
	) => {
		validateSchema(requestInput, req.body, next)
	}
	return requestHandler
}

const validateSchema = (
	schema: z.ZodSchema,
	body: Record<string, unknown>,
	next: NextFunction
) => {
	const {error} = schema.safeParse(body)
	if (error) {
		const {errors} = error
		const message = errors.map(err => err.message).join(',')
		console.warn('Validation Error:', message)
		next(new ClientError(message))
	} else {
		next()
	}
}
