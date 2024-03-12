function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}

function getCurrentDate() {
  const currentDate = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  return `${dayOfWeek} ${month} ${dayOfMonth}`;
}

function displayDateTime() {
  const dateElement = document.getElementById("date");
  const clockElement = document.getElementById("time");
  
  function updateTime() {
    const currentTime = getCurrentTime();
    clockElement.textContent = currentTime;
  }

  const currentDate = getCurrentDate();
  dateElement.textContent = currentDate;

  updateTime();

  setInterval(updateTime, 1000);
}

displayDateTime();

