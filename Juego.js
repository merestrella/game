import React, { useEffect, useState } from "react";
import { candidatos } from "./frases";
import { Roboto, Alfa_Slab_One } from 'next/font/google'
 
const alfa = Alfa_Slab_One({
  weight: '400',
  subsets: ['latin'],
})
 
const JuegoPreguntasRespuestas = () => {
  const [fraseAleatoria, setFraseAleatoria] = useState("");
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultadoRespuesta, setResultadoRespuesta] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  console.log("🚀 ~ file: Juego.js:17 ~ JuegoPreguntasRespuestas ~ gameOver:", gameOver)

  const [moves, setMoves] = useState(0);

  const maxMoves = 5;

  const obtenerFraseAleatoria = () => {
    const candidatoAleatorio = candidatos[Math.floor(Math.random() * candidatos.length)];
    const fraseAleatoria = candidatoAleatorio.frases[Math.floor(Math.random() * candidatoAleatorio.frases.length)];
    setFraseAleatoria(fraseAleatoria);
    setCandidatoSeleccionado("");
    setMostrarResultado(false);
  };
  
  const verificarRespuesta = (candidatoNombre) => {
    setMoves((v) => v + 1); // sumo 1 a moves
    if (moves >= maxMoves - 1) { // si moves es mayor o igual a maxMoves
      setGameOver(true); // seteo gameOver en true
    }
    // Comprobar si el candidato seleccionado es el correcto
    const candidatoCorrecto = candidatos.find(candidato => candidato.frases.includes(fraseAleatoria));
    const esCorrecto = candidatoCorrecto.nombre === candidatoNombre;
    setResultadoRespuesta(esCorrecto ? 'Respuesta correcta' : 'Respuesta incorrecta');
    if (esCorrecto) {
      setPuntos(puntos + 1);
    }
    setMostrarResultado(true);

    // despues de 1s pasar a la siguiente frase
    setTimeout(() => {
      obtenerFraseAleatoria();
    }, 1000);
  };

  useEffect(() => {
    obtenerFraseAleatoria();
  }, []);

  const handleCandidateSelection = (candidatoNombre) => {
    setCandidatoSeleccionado(candidatoNombre);
    verificarRespuesta(candidatoNombre);
  };

  return (
    <div className="container">
      {
        !gameOver &&
        <>
          <h2 className={`${alfa.className} text-2xl`}>{fraseAleatoria}</h2>
          <div className="flex gap-10">
            {candidatos.map((candidato) => (
              <div onClick={() => handleCandidateSelection(candidato.nombre)} className="cursor-pointer flex" key={candidato.nombre}>
                <img src={candidato.img} alt={candidato.nombre} />
              </div>
            ))}
          </div>
        </> 
      }
      
      <br />
      {mostrarResultado && 
        resultadoRespuesta === 'Respuesta correcta' &&
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Respuesta correcta</span>
        </div>
      }
      {mostrarResultado &&
        resultadoRespuesta === 'Respuesta incorrecta' &&
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Respuesta incorrecta</span>
        </div>
      }
      {<p>Puntos: {puntos}</p>}
      {gameOver && <p>Game over</p>}
    </div>
  );
};

export default JuegoPreguntasRespuestas;
