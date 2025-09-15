import React from "react";
import Card from "./Card";

const PlayerHand = ({ name, cards, isCurrentPlayer }) => {
  return (
    <div style={styles.handContainer}>
      <h4 style={{ color: isCurrentPlayer ? "#d9534f" : "#333" }}>{name}</h4>
      <div style={styles.cardsRow}>
        {cards.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  handContainer: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    width: "max-content",
    minWidth: "300px",
  },
  cardsRow: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
  },
};

export default PlayerHand;
