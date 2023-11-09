import { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Providers } from '@/redux/provider'

export const metadata: Metadata = {
  title: 'Music player',
  description: 'A very own local music player'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/icons/music-favicon.png" sizes="any"/>
      </head>
      <body>
        <div className='main'>
          <a className='icons-link' target="_blank" href="https://icons8.com">Icons used by Icons8</a>
          <div className='gradient' />
        </div>
        <main className='app'>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}

export default RootLayout