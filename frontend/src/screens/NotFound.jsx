import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigator = useNavigate()

	useEffect(() => {
		navigator(-1)
	}, [])
}

export default NotFound
