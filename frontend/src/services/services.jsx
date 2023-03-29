import axios from 'axios'

const URL_API = 'http://91.185.86.201/:4999'

export const services = {
	async postUser(userData) {
		const data = await (await axios.post(URL_API + '/create', userData)).data
		return data
	},
	async pause(userData) {
		await axios.post(URL_API + '/pause', userData)
	},
	async resume(userData) {
		await axios.post(URL_API + '/resume', userData)
	},
	async shift(userData) {
		await axios.post(URL_API + '/shift', userData)
	},
	async filter(userData) {
		await axios.post(URL_API + '/filter', userData)
	},
	async remove(userData) {
		await axios.post(URL_API + '/remove', userData)
	},
}
