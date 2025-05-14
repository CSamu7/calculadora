import calculator from "./calculator.js";

const calculatorButtons = document.getElementById("buttons");

const { read } = calculator();

calculatorButtons.addEventListener("click", (e) => read(e.target.textContent));

document.addEventListener("keydown", (e) => read(e.key));
