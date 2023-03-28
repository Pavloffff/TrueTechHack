import { services } from '../services/services'

const VideoPlayer = () => {
	const postQuery = async () => {
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: '806.mp4',
		})
		if (localStorage.getItem('port')) {
			return
		}
		await localStorage.setItem('port', data)
		setIsSuccess(true)
	}

	return (
		<div>
			{console.log(localStorage.getItem('port'))}
			<img src={`http://localhost:${localStorage.getItem('port')}/video`} />
			<button onClick={postQuery}>play</button>
		</div>
	)
}

export default VideoPlayer
