import calculatorHistory from "./calculatorHistory.js";
import calculatorScreen from "./calculatorScreen.js";
import formatOperations from "./formatOperations.js";
import mathOperations from "./mathOperations.js";

export default function calculator() {
  const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const mathOperation = ["+", "/", "*", "-", "=", "Enter", "x", "÷", "√", "%"];
  const specialOperation = [".", "AC", "Backspace"];

  const { mathOperationsDict, oneNumberOperation } = mathOperations();
  const { reset } = formatOperations();
  const { updateScreen, getScreenValue, updateHistory, updateNumber } =
    calculatorScreen();
  const { history, addNumber, addLastOperation } = calculatorHistory();

  const formatOperationsObj = {
    AC: () => {
      updateScreen();
      updateHistory();
      history.lastNumbers = [];
      history.lastOperations = [];
    },
    Backspace: () => {
      const number = getScreenValue().toString();

      if (number.length === 1) {
        updateScreen();
        return;
      }

      const reducedNumber = number.slice(0, number.length - 1);

      updateScreen(reducedNumber);
    },
    ".": () => {
      let number = getScreenValue().toString();
      number += ".";

      updateScreen(number);
    },
  };

  const read = (input) => {
    if (numberKeys.find((n) => n === input)) updateNumber(input);

    if (mathOperation.find((k) => k === input)) operate(input);

    if (specialOperation.find((s) => s === input)) format(input);
  };

  const operate = (input) => {
    let result;
    const number = parseFloat(getScreenValue());

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
      console.log(error);
      result = error.message;
    } finally {
      if (result === number) {
        updateScreen();
      } else {
        addNumber(result);
        updateScreen(result);
      }
    }
  };

  const format = (input) => {
    formatOperationsObj[input]();
  };

  return { read };
}
