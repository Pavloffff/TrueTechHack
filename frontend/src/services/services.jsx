import axios from 'axios'

const URL_API = 'http://127.0.0.1:4999'

export const services = {
	async postUser(userData) {
		const data = await (await axios.post(URL_API + '/create', userData)).data
		console.log(data)
		return data
	},
	async start(data) {
		await axios.post(URL_API + '/start', data)
	},
}
