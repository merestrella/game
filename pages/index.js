import React from 'react'
import JuegoPreguntasRespuestas from '../Juego'
import Head from 'next/head'

const index = () => {
  return (
    <>
      <Head>
        <title key="title">Juego de preguntas y respuestas</title>
      </Head>
      <JuegoPreguntasRespuestas />
    </>
  )
}

export default index