import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'

const VideoPlayer = () => {
	const play = async () => {
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: '806.mp4',
		})
		if (localStorage.getItem('port')) {
			return
		}
		await localStorage.setItem('port', data)
	}

	return (
		<div>
			{console.log(localStorage.getItem('port'))}
			<img src={`http://localhost:${localStorage.getItem('port')}/video`} />
			<div className={styles.btns}>
				<button className={styles.btn} onClick={play}>
					play
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.pause({
							login: JSON.parse(localStorage.getItem('login')).login,
						})
					}
				>
					pause
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
