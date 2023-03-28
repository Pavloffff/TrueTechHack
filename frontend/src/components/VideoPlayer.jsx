import { services } from '../services/services'
import styles from '../styles/VideoPlayer.module.scss'

const VideoPlayer = () => {
    const play = async () => {
        const data = await services.postUser({
            login: JSON.parse(localStorage.getItem('login')).login,
            filmName: '806.mp4',
        })
        if (localStorage.getItem('port')) {
            return
        }
        await localStorage.setItem('port', data)
    }

    return (
        <div>
            {console.log(localStorage.getItem('port'))}
            <img src={`http://localhost:${localStorage.getItem('port')}/video`} />
            <div className={styles.btns}>
                <button className={styles.btn} onClick={play}>
                    play
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.pause({
                            login: JSON.parse(localStorage.getItem('login')).login,
                        })
                    }
                >
                    pause
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.resume({
                            login: JSON.parse(localStorage.getItem('login')).login,
                        })
                    }
                >
                    resume
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.shift({
                            login: JSON.parse(localStorage.getItem('login')).login,
                            vct: "left",
                        })
                    }
                >
                    left
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.shift({
                            login: JSON.parse(localStorage.getItem('login')).login,
                            vct: "right",
                        })
                    }
                >
                    right
                </button>
            </div>
            <div className={styles.btns}>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.filter({
                            login: JSON.parse(localStorage.getItem('login')).login,
                            filterType: "epilepsy",
                            value: 0,
                        })
                    }
                >
                    epilepsy
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.filter({
                            login: JSON.parse(localStorage.getItem('login')).login,
                            filterType: "monochromatic",
                            value: 0,
                        })
                    }
                >
                    daltonism
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        services.filter({
                            login: JSON.parse(localStorage.getItem('login')).login,
                            filterType: "blue",
                            value: 0,
                        })
                    }
                >
                    bluefiltr
                </button>
            </div>
        </div>
    )
}

export default VideoPlayer
