import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'
import Button from './Button'

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
		<div className={styles.wrap}>
			<img src={`http://localhost:${localStorage.getItem('port')}/video`} />
			<div className={styles.btns}>
				<div className={styles.string}>
					<Button className={styles.btn} onClick={play} text='play' />
					<Button
						className={styles.btn}
						onClick={() =>
							services.pause({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
						}
						text='pause'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.resume({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
						}
						text='resume'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.shift({
								login: JSON.parse(localStorage.getItem('login')).login,
								vct: 'left',
							})
						}
						text='left'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.shift({
								login: JSON.parse(localStorage.getItem('login')).login,
								vct: 'right',
							})
						}
						text='right'
					/>
				</div>
				<div className={styles.string}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'epilepsy',
								vct: 'left',
							})
						}
						text='epilepsy'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'monochromatic',
								vct: 'left',
							})
						}
						text='monochromatic'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'blue',
								vct: 'left',
							})
						}
						text='bluefiltr'
					/>
				</div>
				<div className={styles.string}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'brightness',
								vct: 'left',
							})
						}
						text='brightness decriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'brightness',
								vct: 'right',
							})
						}
						text='brightness incriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'contrast',
								vct: 'left',
							})
						}
						text='contrast decriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'contrast',
								vct: 'right',
							})
						}
						text='contrast incriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'saturate',
								vct: 'left',
							})
						}
						text='saturate decriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'saturate',
								vct: 'right',
							})
						}
						text='saturate incriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'hue',
								vct: 'left',
							})
						}
						text='hue decriment'
					/>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'hue',
								vct: 'right',
							})
						}
						text='hue incriment'
					/>
				</div>
				<div className={styles.string}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.remove({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
						}
						text='remove'
					/>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
