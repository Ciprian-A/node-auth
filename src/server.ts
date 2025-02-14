import dotenv from 'dotenv'
import {createApp} from './app'

dotenv.config()
const port = process.env.PORT || 4000

const startApp = async () => {
	const {app} = await createApp()
	app.listen(port, () =>
		console.log(`server is listening on port ${port} in ${app.get('env')} mode`)
	)
}

startApp()
