'use client';
import './styles/styles.css'

import type { RootState } from '@/redux/store';
import { songsDirectory } from '@/app/resources/resources'
import { useSelector, useDispatch } from 'react-redux';

import './styles/styles.css'
import React, { useEffect, useState } from 'react';
import { Music, setDb } from '@/redux/features/musicDB-slice';

const HomePage = () => {

  const musicDB = useSelector((state: RootState) => state.musicDB.value);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setDb(songsDirectory as Music[]));
    console.log('eff called')
  }, []);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
      setLoaded(true)
  }, []);

  return (
    <div className='home-container'>
      <header>
            <h1 className='animate-charcter'>Music Player</h1>
        </header>
    </div>
  )
}

export default HomePage