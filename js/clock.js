const targetDate = new Date("2025-08-09T15:30:00").getTime();
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "🎉 ¡Ha llegado!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.textContent = days;
    hoursSpan.textContent = String(hours).padStart(2, "0");
    minutesSpan.textContent = String(minutes).padStart(2, "0");
    secondsSpan.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown(); // Ejecuta de inmediato para no esperar un segundo
  const interval = setInterval(updateCountdown, 1000);