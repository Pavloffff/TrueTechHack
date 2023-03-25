import { useParams } from 'react-router-dom'
import MJPEGViewer from '../components/MjpegStream'
import styles from '../styles/FilmScreen.module.scss'

const FilmScreen = () => {
	const params = useParams()

	return <div className={styles.content}>Film {params.pageId}
        <MJPEGViewer />
    </div>
}

export default FilmScreen
