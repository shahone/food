//! Timer

function timer(deadline) {

  // функция расчета времени до дэдлайна
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  // функция записывает расчеты в верстку
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.t <= 0) {
        clearInterval(timeInterval);
        console.log(t.days);
        // t.hours = 0;
        // t.minutes = 0;
        // t.seconds = 0;
      }
    }
  }
  setClock('.timer', deadline);

  // функция 0 добавляет
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num < 0) {
      return `00`;
    } else {
      return num;
    }
  }
}

export default timer;