import React from 'react'
import { addNewItem, clearQueue, removeAnItem } from '@/redux/features/queue-slice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import '@/app/styles/MusicCard.css';
import { Music } from '../resources/types';

const MusicCard = ({ music }: { music: Music}) => {
  
  const queue = useSelector((state: RootState) => state.queue.value);
  const dispatch = useDispatch();

  const playMusic = (music: Music) => {
    dispatch(clearQueue());
    dispatch(addNewItem({ ...music, isPlaying: true }));
  }
  
  const addToQueue = (music: Music) => {
    dispatch(addNewItem(music));
  }

  return (
    <div className='music-container'>
      <div className='music-card' style={{ backgroundImage: `url(${music.img})` }}>
        <img src="" alt="" />
        <div className='play-modal'>
          <img src="/icons/plus.png" alt="Add to queue" onClick={() => {addToQueue(music)}}/>
          <img src="/icons/play.png" alt="Play song" onClick={() => {playMusic(music)}}/>
        </div>
      </div>
      <div className='music-details'>
          <div className='name'>{music.name}</div>
          <div className='artist'>{music.artist}</div>
        </div>
    </div>
  )
}

export default MusicCard