export default function calculatorScreen() {
  const calculatorScreen = document.getElementById("calculatorScreen");
  const calculatorScreenResult = document.getElementById(
    "calculatorScreenResult"
  );

  const getScreenValue = () => calculatorScreen.textContent;

  const updateNumber = (number) => {
    if (getScreenValue() === "0") {
      updateScreen(number);
    } else {
      updateScreen(getScreenValue() + number);
    }
  };

  const updateScreen = (value = "0") => {
    const fixedNumber = value.toString().slice(0, 11);

    calculatorScreen.textContent = fixedNumber;
  };

  const updateHistory = (value = "0") => {
    calculatorScreenResult.textContent = +parseFloat(value).toFixed(8);
  };

  return { updateScreen, getScreenValue, updateHistory, updateNumber };
}
