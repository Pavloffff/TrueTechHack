import { Link } from 'react-router-dom'
import styles from '../styles/LinkToFilm.module.scss'

const LinkToFilm = ({ nameFilm }) => {
	return (
		<div className={styles.wrap}>
			<Link className={styles.link} to={`films/${nameFilm}`}>
				<img src={`${nameFilm}.png`} width='500' height='500' />
			</Link>
		</div>
	)
}

export default LinkToFilm
