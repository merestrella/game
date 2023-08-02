import React from 'react'
import Head from 'next/head'
import PreviewPage from '../previewspage'

const index = () => {
  return (
    <>
      <Head>
        <title key="title">Juego electoral 2023</title>
      </Head>
      <PreviewPage />
    </>
  )
}

export default index