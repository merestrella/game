import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { candidatos } from "../frases";
const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];

const handleRandomFrase = (data) => {
  const frases = data.frases;
  const foto = data.img;

  // Generamos un número aleatorio entre 0 y 1
  const randomValue = Math.random();

  // Si el número aleatorio es menor o igual a 0.5 (50% de probabilidad), retornamos una frase aleatoria
  if (randomValue <= 0.5) {
    const randomFrase = frases[Math.floor(Math.random() * frases.length)];
    return randomFrase;
  }
  // De lo contrario (probabilidad del otro 50%), retornamos la imagen
  else {
    return <img src={foto} />;
  }
};

export default function Home() {
  const [boardData, setBoardData] = useState([]);
  const [boardDataCandidatos, setBoardDataCandidatos] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const maxMoves = 50;
  const [gameOver, setGameOver] = useState(false);
  const [endMsj, setEndMsj] = useState("");
  const [shareMsj, setSharedMsj] = useState("");
  useEffect(() => {
    console.log(candidatos);
    initialize();
  }, []);

  useEffect(() => {
    console.log("moves", moves, "matched", matchedCards);
    if (matchedCards.length === 16) {
      console.log("Entre al true");
      setGameOver(true);
      setEndMsj("¡Felicitaciones, descubriste a todxs lxs políticos!");
    } else if (moves >= maxMoves) {
      console.log("Entre al else");
      setGameOver(true);
      setEndMsj("Game Over!"); // Mostrar "Game Over!" si se supera maxMoves
    }
  }, [moves, matchedCards]);

  const shareOnEmail = () => {
    const subject = "¡Gané en el juego electoral 2023!";
    const body = `¡Gané en ${moves} movimientos! Te desafío a completar el juego electoral 2023 aquí: https://prensaobrera.com`;

    const mailToUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailToUrl);
  };

  const shareOnWhatsApp = () => {
    const message = `¡Gané en ${moves} movimientos! Te desafío a completar el juego electoral 2023 aquí: https://prensaobrera.com`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareOnFacebook = () => {
    const message = `¡Gané en ${moves} movimientos! Te desafío a completar el juego electoral 2023 aquí: https://prensaobrera.com`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const message = `¡Gané en ${moves} movimientos! Te desafío a completar el juego electoral 2023 aquí: https://prensaobrera.com`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const initialize = () => {
    shuffle();
    shuffleCandidatos();
    setGameOver(false);
    setEndMsj("");
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };
  const shuffle = () => {
    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };

  const shuffleCandidatos = () => {
    const shuffledCardsCandidatos = [...candidatos, ...candidatos]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardDataCandidatos(shuffledCardsCandidatos);
  };

  const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }
      setMoves((v) => v + 1);
      if (moves >= maxMoves - 1) {
        setGameOver(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Memotest - PASO 2023 </h1>
        <p className="subtitulo">Descubre quién dijo qué: </p>
        <p>un juego de memoria con candidatos y frases electorales</p>
      </div>
      <div className="board">
        {boardDataCandidatos.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <div
              onClick={() => {
                updateActiveCards(i);
              }}
              key={i}
              className={`card ${flipped || matched ? "active" : ""} ${
                matched ? "matched" : ""
              } ${gameOver ? "gameover" : ""}`}
            >
              <div className="card-front">{handleRandomFrase(data)}</div>
              <div className="card-back"></div>
            </div>
          );
        })}
      </div>
      {/* <div className="board">
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <div
              onClick={() => {
                updateActiveCards(i);
              }}
              key={i}
              className={`card ${flipped || matched ? "active" : ""} ${
                matched ? "matched" : ""
              } ${gameOver ? "gameover" : ""}`}
            >
              <div className="card-front">{data}</div>
              <div className="card-back"></div>
            </div>
          );
        })}
      </div> */}

      <p>{gameOver ? endMsj : `${moves} Movimientos`}</p>
      <div className="menu">
        <div className="btn">
          <button onClick={() => initialize()} className="reset-btn">
            Reiniciar
          </button>
        </div>
        {gameOver && (
          <div className="share-container">
            <p>Compartir:</p>
            <div className="share-icons">
              <a href="#" onClick={() => shareOnEmail()}>
                <Icon icon="ic:outline-email" width="35" />
              </a>
              <a href="#" onClick={() => shareOnWhatsApp()}>
                <Icon icon="logos:whatsapp-icon" width="40" />
              </a>
              <a href="#" onClick={() => shareOnFacebook()}>
                <Icon icon="logos:facebook" width="35" />
              </a>
              <a href="#" onClick={() => shareOnTwitter()}>
                <Icon icon="skill-icons:twitter" width="35" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
