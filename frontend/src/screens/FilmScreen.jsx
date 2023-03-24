import { useParams } from 'react-router-dom'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const params = useParams()

	return <div className={styles.content}>Film {params.pageId}</div>
}

export default FilmScreen
