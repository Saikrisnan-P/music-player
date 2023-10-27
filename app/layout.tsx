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