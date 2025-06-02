import React from "react";
import "../styles/Card.css";

const Card = ({ value, suit }) => {
  const suitSymbols = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  const isRed = suit === "hearts" || suit === "diamonds";

  return (
    <div className={`card ${isRed ? "red" : "black"}`}>
      <span className="value">{value}</span>
      <span className="suit">{suitSymbols[suit]}</span>
    </div>
  );
};

export default Card;
