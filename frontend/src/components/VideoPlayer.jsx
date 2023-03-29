import { useState } from 'react'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'
import Button from './Button'
import { GrPlayFill, GrPauseFill } from 'react-icons/gr'
import { ImMinus, ImPlus, ImCross } from 'react-icons/im'
import { FaPlay } from 'react-icons/fa'

const VideoPlayer = ({ nameFilm }) => {
	const [isPlay, setIsPlay] = useState(true)
	const filmForSend = nameFilm + '.mp4'

	const play = async () => {
		const data = await services.postUser({
			login: JSON.parse(localStorage.getItem('login')).login,
			filmName: filmForSend,
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
				<img
					src={`http://localhost:${localStorage.getItem('port')}/video`}
					width='1000'
					height='1000'
				/>
			) : (
				<div className={styles.img}>
					<img src={`/${nameFilm}.png`} width='1052.5' />
					<div className={styles.playbtn}>
						<Button
							className={styles.btn}
							onClick={play}
							text={<FaPlay size='100px' color='white' />}
						/>
					</div>
				</div>
			)}
			<div className={styles.btns}>
				<div className={styles.block}>
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
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'epilepsy',
								vct: 'left',
							})
						}
						text={<img src='/epilepsy.png' width='30px' height='30px' />}
					/>
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'monochromatic',
								vct: 'left',
							})
						}
						text={<img src='/monochrom.png' width='30px' height='30px' />}
					/>
				</div>
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() =>
							services.filter({
								login: JSON.parse(localStorage.getItem('login')).login,
								filterType: 'blue',
								vct: 'left',
							})
						}
						text={<img src='/bluefilter.png' width='25px' height='25px' />}
					/>
				</div>
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
				<div className={styles.block}>
					<Button
						className={styles.btn}
						onClick={() => {
							services.remove({
								login: JSON.parse(localStorage.getItem('login')).login,
							})
							localStorage.removeItem('start')
							localStorage.removeItem('port')
						}}
						text={<ImCross />}
					/>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
