import { useMutation } from '@tanstack/react-query'
import { services } from '../services/services'

const VideoPlayer = ({ port }) => {
	const mutation = useMutation({
		mutationFn: () =>
			services.start({
				login: JSON.parse(localStorage.getItem('login')).login,
			}),
	})

	return (
		<img src={`http://localhost:${port}/video`} onClick={mutation.mutate()} />
	)
}

export default VideoPlayer
