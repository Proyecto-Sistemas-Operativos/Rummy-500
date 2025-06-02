import React from "react";

const Deck = ({ remaining, onDraw }) => {
  return (
    <div style={styles.deck} onClick={onDraw}>
      <div style={styles.cardBack}></div>
      <p style={{ color: "#fff", marginTop: "8px" }}>{remaining} cartas</p>
    </div>
  );
};

const styles = {
  deck: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  cardBack: {
    width: "60px",
    height: "90px",
    backgroundColor: "#2c3e50",
    borderRadius: "8px",
    boxShadow: "0 0 4px rgba(0,0,0,0.4)",
  },
};

export default Deck;
