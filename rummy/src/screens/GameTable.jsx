import React, { useState, } from "react";
import Deck from "../components/Deck";
import DiscardPile from "../components/DiscardPile";
import PlayerHand from "../components/PlayerHand";
import PlayerSetup from "../components/PlayerSetup";
import OpponentHand from "../components/OponentHand";

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
  const [dealer, setDealer] = useState(null);
  const [gameState, setGameState] = useState(null);

  React.useEffect(() => {
    if (numPlayers) {
      const randomDealer = Math.floor(Math.random() * numPlayers);
      setDealer(randomDealer);
      const deck = generateFullDeck(numPlayers);
      const { players, deck: newDeck } = getInitialPlayers(numPlayers, deck);
      setGameState({
        players,
        deck: newDeck,
        discardPile: [],
        currentTurn: (randomDealer + 1) % numPlayers, // Mano es el de la izquierda del dealer
      });
    }
  }, [numPlayers]);

  // Espera a que el usuario elija el número de jugadores
  if (!numPlayers) {
    return <PlayerSetup onStart={setNumPlayers} />;
  }

  // Si gameState aún no está listo, no renderices la mesa
  if (!gameState) return null;

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
      <div style={{ marginBottom: 16 }}>
        <b>Dealer:</b> {dealer !== null ? gameState.players[dealer].name : ""}
      </div>
      <div style={styles.centerArea}>
        <div style={styles.leftOpponent}>
          <OpponentHand
            name={
              gameState.players[(gameState.currentTurn + 1) % numPlayers].name
            }
            cardCount={
              gameState.players[(gameState.currentTurn + 1) % numPlayers].cards
                .length
            }
          />
        </div>
        <div style={styles.middleArea}>
          {/* Arriba */}
          <div style={styles.topOpponent}>
            <OpponentHand
              name={
                gameState.players[(gameState.currentTurn + 2) % numPlayers].name
              }
              cardCount={
                gameState.players[(gameState.currentTurn + 2) % numPlayers]
                  .cards.length
              }
            />
          </div>
          <div style={styles.deckAndDiscard}>
            <Deck
              remaining={gameState.deck.length}
              onDraw={handleDrawCard}
              isActivePlayer={gameState.currentTurn === 0}
            />
            <DiscardPile
              topCard={gameState.discardPile[gameState.discardPile.length - 1]}
            />
          </div>
        </div>
        <div style={styles.rightOpponent}>
        <OpponentHand
          name={gameState.players[(gameState.currentTurn + 3) % numPlayers].name}
          cardCount={gameState.players[(gameState.currentTurn + 3) % numPlayers].cards.length}
        />
      </div>
    </div>
    <div style={styles.myHandRow}>
      <PlayerHand
        name={gameState.players[gameState.currentTurn].name}
        cards={gameState.players[gameState.currentTurn].cards}
        isCurrentPlayer={true}
      />
    </div>
  </div>
);
}
      

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
  leftOpponent: {
    flex: "0 0 160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightOpponent: {
    flex: "0 0 160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  middleArea: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topOpponent: {
    marginBottom: "30px",
  },
  deckAndDiscard: {
    display: "flex",
    flexDirection: "row",
    gap: "50px",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90vw", 
  },
  myHandRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
    //position: "fixed",
    bottom: 0,
    left: 0,
    padding: "20px 0",
    background: "rgba(10,143,8,0.95)",
    zIndex: 10,
  },
};

export default GameTable;
