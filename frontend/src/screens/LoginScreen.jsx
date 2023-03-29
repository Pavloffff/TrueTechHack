import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/context'
import styles from '../styles/LoginScreen.module.scss'

const LoginScreen = () => {
	const { register, handleSubmit, reset } = useForm()
	const { setIsLogin } = useContext(Context)
	const [isEnter, setIsEnter] = useState(false)

	const navigator = useNavigate()

	const onSubmit = data => {
		if (localStorage.getItem('login')) {
			if (
				JSON.parse(localStorage.getItem('login')).login === data.login &&
				JSON.parse(localStorage.getItem('login')).password === data.password
			) {
				setIsLogin(true)
				setIsEnter(false)
				navigator(-1)
			} else {
				setIsEnter(true)
			}
		}
		reset()
	}

	return (
		<div className={styles.screen}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
				<input
					className={styles.input}
					type='text'
					placeholder='login'
					{...register('login')}
				/>
				<input
					className={styles.input}
					type='password'
					placeholder='password'
					{...register('password')}
				/>
				<input className={styles.submit} type='submit' />
				{isEnter && <h1>Wrong login or password</h1>}
			</form>
		</div>
	)
}

export default LoginScreen
