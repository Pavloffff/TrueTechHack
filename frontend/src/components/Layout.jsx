import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Context } from '../context/context'
import styles from '../styles/Layout.module.scss'

const Layout = () => {
	const { isLogin, setIsLogin } = useContext(Context)

	return (
		<>
			<nav className={styles.nav}>
				<Link to='/' className={styles.link}>
					Home
				</Link>
				<div className={styles.links}>
					{localStorage.getItem('login') && !isLogin && (
						<Link to='registration' className={styles.link}>
							Registration
						</Link>
					)}
					{isLogin ? (
						<button
							className={styles.link}
							onClick={() => {
								setIsLogin(false)
							}}
						>
							Exit
						</button>
					) : (
						<Link to='login' className={styles.link}>
							Login
						</Link>
					)}
				</div>
			</nav>
			<Outlet />
		</>
	)
}

export default Layout
