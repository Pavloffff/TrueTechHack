import Film from '../screens/Film'
import FIlm from '../screens/Film'
import FilmScreen from '../screens/FilmScreen'
import LoginScreen from '../screens/LoginScreen'
import NotFound from '../screens/NotFound'
import RegistrationScreen from '../screens/RegistrationScreen'

export const routes = [
	{ path: 'films/:pageId', element: FilmScreen },
	{ path: 'registration', element: RegistrationScreen },
	{ path: 'login', element: LoginScreen },
	{ path: 'films/film', element: Film },
	{ path: '*', element: NotFound },
]
