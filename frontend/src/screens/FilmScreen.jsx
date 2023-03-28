import VideoPlayer from '../components/VideoPlayer'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	return (
		<div className={styles.content}>
			<VideoPlayer />
		</div>
	)
}

export default FilmScreen
