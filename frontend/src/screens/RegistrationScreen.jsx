import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/context'
import styles from '../styles/RegistrationScreen.module.scss'

const RegistrationScreen = () => {
	const { register, handleSubmit, reset } = useForm()
	const { setIsLogin } = useContext(Context)

	const navigator = useNavigate()

	const onSubmit = data => {
		localStorage.setItem('login', JSON.stringify(data))
		setIsLogin(true)
		reset()
		navigator(-1)
	}

	return (
		<div className={styles.screen}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h1>Register</h1>
				<input
					className={styles.input}
					type='text'
					placeholder='login'
					{...register('login', { required: true })}
				/>
				<input
					className={styles.input}
					type='password'
					placeholder='password'
					{...register('password', { required: true })}
				/>
				<input className={styles.submit} type='submit' />
			</form>
		</div>
	)
}

export default RegistrationScreen
