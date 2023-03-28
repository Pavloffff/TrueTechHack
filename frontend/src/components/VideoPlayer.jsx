import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { services } from '../services/services'

const VideoPlayer = () => {
	// const { data, isLoading, isSuccess, isError, error } = useQuery({
	// 	queryKey: ['getPort'],
	// 	queryFn: () =>
	// 		services.postUser({
	// 			login: JSON.parse(localStorage.getItem('login')).login,
	// 			filmName: '806.mp4',
	// 		}),

	// 	refetchOnWindowFocus: false,
	// })

	const [isSuccess, setIsSuccess] = useState(false)
	const [data, setData] = useState('')
	const postQuery = async () => {
		setIsSuccess(true)
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: '806.mp4',
		})
		await setData(data)
	}

	return (
		<div>
			{isSuccess && <img src={`http://localhost:${data}/video`} />}
			<button onClick={postQuery}>play</button>
		</div>
	)
}

export default VideoPlayer
