let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById("startStop").textContent = "Stop";
    startTime = Date.now() - (lapCount > 1 ? lapTimes[lapTimes.length - 1] : 0);
    timer = setInterval(updateDisplay, 10);
  } else {
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    clearInterval(timer);
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("display").textContent = "00:00:00";
  lapCount = 1;
  lapTimes = [];
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    let lapTime = Date.now() - startTime;
    lapTimes.push(lapTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = "Lap " + lapCount + ": " + formatTime(lapTime);
    document.getElementById("laps").appendChild(lapItem);
    lapCount++;
  }
}

function updateDisplay() {
  let elapsedTime = Date.now() - startTime;
  document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  let date = new Date(milliseconds);
  let hours = date.getUTCHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  let centiseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, "0");
  return hours + ":" + minutes + ":" + seconds + ":" + centiseconds;
}

let lapTimes = [];