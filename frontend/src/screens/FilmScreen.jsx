import FilmStream from '../components/FilmStream'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	return (
		<div className={styles.content}>
			<FilmStream />
		</div>
	)
}

export default FilmScreen
