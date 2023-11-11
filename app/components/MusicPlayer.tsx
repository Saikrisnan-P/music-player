import { RootState } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '@/app/styles/MusicPlayer.css'
import '@/app/styles/styles.css'
import { Slider } from '@mui/material';
import CurrentSongDetails from './CurrentSongDetails';
import { Music } from '../resources/types';
import { removeFirstFromQueue } from '@/redux/features/queue-slice';


const MusicPlayer = () => {
    const musicQueue = useSelector((state: RootState) => state.queue.value);
    const dispatch = useDispatch();
    let audio = new Audio();
    let intervalHandler: NodeJS.Timeout;

    const [isPlaying, setPlayState] = useState(false);
    const [seekTime, setSeekTime] = useState(0);
    const [totalTime, setTotalTime] = useState(60);
    const [isMuted, doMute] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentMusic, setCurrentMusic] = useState<Music>({} as Music);
    const audioElement = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const firstSong = musicQueue[0];
        if (musicQueue.length && firstSong) {
            setCurrentMusic(firstSong);
        }
    }, [musicQueue]);

    useEffect(() => {
        let audio = audioElement.current;
        if (audio && !audio?.src.includes(currentMusic.src)) {
            audio.src = currentMusic.src;
        }
        if (isPlaying) {
            playAudio(currentMusic.src);
        } else {
            if (audio) {
                audio.pause();
            }
        }
    }, [currentMusic, isPlaying]);

    useEffect(() => {
        const audio = audioElement.current;
        if(audio && isPlaying){
            intervalHandler = setInterval(() => {
                setSeekTime(Math.floor(audio.currentTime));
            }, 1000)
        } else if(!audio) {
            clearInterval(intervalHandler);
        }
    });

    useEffect(() => {
        const audio = audioElement.current;
        console.log('called from 2nd');
        if (audio) {
            audio.onloadedmetadata = (musicLoadEvent) => {
                setTotalTime(audio.duration);
                console.log('meta loaded', musicLoadEvent);
            };
            audio.onended = () => {
                dispatch(removeFirstFromQueue());
            }
        }
      }, []);

    const getTimeInFormat = (time: number): string => {
        const minutes = Math.floor(time/60).toString();
        const seconds = (time%60).toString();
        return `${minutes.padStart(2, '0').slice(0,3)}:${seconds.padStart(2, '0').slice(0,3)}`.replace(/[.]/g, '');
    }

    const handleVolumeUpdate = (event: Event, value: number | number[]): void => {
        let audio = audioElement.current;
        const volume = typeof value === 'number' ? value : value[0];
        setVolume(volume);
        if (audio) {
            audio.volume = volume/100;
        }
    }

    const handlePlayPause = (): void => {
        setPlayState(!isPlaying);
    }

    const handlePlaybackSliderUpdate = (event: Event, value: number | number[]): void => {
        let audio = audioElement.current;
        if(typeof value === 'number' && audio) {
            setSeekTime(value);
            audio.currentTime = value;
        }
    }

    const toggleMute = (): void => {
        let audio = audioElement.current;
        doMute(!isMuted);
        if (audio) {
            audio.volume = isMuted ? 0 : volume/100;
        }
    }

    const playAudio = (src: string) => {
        let audio = audioElement.current;
        if(audio) {
            audio.play();
        }
    }

    const goToSongStart = () => {
        let audio = audioElement.current;
        if(audio) {
            setSeekTime(0);
            audio.currentTime = 0;
        }
    }

    const nextSong = () => {
        dispatch(removeFirstFromQueue());
    }

  return (
    <div className="flex-column whole-player-container">
        <Slider className='playback-slider' value={seekTime} onChange={handlePlaybackSliderUpdate} max={totalTime}></Slider>
        <div className='player-controls-container'>
            <div className='current-song-cont'>
                <CurrentSongDetails music={musicQueue[0]}></CurrentSongDetails>
            </div>
            <div className="play-controls flex-row">
                <img src="/icons/player-previous.png" alt="Go to start" onClick={goToSongStart}/>
                {
                    isPlaying ? <img src="/icons/player-pause.png" alt="Pause button" onClick={handlePlayPause}/> : <img src="/icons/player-play.png" alt="Play button" onClick={handlePlayPause}/>
                }
                <img src="/icons/player-next.png" alt="Next song" onClick={nextSong}/>
            </div>
            <div className="timing-volume flex-row">
                <div className="timer">
                    {`${getTimeInFormat(seekTime)} / ${getTimeInFormat(totalTime)}`}
                </div>
                <Slider className="volume-slider" value={volume} onChange={handleVolumeUpdate}></Slider>
                <audio ref={audioElement}></audio>
                { isMuted ? <img className='volume-icon' src="/icons/player-volume.png" alt="Volume" onClick={toggleMute}/> : <img className='volume-icon' src="/icons/player-mute.png" alt="Mute" onClick={toggleMute}/> }
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer