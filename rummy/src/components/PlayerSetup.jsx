import React, { useState } from "react";

const PlayerSetup = ({ onStart }) => {
  const [numPlayers, setNumPlayers] = useState(4);

  return (
    <div style={{ padding: 30 }}>
      <h2>Configurar partida</h2>
      <label>
        Número de jugadores (4-12):{" "}
        <input
          type="number"
          min={4}
          max={12}
          value={numPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
        />
      </label>
      <button onClick={() => onStart(numPlayers)} style={{ marginLeft: 16 }}>
        Iniciar partida
      </button>
    </div>
  );
};

export default PlayerSetup;
