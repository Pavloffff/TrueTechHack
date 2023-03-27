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
					<LinkToFilm info='film1' id='1' />
				</main>
			)}
		</>
	)
}

export default MainScreen
