import FilmScreen from '../screens/FilmScreen'
import LoginScreen from '../screens/LoginScreen'
import NotFound from '../screens/NotFound'
import RegistrationScreen from '../screens/RegistrationScreen'

export const routes = [
	{ path: 'films/:pageId', element: FilmScreen },
	{ path: 'registration', element: RegistrationScreen },
	{ path: 'login', element: LoginScreen },
	{ path: '*', element: NotFound },
]
