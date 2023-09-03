  let buttons = document.getElementsByTagName("button"),
    result = document.querySelectorAll(".result")[0],
    clear = document.getElementsByClassName("clear")[0],
    equation = [],
    operator = false;

  for (i = 0; i < buttons.length; i += 1) {
    if (buttons[i].innerHTML === "=") {
      buttons[i].addEventListener("click", calculate(i));
    } else if (buttons[i].innerHTML === "+/-") {
      buttons[i].addEventListener("click", invert(i));
    } else if (buttons[i].innerHTML === "%") {
      buttons[i].addEventListener("click", percent(i));
    } else if (buttons[i].innerHTML === "AC") {
      equation = [];
    } else {
      buttons[i].addEventListener("click", addValue(i));
    }
  }
  clear.onclick = function () {
    result.innerHTML = "";
    equation = [];
    operator = false;
  };
  function addValue(i) {
    return function () {
      if (buttons[i].innerHTML === "÷") {
        clicked(this);
        ifOperatorThanSwap("/");
      } else if (buttons[i].innerHTML === "x") {
        clicked(this);
        ifOperatorThanSwap("*");
      } else if (buttons[i].innerHTML === "+") {
        clicked(this);
        ifOperatorThanSwap("+");
      } else if (buttons[i].innerHTML === "-") {
        clicked(this);
        ifOperatorThanSwap("-");
      } else {
        removeClicked();
        if (checkIfNum(equation[equation.length - 1])) {
          equation = [];
          equation.push(buttons[i].innerHTML);
          operator = true;
        } else {
          equation.push(buttons[i].innerHTML);
        }
        if (operator) {
          result.innerHTML = buttons[i].innerHTML;
        } else {
          result.innerHTML += buttons[i].innerHTML;
        }
        operator = false;
      }
    };
  }
  function clicked(i) {
    removeClicked(i);
    i.classList.add("clicked");
  }
  function removeClicked(i) {
    let elems = document.querySelectorAll(".clicked");
    [].forEach.call(elems, function (el) {
      el.classList.remove("clicked");
    });
  }
  function calculate(i) {
    return function () {
      if (equation.length == 0) {
        return;
      } else {
        let answer = eval(equation.join(""));
        if (answer % 1 === 0) {
          result.innerHTML = answer;
        } else {
          result.innerHTML = answer.toFixed(4);
        }
        equation = [];
        equation.push(answer);
        operator = false;
      }
    };
  }
  function invert(i) {
    return function () {
      if (equation.length == 0) {
        return;
      } else {
        let number = result.innerHTML;
        popNumberOfDigits(number);
        let invert = number * -1;
        equation.push(invert);
        result.innerHTML = invert;
      }
    };
  }
  function percent(i) {
    return function () {
      let number = result.innerHTML;
      popNumberOfDigits(number);
      let percent = number * 0.01;
      equation.push(percent);
      result.innerHTML = percent.toFixed(2);
    };
  }
  function ifOperatorThanSwap(str) {
    if (!operator) {
      equation.push(str);
      operator = true;
    } else {
      equation.pop();
      equation.push(str);
    }
  }
  function checkIfNum(v) {
    if (typeof v == "string") {
      return false;
    } else if (typeof v == "number") {
      return true;
    }
  }
  function popNumberOfDigits(number) {
    let arr = number.split("");
    for (i = 0; i < arr.length; i++) {
      equation.pop();
    }
  }
