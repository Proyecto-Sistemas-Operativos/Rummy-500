import React from "react";
import Card from "./Card";

const DiscardPile = ({ topCard }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {topCard ? (
        <Card value={topCard.value} suit={topCard.suit} />
      ) : (
        <div style={styles.empty}>Vacío</div>
      )}
      <span style={{ marginTop: "8px", fontSize: "14px" }}>
        Pila de descarte
      </span>
    </div>
  );
};

const styles = {
  empty: {
    width: "80px",
    height: "120px",
    border: "2px dashed #aaa",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
  },
};

export default DiscardPile;
