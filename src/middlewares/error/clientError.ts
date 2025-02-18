import {StatusCodes} from 'http-status-codes'

export default class ClientError extends Error {
	public message: string = 'Bad Request'
	public statusCode: StatusCodes = StatusCodes.BAD_REQUEST

	constructor(errorMesage?: string, errorStatus?: StatusCodes) {
		super()
		this.message = errorMesage || this.message
		this.statusCode = errorStatus || this.statusCode
	}
}
