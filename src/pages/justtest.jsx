import React, { useEffect, useState } from "react";

const JustTest = () => {
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [cps, setCps] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (clicks > 0 && !timerStarted) {
      setTimerStarted(true);
      const seconds = 5;
      const timer = setTimeout(() => {
        setShowMessage(true);
        setCps(clicks / seconds);
      }, seconds * 1000);

      // Limpeza do temporizador
      return () => clearTimeout(timer);
    }
  }, [clicks, timerStarted]);

  return (
    <div>
      <h1>Tente clicar rápido</h1>
      <h2>{clicks}</h2>
      <button onClick={() => setClicks(clicks + 1)}>Clique aqui</button>
      {showMessage && <h2>{cps.toFixed(2)} cliques por segundo</h2>}
    </div>
  );
};

export default JustTest;
