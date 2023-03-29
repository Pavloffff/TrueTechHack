import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'

const VideoPlayer = ({ nameFilm }) => {
	const play = async () => {
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: { nameFilm },
		})
		if (localStorage.getItem('port')) {
			return
		}
		await localStorage.setItem('port', data)
	}

	return (
		<div>
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
				<button
					className={styles.btn}
					onClick={() =>
						services.resume({
							login: JSON.parse(localStorage.getItem('login')).login,
						})
					}
				>
					resume
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.shift({
							login: JSON.parse(localStorage.getItem('login')).login,
							vct: 'left',
						})
					}
				>
					left
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.shift({
							login: JSON.parse(localStorage.getItem('login')).login,
							vct: 'right',
						})
					}
				>
					right
				</button>
			</div>
			<div className={styles.btns}>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'epilepsy',
							vct: 'left',
						})
					}
				>
					epilepsy
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'monochromatic',
							vct: 'left',
						})
					}
				>
					daltonism
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'blue',
							vct: 'left',
						})
					}
				>
					bluefiltr
				</button>
			</div>
			<div className={styles.btns}>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'brightness',
							vct: 'left',
						})
					}
				>
					brightnessDecriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'brightness',
							vct: 'right',
						})
					}
				>
					brightnessIncriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'contrast',
							vct: 'left',
						})
					}
				>
					contrastDecriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'contrast',
							vct: 'right',
						})
					}
				>
					contrastIncriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'saturate',
							vct: 'left',
						})
					}
				>
					saturateDecriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'saturate',
							vct: 'right',
						})
					}
				>
					saturateIncriment
				</button>
			</div>
			<div className={styles.btns}>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'hue',
							vct: 'left',
						})
					}
				>
					hueDecriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.filter({
							login: JSON.parse(localStorage.getItem('login')).login,
							filterType: 'hue',
							vct: 'right',
						})
					}
				>
					hueIncriment
				</button>
				<button
					className={styles.btn}
					onClick={() =>
						services.remove({
							login: JSON.parse(localStorage.getItem('login')).login,
						})
					}
				>
					remove
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
