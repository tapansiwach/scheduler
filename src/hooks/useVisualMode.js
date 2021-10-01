import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(subsequent) {
    setMode(subsequent);
    setHistory(prev => [...prev, subsequent])
  }

  function back() {
    if (history.length > 0) {
      // make a copy of history so we can pop from it directly instead of having to use setHistory
      const copy = [...history];
      copy.pop();
      // change history using setHistory
      setHistory(copy);
      // setMode using the copy because setHistory may not have executed immediately
      setMode(copy[copy.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}