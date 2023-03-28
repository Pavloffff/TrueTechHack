import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { services } from '../services/services'

const VideoPlayer = ({ port }) => {
	const mutation = useMutation({
		mutationFn: () =>
			services.start({
				login: JSON.parse(localStorage.getItem('login')).login,
			}),
	})

	return (
		<div>
			{console.log(`http://localhost:${port}/video`)}
			{port && <img src={`http://localhost:${port}/video`} />}
			<button onClick={() => mutation.mutate()}>start</button>
		</div>
	)
}

export default VideoPlayer
