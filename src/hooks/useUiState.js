import { useState } from "react";

export const useUiState = () => {
  const [uiState, setUiState] = useState({
    state: "pending",
    message: "",
  });

  const updateUiState = (state) => {
    setUiState({ ...uiState, ...state });
  };

  const resetState = () => {
    setUiState({ state: "pending", message: "" });
  };
  return { uiState, updateUiState, resetState };
};
