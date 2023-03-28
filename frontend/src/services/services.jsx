import axios from 'axios'

const URL_API = 'http://127.0.0.1:4999'

export const services = {
	async postUser(userData) {
		const data = await (await axios.post(URL_API + '/create', userData)).data
		return data
	},
	async pause(userData) {
		await axios.post(URL_API + '/pause', userData)
	},
}
