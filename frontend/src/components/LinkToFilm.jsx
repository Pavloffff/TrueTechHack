import { Link } from 'react-router-dom'
import styles from '../styles/LinkToFilm.module.scss'

const LinkToFilm = ({ id, info }) => {
	return (
		<div className={styles.wrap}>
			<Link className={styles.link} to={`films/${id}`}>
				{info}
			</Link>
		</div>
	)
}

export default LinkToFilm
