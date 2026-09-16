function getHistory() {
  return document.getElementById("history-value").innerText;
}

function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }

  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replaceAll(",", ""));
}

let operator = document.getElementsByClassName("operator");

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substring(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();

      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substring(0, history.length - 1);
        }
      }

      if (output != "" || history != "") {
        if (output == "") {
          output = "";
        } else {
          output = reverseNumberFormat(output);
        }

        history = history + output;

        if (this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output = output + this.id;
      printOutput(output);
    }
  });
}
async function fetchWeather() {
  let city='';
  const API_KEY = "bdf11506ec64ac75da0e70ff6be4b783";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
   try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    document.getElementById('temperature').innerHTML = data.main.temp + "°C";

    let weatherType = data.weather[0].main;
    let weatherEmoji;
    if(weatherType=="Clear") {
      weatherEmoji = "☀️";
    } else if(weatherType=="Clouds") {
      weatherEmoji = "☁️";
    } else if(weatherType=="Rain") {
      weatherEmoji = "🌧️";
    } else if(weatherType=="Snow") {
      weatherEmoji = "❄️";
    } else if(weatherType=="Thunderstorm") {
      weatherEmoji = "⛈️";
    }
    document.getElementById('weather-type').innerHTML = weatherEmoji + weatherType;

    document.getElementById("city-name").innerHTML = city;
   } catch (error) {
    console.error(error);
   }

}
fetchWeather();
