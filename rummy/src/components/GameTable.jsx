import React, { useState } from "react";
import Deck from "./Deck";
import DiscardPile from "./DiscardPile";
import PlayerHand from "./PlayerHand";

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

const generateFullDeck = () => {
  const deck = [];
  allSuits.forEach((suit) => {
    allValues.forEach((value) => {
      deck.push({ suit, value });
    });
  });
  return deck.sort(() => Math.random() - 0.5); // mezclar
};

const GameTable = () => {
    const [currentTurn, /*setCurrentTurn*/] = useState(0);
  const [deck, setDeck] = useState(generateFullDeck());
  const [discardPile, /*setDiscardPile*/] = useState([]);
  const [players, setPlayers] = useState([
    {
      name: "Tú",
      cards: [
        { value: "5", suit: "clubs" },
        { value: "K", suit: "diamonds" },
      ],
    },
    {
      name: "Jugador 2",
      cards: [
        { value: "3", suit: "spades" },
        { value: "7", suit: "hearts" },
      ],
    },
  ]);

  // 🔁 Función para robar una carta del mazo
  const handleDrawCard = () => {
    if (deck.length === 0) return;
  
    const newDeck = [...deck];
    const drawnCard = newDeck.pop();
  
    const updatedPlayers = [...players];
    updatedPlayers[currentTurn].cards.push(drawnCard);
  
    setDeck(newDeck);
    setPlayers(updatedPlayers);
  };

  return (
    <div style={styles.table}>
      <div style={styles.centerArea}>
        <Deck
          remaining={deck.length}
          onDraw={handleDrawCard}
          isActivePlayer={currentTurn === 0}
        />
        <DiscardPile topCard={discardPile[discardPile.length - 1]} />
      </div>

      <div style={styles.playersArea}>
        {players.map((player, index) => (
          <PlayerHand
            key={index}
            name={player.name}
            cards={player.cards}
            isCurrentPlayer={index === 0}
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
