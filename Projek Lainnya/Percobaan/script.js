setInterval(() => {
  let date = new Date();
  let clock = document.getElementById('clock');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}, 1000);