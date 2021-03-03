const startTimer = document.querySelector(".start");
const pauseTimer = document.querySelector(".pause");
const resetTimer = document.querySelector(".reset");
const lap = document.querySelector(".lap");
const clearLaps = document.querySelector(".clear-laps");
const showLaps = document.querySelector(".show-laps");
const showLapText = document.querySelector(".show-text");
const timer = document.querySelector(".timer");
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = 0;
let running = 0;
let time;

startTimer.addEventListener("click", function() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);

    paused = 0;
    running = 1;
  }
});

pauseTimer.addEventListener("click", function() {
  if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  }
});

lap.addEventListener("click", function() {
  if (time) {
    showLapText.textContent = "Laps";
    let newItem = document.createElement("LI");
    let newText = document.createTextNode(time);
    newItem.appendChild(newText);
    showLaps.appendChild(newItem);
  }
});

clearLaps.addEventListener("click", function() {
    showLapText.textContent = "";
    showLaps.textContent = "";
});

resetTimer.addEventListener("click", function() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  time = 0;
  timer.textContent = `00:00:00`;
});

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
  difference = updatedTime - startTime;
  }

  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor(difference % 1000);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = milliseconds.toString().slice(0, 2);

  time = `${minutes}:${seconds}:${milliseconds}`;

  timer.textContent = time;

}

