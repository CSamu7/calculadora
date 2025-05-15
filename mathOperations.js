export default function mathOperations() {
  const sum = (history) => {
    const number1 = history.lastNumbers.at(-1) ?? 0;
    const number2 = history.lastNumbers.at(-2) ?? 0;

    return number1 + number2;
  };

  const rest = (history) => {
    const number1 = history.lastNumbers.at(-1) ?? 0;
    const number2 = history.lastNumbers.at(-2) ?? 0;

    return number2 - number1;
  };

  const multiplication = (history) => {
    const number1 = history.lastNumbers.at(-1) ?? 1;
    const number2 = history.lastNumbers.at(-2) ?? 1;

    return number1 * number2;
  };

  const division = (history) => {
    const number1 = history.lastNumbers.at(-1) ?? 1;
    const number2 = history.lastNumbers.at(-2);

    if (number1 === 0) throw new Error("ERROR");

    return number2 / number1;
  };

  const square = (history) => {
    const number1 = history.lastNumbers.at(-1) ?? 0;

    return Math.sqrt(number1);
  };

  const getPercentage = (history) => {
    const position = history.lastOperations.lastIndexOf("%");
    const lastOperation = history.lastOperations[position - 2];

    if (lastOperation === "x" || lastOperation === "*") {
      const number1 = history.lastNumbers.at(-2);
      const number2 = history.lastNumbers.at(-3);

      return number1 * (number2 / 100);
    }
  };

  const equal = (history) => {
    const lastOperation = history.lastOperations.findLast(
      (operation) => operation !== "=" && operation !== "Enter"
    );

    const result = mathOperationsDict[lastOperation](history);

    return result;
  };

  const mathOperationsDict = {
    "+": sum,
    "-": rest,
    "*": multiplication,
    x: multiplication,
    "/": division,
    "÷": division,
    "√": square,
    "=": equal,
    Enter: equal,
    "%": getPercentage,
  };

  const oneNumberOperation = ["%", "=", "Enter", "√"];

  return { mathOperationsDict, oneNumberOperation };
}
