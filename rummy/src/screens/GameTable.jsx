import React, { useState, } from "react";
import Deck from "../components/Deck";
import DiscardPile from "../components/DiscardPile";
import PlayerHand from "../components/PlayerHand";
import PlayerSetup from "../components/PlayerSetup";

const allSuits = ["hearts", "diamonds", "clubs", "spades"];
const allValues = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const JOKER = "JOKER";

// Genera el mazo completo según el número de jugadores
const generateFullDeck = (numPlayers) => {
  const numDecks = Math.ceil(numPlayers / 3);
  let deck = [];
  for (let d = 0; d < numDecks; d++) {
    allSuits.forEach((suit) => {
      allValues.forEach((value) => {
        deck.push({ suit, value });
      });
    });
    // 2 comodines por mazo estándar
    deck.push({ suit: null, value: JOKER });
    deck.push({ suit: null, value: JOKER });
  }
  return deck.sort(() => Math.random() - 0.5);
};

const NUM_CARDS_PER_PLAYER = 10;

const getInitialPlayers = (numPlayers, deck) => {
  let players = [];
  let deckCopy = [...deck];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      name: `Jugador ${i + 1}`,
      cards: [],
    });
  }
  for (let c = 0; c < NUM_CARDS_PER_PLAYER; c++) {
    for (let p = 0; p < numPlayers; p++) {
      players[p].cards.push(deckCopy.pop());
    }
  }
  return { players, deck: deckCopy };
};

const GameTable = () => {
  const [numPlayers, setNumPlayers] = useState(null);
  // Inicializa el mazo y reparte cartas solo una vez
  const [gameState, setGameState] = useState(null);

  React.useEffect(() => {
    if (numPlayers) {
      const deck = generateFullDeck(numPlayers);
      const { players, deck: newDeck } = getInitialPlayers(numPlayers, deck);
      setGameState({
        players,
        deck: newDeck,
        discardPile: [],
        currentTurn: 0,
      });
    }
  }, [numPlayers]);

  // Espera a que el usuario elija el número de jugadores
  if (!numPlayers) {
    return <PlayerSetup onStart={setNumPlayers} />;
  }

  // Si gameState aún no está listo, no renderices la mesa
  if (!gameState) return null;

  // Ejemplo de función para robar carta (ajusta según tu lógica)
  const handleDrawCard = () => {
    if (gameState.deck.length === 0) return;
    const newDeck = [...gameState.deck];
    const drawnCard = newDeck.pop();
    const updatedPlayers = [...gameState.players];
    updatedPlayers[gameState.currentTurn].cards.push(drawnCard);
    setGameState({
      ...gameState,
      deck: newDeck,
      players: updatedPlayers,
    });
  };

  return (
    <div style={styles.table}>
      <div style={styles.centerArea}>
        <Deck
          remaining={gameState.deck.length}
          onDraw={handleDrawCard}
          isActivePlayer={gameState.currentTurn === 0}
        />
        <DiscardPile
          topCard={gameState.discardPile[gameState.discardPile.length - 1]}
        />
      </div>
      <div style={styles.playersArea}>
        {gameState.players.map((player, index) => (
          <PlayerHand
            key={index}
            name={player.name}
            cards={player.cards}
            isCurrentPlayer={index === gameState.currentTurn}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  table: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    backgroundColor: "#0a8f08",
    minHeight: "100vh",
  },
  centerArea: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginBottom: "40px",
  },
  playersArea: {
    display: "flex",
    overflowX: "auto",
    gap: "20px",
    padding: "10px",
  },
};

export default GameTable;
