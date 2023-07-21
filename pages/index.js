import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];
export default function Home() {
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const maxMoves = 50;
  const [gameOver, setGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showGameOverMessage, setShowGameOverMessage] = useState(false);


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
  

  const shareResult = () => {
    if (navigator.share) {
      // Si el navegador soporta la API de compartir
      navigator
        .share({
          title: "Resultado del juego",
          text: `¡Ganaste en ${moves} movimientos!`,
        })
        .then(() => console.log("Resultado compartido con éxito"))
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      // Si el navegador no soporta la API de compartir, muestra un mensaje de advertencia
      alert(
        "Tu navegador no soporta la función de compartir. Puedes copiar el resultado y compartirlo manualmente."
      );
    }
  };

  

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setShowWinMessage(false);
    setShowGameOverMessage(false);
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

  const updateActiveCards = (i) => {
    if (moves >= maxMoves) {
      // Si ya se alcanzó el máximo de movimientos, no permitir más movimientos.
      return;
    }
    if (!flippedCards.includes(i)) {
      if (flippedCards.length === 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] === boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length === 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }
      setMoves((v) => v + 1);

      if (matchedCards.length === 16) {
        // Verificar si se completaron todas las parejas.
        setShowWinMessage(true);
    } else if (moves === maxMoves - 1) {
      // Si se alcanzó el último movimiento permitido, mostrar Game Over.
      setShowGameOverMessage(true);
    }
  }
};

  return (
    <div className="container">
      
      <div className="title">
        <h1>Memotest - PASO 2023 </h1>
        <p>Descubre quién dijo qué: </p>
        <p>un juego de memoria con candidatos y frases electorales</p>
      </div>
      <div className="board">
      
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
      </div>
      {showWinMessage && (
        <p className="win-message">¡Felicitaciones, ganaste!</p>
      )}

      {showGameOverMessage && (
        <p className="gameover-message">¡Game Over!</p>
      )}
      <div className="menu">
      <p>{`${moves} Movimientos`}</p>
        <button onClick={() => initialize()} className="reset-btn">
          Reiniciar
        </button>
        {gameOver && (
    <div>
      <button onClick={shareResult} className="share-btn">
        Compartir
      </button>
      <div className="share-icons">
        <a href="#" onClick={() => shareOnWhatsApp()}>
        <Icon icon="logos:whatsapp-icon" width="40" />
        </a>
        <a href="#" onClick={() => shareOnFacebook()}>
        <Icon icon="logos:facebook" width="35" />
        </a>
        <a href="#" onClick={() => shareOnTwitter()}>
        <Icon icon="skill-icons:twitter" width="35"/>
        </a>
      </div>
    </div>
      )}
      </div>
      
    </div>
  );
}
