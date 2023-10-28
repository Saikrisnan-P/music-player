import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '@/app/styles/MusicCards.css';
import MusicCard from './MusicCard';

const MusicCards = () => {
    const musicDB = useSelector((state: RootState) => state.musicDB.value);
    // const dispatch = useDispatch();
    
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        console.log(musicDB, 'called');
        setLoaded(true)
    }, []);
  return (
    <>
    {
        musicDB.map(music => {
            return (
                <div className='tiles-container'>
                <MusicCard music={music}></MusicCard>
                </div>
            )
        })
    }
    </>
  )
}

export default MusicCards