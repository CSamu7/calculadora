import calculatorScreen from "./calculatorScreen.js";

export default function formatOperations() {
  const { updateScreen, updateHistory } = calculatorScreen();

  const reset = () => {
    updateHistory("0");
    updateScreen("0");
  };

  return { reset };
}
