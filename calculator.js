import calculatorHistory from "./calculatorHistory.js";
import calculatorScreen from "./calculatorScreen.js";
import formatOperations from "./formatOperations.js";
import mathOperations from "./mathOperations.js";

export default function calculator() {
  const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const mathOperation = ["+", "/", "*", "-", "=", "Enter", "x", "÷", "√", "%"];
  const formatOperation = [".", "AC", "Backspace"];

  const { history, addNumber, addLastOperation } = calculatorHistory();
  const { mathOperationsDict, oneNumberOperation } = mathOperations();
  const { formatOperationsDict } = formatOperations(history);
  const { updateScreen, getScreenValue, updateHistory, updateNumber } =
    calculatorScreen();

  const read = (input) => {
    if (numberKeys.find((n) => n === input)) updateNumber(input);

    if (mathOperation.find((k) => k === input)) operate(input);

    if (formatOperation.find((s) => s === input)) formatOperationsDict[input]();
  };

  const operate = (input) => {
    let result;
    const number = parseFloat(getScreenValue());

    if (input === "-" && number === 0 && getScreenValue().length === 1) {
      updateNumber("-");
      return;
    }

    if (isNaN(number)) {
      updateScreen();
      return;
    }

    addNumber(number);
    updateHistory(number);
    addLastOperation(input);

    const lastOperation = history.lastOperations.at(-2) ?? "";

    if (lastOperation !== input && !oneNumberOperation.includes(input)) {
      updateScreen();
      return;
    }

    try {
      result = mathOperationsDict[input](history);
    } catch (error) {
      result = error.message;
    } finally {
      if (result === number) {
        updateScreen();
      } else {
        updateScreen(result);
      }
    }
  };

  return { read };
}
