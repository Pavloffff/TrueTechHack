import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const nameFilm = useParams()

	return (
		<div className={styles.content}>
			<VideoPlayer nameFilm={nameFilm} />
		</div>
	)
}

export default FilmScreen
