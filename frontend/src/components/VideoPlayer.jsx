const VideoPlayer = ({ url }) => {
	return (
		<iframe
			src={url}
			allow='accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			width='1920'
			height='1080'
		></iframe>
	)
}

export default VideoPlayer
