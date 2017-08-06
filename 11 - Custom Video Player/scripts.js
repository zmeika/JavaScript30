const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const togglePlayButton = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');

function togglePlay() {
    if (video.paused || video.ended) {
        video.play()
    } else {
        video.pause()
    }
}

function updatePlayButton() {
    togglePlayButton.textContent = video.paused ? '►' : '❚ ❚';
}

function skip(event) {
    const skipRate = parseFloat(this.dataset.skip);
    const newTime = video.currentTime + skipRate;

    if (newTime < 0) {
        video.currentTime = 0;
    } else if (newTime > video.duration) {
        video.currentTime = video.duration;
    } else {
        video.currentTime = newTime;
    }
}

function changeSliderControls() {
    video[this.name] = this.value;
}

function handleProgress() {
    const currentPosition = (video.currentTime * 100) / video.duration;
    progressBar.style.flexBasis = `${currentPosition}%`;
}

function scrub(event) {
    const clickPosition = parseFloat(event.offsetX) / parseFloat(progress.offsetWidth);
    video.currentTime = video.duration * clickPosition;
}

togglePlayButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
skipButton.forEach(button => button.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('change', changeSliderControls));

let isMousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => isMousedown && scrub(event));
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);
