'use client';

import './styles/styles.css'
import type { RootState } from '@/redux/store';
import { songsDirectory } from '@/app/resources/resources'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setDb } from '@/redux/features/musicDB-slice';
import MusicCards from './components/MusicCards';
import { Music } from './resources/types';
import MusicPlayer from './components/MusicPlayer';

const HomePage = () => {

  const musicDB = useSelector((state: RootState) => state.musicDB.value);
  const musicQueue = useSelector((state: RootState) => state.queue.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDb(songsDirectory as Music[]));
  }, []);

  return (
    <div className='home-container'>
      <header>
        <h1 className='animate-charcter'>Music Player</h1>
      </header>
      <MusicCards></MusicCards>
      <footer className='player-container'>
        <MusicPlayer></MusicPlayer>
        {/* {
          musicQueue.length === 0 ? <div>Please select a song to continue</div> : <MusicPlayer></MusicPlayer>
        } */}
      </footer>
    </div>
  )
}

export default HomePage