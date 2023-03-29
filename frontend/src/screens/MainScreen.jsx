import { useContext } from 'react'
import LinkToFilm from '../components/LinkToFilm'
import { Context } from '../context/context'
import styles from '../styles/MainScreen.module.scss'

const MainScreen = () => {
	const { isLogin } = useContext(Context)

	console.log(localStorage.getItem('login'))

	return (
		<>
			{isLogin && (
				<main className={styles.main}>
					<LinkToFilm nameFilm='film1' />
					<LinkToFilm nameFilm='film2' />
					<LinkToFilm nameFilm='film3' />
					<LinkToFilm nameFilm='film4' />
				</main>
			)}
		</>
	)
}

export default MainScreen
