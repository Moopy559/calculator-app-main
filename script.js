const display = document.getElementById("display");

const processor = {
  arrayQueue: ["", "", ""],
  updateDisplay: function (value) {
    display.textContent = value;
  },
  passValue: function (index, value) {
    this.arrayQueue[index] += value.toString();
    console.log(this.arrayQueue);
    this.updateDisplay(processor.arrayQueue[index]);
  },
  calculate: function (operator) {
    let result = "";
    switch (operator) {
      case "+":
        result = this.arrayQueue[0] * 1 + this.arrayQueue[2] * 1;
        this.clearArray();
        this.arrayQueue[0] = result;
        this.updateDisplay(result);
        break;
      case "-":
        result = this.arrayQueue[0] * 1 - this.arrayQueue[2] * 1;
        this.clearArray();
        this.arrayQueue[0] = result;
        this.updateDisplay(result);
        break;
      case "*":
        result = this.arrayQueue[0] * 1 * this.arrayQueue[2] * 1;
        this.clearArray();
        this.arrayQueue[0] = result;
        this.updateDisplay(result);
        break;
      case "/":
        result = ((this.arrayQueue[0] * 1) / this.arrayQueue[2]) * 1;
        this.clearArray();
        this.arrayQueue[0] = result;
        this.updateDisplay(result);
        break;
    }
  },
  clearArray: function () {
    this.arrayQueue = ["", "", ""];
  },
  isUnderLimit: function () {
    return display.textContent.length < 10 ? true : false;
  },
};

const buttons = {
  equals: document.getElementById("equals"),
  reset: document.getElementById("reset"),
  del: document.getElementById("del"),
  decimal: document.getElementById("decimal"),
  numbers: document.querySelectorAll(".numbers"),
  operators: document.querySelectorAll(".operators"),
};

// Click logic for numbers
buttons.numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (processor.isUnderLimit()) {
      if (processor.arrayQueue[1].length === 0) {
        processor.passValue(0, number.textContent);
      } else {
        processor.passValue(2, number.textContent);
      }
    }
  });
});

// Click logic for operators
buttons.operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (processor.arrayQueue[1].length === 0) {
      processor.arrayQueue[1] = operator.getAttribute("value");
      processor.updateDisplay(processor.arrayQueue[1]);

      console.log(processor.arrayQueue);
    }
  });
});

// Click logic for equals
equals.addEventListener("click", () => {
  if (processor.arrayQueue[2].length > 0) {
    processor.calculate(processor.arrayQueue[1]);
    console.log(processor.arrayQueue);
  } else {
    processor.updateDisplay(processor.arrayQueue[0]);
    processor.clearArray();
  }
});

// Click logic foe delete
del.addEventListener("click", () => {
  processor.arrayQueue[1].length === 0
    ? (processor.arrayQueue[0] = processor.arrayQueue[0].slice(
        0,
        processor.arrayQueue[0].length - 1
      ))
    : (processor.arrayQueue[2] = processor.arrayQueue[2].slice(
        0,
        processor.arrayQueue[2].length - 1
      ));
});

// Click logic for reset
reset.addEventListener("click", () => {
  processor.clearArray();
  processor.updateDisplay("0");
});

// processor.passValue(0, 2);
// processor.passValue(0, 0);
// processor.passValue(0, 0);
// processor.passValue(1, "+");
// processor.passValue(2, 3);
// console.log(processor.arrayQueue);
// console.log("203 = " + processor.calculate(processor.arrayQueue[1]));

// processor.passValue(0, 2);
// processor.passValue(0, 0);
// processor.passValue(0, 0);
// processor.passValue(1, "*");
// processor.passValue(2, 3);
// console.log(processor.arrayQueue);
// console.log("600 = " + processor.calculate(processor.arrayQueue[1]));

// processor.passValue(0, 2);
// processor.passValue(0, 0);
// processor.passValue(0, 0);
// processor.passValue(1, "-");
// processor.passValue(2, 3);
// console.log(processor.arrayQueue);
// console.log("197 = " + processor.calculate(processor.arrayQueue[1]));

// processor.passValue(0, 2);
// processor.passValue(0, 0);
// processor.passValue(0, 0);
// processor.passValue(1, "/");
// processor.passValue(2, 3);
// console.log(processor.arrayQueue);
// console.log("66.666 = " + processor.calculate(processor.arrayQueue[1]));
