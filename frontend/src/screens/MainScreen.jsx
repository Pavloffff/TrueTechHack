import LinkToFilm from '../components/LinkToFilm'
import styles from '../styles/MainScreen.module.scss'

const MainScreen = () => {
	return (
		<main className={styles.main}>
			<LinkToFilm info='film1' id='1' />
			<LinkToFilm info='film2' id='2' />
			<LinkToFilm info='film3' id='3' />
			<LinkToFilm info='film4' id='4' />
		</main>
	)
}

export default MainScreen
