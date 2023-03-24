import FilmScreen from '../screens/FilmScreen'
import NotFound from '../screens/NotFound'

export const routes = [
	{ path: 'films/:pageId', element: FilmScreen },
	{ path: '*', element: NotFound },
]
