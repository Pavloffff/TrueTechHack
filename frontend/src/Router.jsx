import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { routes } from './routes/routes'
import MainScreen from './screens/MainScreen'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index={true} element={<MainScreen />} />
					{routes.map((route, index) => (
						<Route element={<route.element />} path={route.path} key={index} />
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
