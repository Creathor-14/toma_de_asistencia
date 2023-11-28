const audio = document.getElementById('mi-audio');

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

function setVolume(volume) {
    audio.volume = volume;
}
playAudio();
setVolume(0.1);
