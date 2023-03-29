import { useContext } from 'react'
import LinkToFilm from '../components/LinkToFilm'
import { Context } from '../context/context'
import styles from '../styles/MainScreen.module.scss'

const MainScreen = () => {
	const { isLogin } = useContext(Context)

	return (
		<>
			{isLogin && (
				<main className={styles.main}>
					<LinkToFilm nameFilm='film1.png' />
					<LinkToFilm nameFilm='film2.png' />
					<LinkToFilm nameFilm='film3.png' />
					<LinkToFilm nameFilm='film4.png' />
				</main>
			)}
		</>
	)
}

export default MainScreen
