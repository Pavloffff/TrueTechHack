import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { services } from '../services/services'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const mutation = useMutation({
		mutationFn: () =>
			services.start({
				login: JSON.parse(localStorage.getItem('login')).login,
			}),
	})

	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ['getPort'],
		queryFn: () =>
			services.postUser({
				login: JSON.parse(localStorage.getItem('login')).login,
				filmName: '806.mp4',
			}),
		onSuccess: () => {
			mutation.mutate()
		},
		refetchOnWindowFocus: false,
	})

	return (
		<div className={styles.content}>
			{isLoading && <h1>Loading...</h1>}
			{isError && <h1>{error.message}</h1>}
			{isSuccess && (
				<div>
					<img src={`http://localhost:${data}/video`} />
				</div>
			)}
		</div>
	)
}

export default FilmScreen
