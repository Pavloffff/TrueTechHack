import { useMutation } from '@tanstack/react-query'

const VideoPlayer = ({ url }) => {
	const mutation = useMutation({
		mutationFn: data => services.postUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getPort'] })
		},
	})

	return <img src={url} onClick={mutation.mutate({ command: 'start' })} />
}

export default VideoPlayer
