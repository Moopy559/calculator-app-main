const display = document.getElementById("display");

const processor = {
  arrayQueue: ["", "", ""],
  updateDisplay: function (value) {
    display.textContent = value;
    if (display.textContent.length === 0) {
      display.textContent = "0";
    }
    display.textContent = this.checkComma(display.textContent);
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
        this.arrayQueue[0] = `${result}`;
        this.updateDisplay(result);
        break;
      case "-":
        result = this.arrayQueue[0] * 1 - this.arrayQueue[2] * 1;
        this.clearArray();
        this.arrayQueue[0] = `${result}`;
        this.updateDisplay(result);
        break;
      case "*":
        result = this.arrayQueue[0] * 1 * this.arrayQueue[2] * 1;
        this.clearArray();
        this.arrayQueue[0] = `${result}`;
        this.updateDisplay(result);
        break;
      case "/":
        result = ((this.arrayQueue[0] * 1) / this.arrayQueue[2]) * 1;
        this.clearArray();
        this.arrayQueue[0] = `${result}`;
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
  checkComma: function (value) {
    let splitArray;
    if (this.decimalExists(value)) {
      splitArray = value.split(".");
      if (splitArray[0].length < 4) {
        return value;
      } else {
        switch (splitArray[0].length) {
          case 4:
            return (
              splitArray[0].slice(0, 1) +
              "," +
              splitArray[0].slice(1) +
              "." +
              splitArray[1]
            );
          case 5:
            return (
              splitArray[0].slice(0, 2) +
              "," +
              splitArray[0].slice(2) +
              "." +
              splitArray[1]
            );
          case 6:
            return (
              splitArray[0].slice(0, 3) +
              "," +
              splitArray[0].slice(3) +
              "." +
              splitArray[1]
            );
          case 7:
            splitArray[0].slice(0, 1) +
              "," +
              splitArray[0].slice(1, 4) +
              "," +
              splitArray[0].slice(4) +
              "." +
              splitArray[1];
          case 8:
            return (
              splitArray[0].slice(0, 2) +
              "," +
              splitArray[0].slice(2, 5) +
              "," +
              splitArray[0].slice(5) +
              "." +
              splitArray[1]
            );
        }
      }
    } else {
      if (value.length < 4) {
        return value;
      } else {
        switch (value.length) {
          case 4:
            return value.slice(0, 1) + "," + value.slice(1);
          case 5:
            return value.slice(0, 2) + "," + value.slice(2);
          case 6:
            return value.slice(0, 3) + "," + value.slice(3);
          case 7:
            value.slice(0, 1) + "," + value.slice(1, 4) + "," + value.slice(4);
          case 8:
            return (
              value.slice(0, 2) + "," + value.slice(2, 5) + "," + value.slice(5)
            );
        }
      }
    }
  },
  decimalExists: function (value) {
    return value.includes(".") ? true : false;
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

const clickEvents = {
  numbAction: function (isClick, number) {
    if (isClick) {
      if (processor.isUnderLimit()) {
        if (processor.arrayQueue[1].length === 0) {
          processor.passValue(0, number.textContent);
        } else {
          processor.passValue(2, number.textContent);
        }
      }
    } else {
      if (processor.isUnderLimit()) {
        if (processor.arrayQueue[1].length === 0) {
          processor.passValue(0, number);
        } else {
          processor.passValue(2, number);
        }
      }
    }
  },
  operatorAction: function (isClick, operator) {
    if (isClick) {
      // Click logic for operators
      if (processor.arrayQueue[1].length === 0) {
        processor.arrayQueue[1] = operator.getAttribute("value");
        processor.updateDisplay(processor.arrayQueue[1]);
        console.log(processor.arrayQueue);
      }
    } else {
      // Click logic for operators
      if (processor.arrayQueue[1].length === 0) {
        processor.arrayQueue[1] = operator;
        processor.updateDisplay(processor.arrayQueue[1]);
        console.log(processor.arrayQueue);
      }
    }
  },
  deleteAction: function () {
    if (processor.arrayQueue[1].length === 0) {
      processor.arrayQueue[0] = processor.arrayQueue[0].slice(
        0,
        processor.arrayQueue[0].length - 1
      );
      processor.updateDisplay(processor.arrayQueue[0]);
    } else {
      processor.arrayQueue[2] = processor.arrayQueue[2].slice(
        0,
        processor.arrayQueue[2].length - 1
      );
      processor.updateDisplay(processor.arrayQueue[2]);
    }
  },
  resetAction: function () {
    processor.clearArray();
    processor.updateDisplay("0");
  },
  equalsAction: function () {
    if (processor.arrayQueue[2].length > 0) {
      processor.calculate(processor.arrayQueue[1]);
      console.log(processor.arrayQueue);
    } else {
      processor.updateDisplay(processor.arrayQueue[0]);
    }
  },
};

// Click logic for numbers
buttons.numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (number.textContent === ".") {
      if (processor.decimalExists(display.textContent)) {
        return;
      } else {
        clickEvents.numbAction(true, number);
      }
    } else {
      clickEvents.numbAction(true, number);
    }
  });
});

// Click logic for operators
buttons.operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    clickEvents.operatorAction(true, operator);
  });
});

// Click logic for delete
del.addEventListener("click", () => {
  if (processor.arrayQueue[1].length === 0) {
    processor.arrayQueue[0] = processor.arrayQueue[0].slice(
      0,
      processor.arrayQueue[0].length - 1
    );
    processor.updateDisplay(processor.arrayQueue[0]);
  } else {
    processor.arrayQueue[2] = processor.arrayQueue[2].slice(
      0,
      processor.arrayQueue[2].length - 1
    );
    processor.updateDisplay(processor.arrayQueue[2]);
  }
});

// Click logic for reset
reset.addEventListener("click", () => {
  clickEvents.resetAction();
});

// Click logic for equals
equals.addEventListener("click", () => {
  clickEvents.equalsAction();
});

// Keyboard listener
document.addEventListener("keydown", (e) => {
  if (e.key * 1 < 10) {
    clickEvents.numbAction(false, e.key);
  }

  switch (e.key) {
    case "Enter":
      clickEvents.equalsAction();
      break;
    case "Backspace":
      clickEvents.deleteAction();
      break;
    case "+":
      clickEvents.operatorAction(false, e.key);
      break;
    case "-":
      clickEvents.operatorAction(false, e.key);
      break;
    case "*":
      clickEvents.operatorAction(false, e.key);
      break;
    case "/":
      clickEvents.operatorAction(false, e.key);
      break;
    case ".":
      if (processor.decimalExists(display.textContent)) {
        return;
      }
      clickEvents.numbAction(false, e.key);
      break;
    case "c":
      clickEvents.resetAction();
      break;
  }
});
