// Start with 24-hour format and dark theme
let is24Hour = true;

// Get elements from the HTML page
const timeBox = document.getElementById("time");
const ampmBox = document.getElementById("ampm");
const dateBox = document.getElementById("date");
const bar = document.getElementById("bar");
const btn12 = document.getElementById("btn12");
const btn24 = document.getElementById("btn24");
const themeBtn = document.getElementById("themeBtn");

// Add a leading zero (5 becomes 05)
function addZero(number) {
  return String(number).padStart(2, "0");
}

// Show time of another city
function showCityTime(elementId, timeZone) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: !is24Hour
  });
  document.getElementById(elementId).textContent = time;
}

// Main function: update the clock
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Find AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format if needed
  if (!is24Hour) {
    hours = hours % 12 || 12;
  }

  // Show time
  timeBox.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);

  // Show AM/PM only in 12-hour mode
  ampmBox.textContent = is24Hour ? "" : ampm;

  // Show date
  dateBox.textContent = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Move the progress bar (0 to 60 seconds)
  bar.style.width = (seconds / 60) * 100 + "%";

  // Show world clocks
  showCityTime("london", "Europe/London");
  showCityTime("newyork", "America/New_York");
  showCityTime("dubai", "Asia/Dubai");
  showCityTime("tokyo", "Asia/Tokyo");
}

// 12-hour button
btn12.addEventListener("click", function () {
  is24Hour = false;
  btn12.classList.add("active");
  btn24.classList.remove("active");
  updateClock();
});

// 24-hour button
btn24.addEventListener("click", function () {
  is24Hour = true;
  btn24.classList.add("active");
  btn12.classList.remove("active");
  updateClock();
});

// Theme button (dark / light)
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "Dark";
  } else {
    themeBtn.textContent = "Light";
  }
});

// Start the clock
updateClock();

// Update every second
setInterval(updateClock, 1000);
