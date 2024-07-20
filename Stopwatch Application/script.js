let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        document.getElementById('startStopBtn').innerText = 'Stop';
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        document.getElementById('startStopBtn').innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    document.getElementById('time').innerText = '00:00.000';
    document.getElementById('startStopBtn').innerText = 'Start';
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const minutes = Math.floor(difference / (60 * 1000));
    const seconds = Math.floor((difference % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    document.getElementById('time').innerText = 
        (minutes > 9 ? minutes : '0' + minutes) + ':' + 
        (seconds > 9 ? seconds : '0' + seconds) + '.' + 
        (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}

function lap() {
    const lapTime = document.getElementById('time').innerText;
    laps.push(lapTime);
    const li = document.createElement('li');
    li.innerHTML = `<span class="flag">🏳️</span> Lap ${laps.length}: ${lapTime}`;
    document.getElementById('laps').appendChild(li);
}
