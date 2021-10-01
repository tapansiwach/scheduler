import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(subsequent, replace = false) {
    // if it's a replace request...
    if (replace) {
      // delete the last item before adding to the history
      const copy = [...history];
      copy.pop();
      setMode(subsequent);
      setHistory([...copy, subsequent])
    } else { // if it's not a replace request
      // add the item to history
      setMode(subsequent);
      setHistory(prev => [...prev, subsequent])
    }
  }

  function back() {
    if (history.length > 1) {
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