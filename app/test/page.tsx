'use client';

import { addNewItem, clearQueue, removeAnItem } from '@/redux/features/queue-slice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { QueueItem } from '../resources/types';

const TestPage = () => {
    let song: QueueItem = {
        name: 'Remember Me',
        author: 'Miguel'
      }
    
      const queue = useSelector((state: RootState) => state.queue.value);
      const dispatch = useDispatch();
      const homePageRoute = '../';

  return (
    <div>
        <div>TestPage</div>
        <div onClick={() => dispatch(addNewItem(song))}>Add new</div>
        <div onClick={() => dispatch(clearQueue())}>Clear</div>
        <div onClick={() => dispatch(removeAnItem(song))}>Remove First</div>
        {queue.map(qItem => {
            return (
            <>
                <div>{qItem.name}</div>
                <div>{qItem.author}</div>
            </>)
            })
        }
        <Link href={homePageRoute}>Click to go to HomePage</Link>
    </div>
  )
}

export default TestPage