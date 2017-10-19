let timer;
const returnTime = document.querySelector('.display__end-time');
const currentTime = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => button.addEventListener('click', quickTimer));

document.customForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const time = this.minutes.value * 60;

    startTimer(time);
    this.reset();
});

function startTimer(seconds) {
    clearInterval(timer);
    const now = Date.now();
    const then = now + seconds * 1000;

    showTime(seconds);
    showReturnTime(then);

    timer = setInterval(() => {

        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (timer <= 0) {
            clearInterval(timer);
            return;
        }

        showTime(secondsLeft);
    }, 1000)
}

function showReturnTime(timestamp) {
    let time = new Date(timestamp);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    returnTime.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showTime(time) {
    const hours = Math.floor(time / 3600);
    let timeLeft = time % 3600;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    currentTime.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function quickTimer() {
    const time = parseInt(this.dataset.time);
    startTimer(time);
}
