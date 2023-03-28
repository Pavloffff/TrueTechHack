import { useMutation, useQuery } from '@tanstack/react-query'
import { services } from '../services/services'

const VideoPlayer = () => {

	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ['getPort'],
		queryFn: () =>
			services.postUser({
				login: JSON.parse(localStorage.getItem('login')).login,
				filmName: '806.mp4',
			}),
		
		refetchOnWindowFocus: false,
    })
    
	return (
		<div>
			{isLoading && <h1>Loading...</h1>}
			{isError && <h1>{error.message}</h1>}
			{isSuccess && <img src={`http://localhost:${data}/video`} />}
		</div>
	)
}

export default VideoPlayer
