import calculatorScreen from "./calculatorScreen.js";

export default function formatOperations(history) {
  const { updateScreen, updateHistory, getScreenValue } = calculatorScreen();

  const reset = () => {
    updateScreen();
    updateHistory();
    history.lastNumbers = [];
    history.lastOperations = [];
  };

  const addPoint = () => {
    let number = getScreenValue().toString();
    number += ".";

    updateScreen(number);
  };

  const deleteNumber = () => {
    const number = getScreenValue().toString();

    if (number.length === 1) {
      updateScreen();
      return;
    }

    const reducedNumber = number.slice(0, number.length - 1);

    updateScreen(reducedNumber);
  };

  const formatOperationsDict = {
    AC: reset,
    ".": addPoint,
    Backspace: deleteNumber,
  };

  return { formatOperationsDict };
}
