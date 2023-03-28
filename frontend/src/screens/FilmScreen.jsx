import { useQuery } from '@tanstack/react-query'
import VideoPlayer from '../components/VideoPlayer'
import { services } from '../services/services'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ['getPort'],
		queryFn: () =>
			services.postUser({
				login: JSON.parse(localStorage.getItem('login')).login,
				filmName: '806.mp4',
			}),
	})

	return (
		<div className={styles.content}>
			{isLoading && <h1>Loading...</h1>}
			{isError && <h1>{error.message}</h1>}
			{isSuccess && <VideoPlayer port={data} />}
		</div>
	)
}

export default FilmScreen
