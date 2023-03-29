import { useState } from 'react'
import { Context } from './context/context'
import Router from './Router'

function App() {
	const [isLogin, setIsLogin] = useState(false)

	return (
		<Context.Provider value={{ isLogin, setIsLogin }}>
			<Router />
		</Context.Provider>
	)
}

export default App
