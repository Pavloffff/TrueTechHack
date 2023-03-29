import { useState } from 'react'
import { GrPlayFill, GrPauseFill } from 'react-icons/gr'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'
import Button from './Button'
import { ImMinus, ImPlus, ImCross } from 'react-icons/im'

const VideoPlayer = ({ nameFilm }) => {
	const [isPlay, setIsPlay] = useState(true)

	const play = async () => {
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: { nameFilm },
		})
		if (localStorage.getItem('port')) {
			return
		}
		await localStorage.setItem('port', data)
		localStorage.setItem('start', 'true')
	}

	return (
		<div className={styles.wrap}>
			{localStorage.getItem('start') ? (
				<img src={`http://localhost:${localStorage.getItem('port')}/video`} />
			) : (
				<img src={`/${nameFilm}`} width='500' height='500' />
			)}
			<div className={styles.btns}>
				<Button className={styles.btn} onClick={play} text='start' />
				<Button
					className={styles.btn}
					onClick={() =>
						services.shift({
							login: JSON.parse(localStorage.getItem('login')).login,
							vct: 'left',
						})
					}
					text={<MdOutlineDoubleArrow style={{ rotate: '180deg' }} />}
				/>
				{isPlay ? (
					<Button
						className={styles.btn}
						onClick={() => {
							services.pause({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
							setIsPlay(false)
						}}
						text={<GrPauseFill />}
					/>
				) : (
					<Button
						className={styles.btn}
						onClick={() => {
							services.resume({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
							setIsPlay(true)
						}}
						text={<GrPlayFill />}
					/>
				)}
				<Button
					className={styles.btn}
					onClick={() =>
						services.shift({
							login: JSON.parse(localStorage.getItem('login')).login,
							vct: 'right',
						})
					}
					text={<MdOutlineDoubleArrow />}
				/>
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
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'brightness',
								vct: 'left',
							})
						}
						text={<ImMinus />}
					/>
					яркость
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'brightness',
								vct: 'right',
							})
						}
						text={<ImPlus />}
					/>
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'contrast',
								vct: 'left',
							})
						}
						text={<ImMinus />}
					/>
					контрастность
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'contrast',
								vct: 'right',
							})
						}
						text={<ImPlus />}
					/>
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'saturate',
								vct: 'left',
							})
						}
						text={<ImMinus />}
					/>
					насыщенность
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'saturate',
								vct: 'right',
							})
						}
						text={<ImPlus />}
					/>
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'hue',
								vct: 'left',
							})
						}
						text={<ImMinus />}
					/>
					оттенок
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'hue',
								vct: 'right',
							})
						}
						text={<ImPlus />}
					/>
				</div>
				<Button
					className={styles.btn}
					onClick={() =>
						services.remove({
							login: JSON.parse(localStorage.getItem('login')).login,
						})
					}
					text={<ImCross />}
				/>
			</div>
		</div>
	)
}

export default VideoPlayer
