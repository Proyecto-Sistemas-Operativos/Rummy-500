import React from "react";

const OpponentHand = ({ name, cardCount, isCurrentPlayer }) => (
  <div style={styles.handContainer}>
    <h4 style={{ color: isCurrentPlayer ? "#d9534f" : "#333" }}>{name}</h4>
    <div style={styles.cardsRow}>
      {Array.from({ length: cardCount }).map((_, i) => (
        <div key={i} style={styles.cardBack}></div>
      ))}
    </div>
  </div>
);

const styles = {
  handContainer: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    width: "max-content",
    minWidth: "120px",
  },
  cardsRow: {
    display: "flex",
    gap: "4px",
    overflowX: "auto",
  },
  cardBack: {
    width: "24px",
    height: "36px",
    backgroundColor: "#2c3e50",
    borderRadius: "4px",
    marginRight: "2px",
  },
};

export default OpponentHand;
