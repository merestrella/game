import React, { useEffect, useState } from "react";
import { candidatos } from "./frases";
import { Roboto, Alfa_Slab_One } from "next/font/google";

const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const JuegoPreguntasRespuestas = () => {
  const [fraseAleatoria, setFraseAleatoria] = useState("");
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultadoRespuesta, setResultadoRespuesta] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [frasesSeleccionadas, setFrasesSeleccionadas] = useState([]);

  const [moves, setMoves] = useState(0);

  const maxMoves = 7;

  const obtenerFraseAleatoria = () => {
    const candidatoAleatorio =
      candidatos[Math.floor(Math.random() * candidatos.length)];
    let fraseAleatoria;

    // Buscar una frase que no haya sido seleccionada anteriormente
    do {
      fraseAleatoria =
        candidatoAleatorio.frases[
          Math.floor(Math.random() * candidatoAleatorio.frases.length)
        ];
    } while (frasesSeleccionadas.includes(fraseAleatoria));

    // Agregar la frase seleccionada al arreglo de frases seleccionadas
    setFrasesSeleccionadas([...frasesSeleccionadas, fraseAleatoria]);

    setFraseAleatoria(fraseAleatoria);
    setCandidatoSeleccionado("");
    setMostrarResultado(false);
  };

  const verificarRespuesta = (candidatoNombre) => {
    setMoves((v) => v + 1); // sumo 1 a moves
    if (moves >= maxMoves - 1) {
      // si moves es mayor o igual a maxMoves
      setGameOver(true); // seteo gameOver en true
    }
    // Comprobar si el candidato seleccionado es el correcto
    const candidatoCorrecto = candidatos.find((candidato) =>
      candidato.frases.includes(fraseAleatoria)
    );
    const esCorrecto = candidatoCorrecto.nombre === candidatoNombre;
    setResultadoRespuesta(
      esCorrecto ? "Respuesta correcta" : "Respuesta incorrecta"
    );
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
      <>
        <h2 className={`pregunta ${alfa.className}`}>{fraseAleatoria}</h2>
        <div className="candidatos">
          {candidatos.map((candidato) => (
            <div
              onClick={() => handleCandidateSelection(candidato.nombre)}
              className="candidato"
              key={candidato.nombre}
            >
              <img src={candidato.img} alt={candidato.nombre} />
            </div>
          ))}
        </div>
      </>

      <br />
      {/* <div className={`respuesta ${alfa.className}`}>
        <div className=" respuesta-correcta "> Respuesta correcta 👍 </div>
      </div> */}
      {mostrarResultado && resultadoRespuesta === "Respuesta correcta" && (
        <div className={`respuesta ${alfa.className}`}>
          <div className=" respuesta-correcta "> Respuesta correcta 👍 </div>
        </div>
      )}
      {mostrarResultado && resultadoRespuesta === "Respuesta incorrecta" && (
        <div className={`respuesta ${alfa.className}`}>
          <div className=" respuesta-incorrecta "> Respuesta incorrecta 👎</div>
        </div>
      )}
      {gameOver && (
        <>
          <div className="game-over">
            <div className="datos">
              <p>Terminaste!</p>
              <p>Sumaste {puntos} puntos</p>
            </div>
          </div>
        </>
      )}
      {!gameOver && (
        <div className={` puntos ${roboto.className}`}>Puntos: {puntos}</div>
      )}
    </div>
  );
};

export default JuegoPreguntasRespuestas;
