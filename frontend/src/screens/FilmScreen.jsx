import { useQuery } from '@tanstack/react-query'
import VideoPlayer from '../components/VideoPlayer'
import { services } from '../services/services'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ['getPort'],
		queryFn: () => services.getPort(),
	})

	const mutation = useMutation({
		mutationFn: data => services.postUser(data, 'create'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getPort'] })
		},
	})

	mutation.mutate({ login: localStorage.getItem('login'), filmName: '806.mp4' })

	return (
		<div className={styles.content}>
			{isLoading && <h1>Loading...</h1>}
			{isError && <h1>{error.message}</h1>}
			{isSuccess && <VideoPlayer url={`http://localhost:${data}/video`} />}
		</div>
	)
}

export default FilmScreen
