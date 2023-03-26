import VideoPlayer from '../components/VideoPlayer'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	return (
		<div className={styles.content}>
			<VideoPlayer url='http://localhost:8080/bgr' />
		</div>
	)
}

export default FilmScreen
