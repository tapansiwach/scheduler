import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(subsequent) {
    setMode(subsequent);
  }

  function back() {

  }

  return {
    mode,
    transition,
    back
  };
}