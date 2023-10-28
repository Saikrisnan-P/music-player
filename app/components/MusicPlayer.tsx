import { RootState } from '@/redux/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import '@/app/styles/MusicPlayer.css'
import '@/app/styles/styles.css'
import { Slider } from '@mui/material';
import CurrentSongDetails from './CurrentSongDetails';


const MusicPlayer = () => {
    const musicQueue = useSelector((state: RootState) => state.queue.value);
    const [isPlaying, setPlayState] = useState(false);
    const [currTime, setCurrTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isMuted, doMute] = useState(false);
    const [volume, setVolume] = useState(50);

    const getTimeInFormat = (time: number): string => {
        const minutes = (time/60).toString();
        const seconds = (time/60%60).toString();
        return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    const handleVolumeUpdate = (event: Event, value: number | number[]): void => {
        console.log('asdsd');
        typeof value === 'number' ? setVolume(value) : setVolume(value[0]);
    }

    const toggleMute = () => {
        doMute(!isMuted);
    }

  return (
    <div className='player-controls-container'>
        <CurrentSongDetails music={musicQueue[0]}></CurrentSongDetails>
        <div className="play-controls flex-row">
            <img src="/icons/player-previous.png" alt="Go to start" />
            {
                isPlaying ? <img src="/icons/player-pause.png" alt="Pause button" /> : <img src="/icons/player-play.png" alt="Play button" />
            }
            <img src="/icons/player-next.png" alt="Next song" />
        </div>
        <div className="timing-volume flex-row">
            <div className="timer">
                {`${getTimeInFormat(currTime)}/${getTimeInFormat(totalTime)}`}
            </div>
            <Slider className="slider" value={volume} onChange={handleVolumeUpdate}></Slider>
            <div className="volume-slider"></div>
            { isMuted ? <img className='volume-icon' src="/icons/player-volume.png" alt="Volume" onClick={toggleMute}/> : <img className='volume-icon' src="/icons/player-mute.png" alt="Mute" onClick={toggleMute}/> }
        </div>
    </div>
  )
}

export default MusicPlayer