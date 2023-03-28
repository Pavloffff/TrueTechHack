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

	useEffect(() => {
		mutation.mutate()
	}, [])

	return <img src={`http://localhost:${port}/video`} />
}

export default VideoPlayer
