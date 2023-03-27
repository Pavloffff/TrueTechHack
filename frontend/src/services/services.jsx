import axios from 'axios'

const URL_API = 'http://127.0.0.1:4999'

export const services = {
	async postUser(data, command) {
		const data = await (await axios.post(URL_API`/${command}`, data)).data

		return data
	},
	async start(data, command) {
		await axios.post(URL_API`/${command}`, data)
	},
}
