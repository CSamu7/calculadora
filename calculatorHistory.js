export default function calculatorHistory() {
  const history = {
    lastOperations: [],
    lastNumbers: [],
  };

  const addNumber = (number) => {
    history.lastNumbers.push(number);
  };

  const addLastOperation = (operation) => {
    history.lastOperations.push(operation);
  };

  return { history, addNumber, addLastOperation };
}
