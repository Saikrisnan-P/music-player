import React from 'react'
import { Music } from '../resources/types'
import '@/app/styles/styles.css'
import '@/app/styles/CurrentSongDetails.css'

const CurrentSongDetails = ({ music }: { music: Music }) => {
    let html;
    if(music) {
        html = 
        <>
            <img className="song-image" src={music.img} alt="Current song image" />
            <div className="song-details flex-column">
                <div className='name'>{music.name}</div>
                <div className='author'>{music.artist}</div>
            </div> 
        </>;
    }
    return (
        <div className='current-music-cont flex-row'>
            {html}
        </div>
    )
}

export default CurrentSongDetails