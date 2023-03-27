import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Context } from './context/context'
import Router from './Router'

function App() {
	const [isLogin, setIsLogin] = useState(false)
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Context.Provider value={{ isLogin, setIsLogin }}>
				<Router />
			</Context.Provider>
		</QueryClientProvider>
	)
}

export default App
