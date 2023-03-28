import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { services } from '../services/services'

const VideoPlayer = ({ port }) => {
	const [isShowVideo, setIsShowVideo] = useState(false)

	const mutation = useMutation({
		mutationFn: () =>
			services.start({
				login: JSON.parse(localStorage.getItem('login')).login,
			}),
		onSuccess: () => {
			setIsShowVideo(true)
		},
	})

	return (
		<div>
			{console.log(`http://localhost:${port}/video`)}
			{isShowVideo && <img src={`http://localhost:${port}/video`} alt='film' />}
			<img src='http://localhost:5001/video' />
			<button
				onClick={() => {
					mutation.mutate()
				}}
			>
				start
			</button>
		</div>
	)
}

export default VideoPlayer
