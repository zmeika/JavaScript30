const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(error => {
            console.error(error);
        })
}

function paintToCanvas() {
    const {videoWidth: width, videoHeight: height} = video;

    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);

        // pixels = cutColor(pixels);
        //
        // ctx.putImageData(pixels, 0, 0);
    }, 16);

}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'photo');
    link.innerHTML = `<img src="${data}" alt="Julia" />`

    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] * 3;
        pixels.data[i + 1] = pixels.data[i + 1] * 0.5;
        pixels.data[i + 2] = pixels.data[i + 1] * 0.5;
    }

    return pixels;
}

function greenEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] * 0.5;
        pixels.data[i + 1] = pixels.data[i + 1] * 3;
        pixels.data[i + 2] = pixels.data[i + 1] * 0.5;
    }

    return pixels;
}

function blueEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] * 0.5;
        pixels.data[i + 1] = pixels.data[i + 1] * 0.5;
        pixels.data[i + 2] = pixels.data[i + 1] * 3;
    }

    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 100] = pixels.data[i];
        pixels.data[i - 300] = pixels.data[i + 1];
        pixels.data[i + 300] = pixels.data[i + 2];
    }
    return pixels;
}

function cutColor(pixels) {

    const levels = [];

    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = input.value;
    });
    for (let i = 0; i < pixels.data.length; i += 4) {
        let red = pixels.data[i];
        let green = pixels.data[i + 1];
        let blue = pixels.data[i + 2];

        if (red >= levels.rmin && red <= levels.rmax
            && green >= levels.gmin && green <= levels.gmax
            && blue >= levels.bmin && blue <= levels.bmax) {
            pixels.data[i + 3] = 0
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);