import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { services } from '../services/services'

const VideoPlayer = ({ port }) => {
	const mutation = useMutation({
		mutationFn: () =>
			services.start({
				login: JSON.parse(localStorage.getItem('login')).login,
			}),
	})

	const [isShowVideo, setIsShowVideo] = useState(false)

	return (
		<div>
			{console.log(`http://localhost:${port}/video`)}
			{isShowVideo && <img src={`http://localhost:${port}/video`} />}
			<button
				onClick={() => {
					mutation.mutate()
					setIsShowVideo(true)
				}}
			>
				start
			</button>
		</div>
	)
}

export default VideoPlayer
