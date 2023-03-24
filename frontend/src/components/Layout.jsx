import { Link, Outlet } from 'react-router-dom'
import styles from '../styles/Layout.module.scss'

const Layout = () => {
	return (
		<>
			<nav className={styles.nav}>
				<Link to='/' className={styles.link}>
					Home
				</Link>
			</nav>
			<Outlet />
		</>
	)
}

export default Layout
