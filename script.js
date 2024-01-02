const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'Dekho Na',
        displayName: 'Dekho Na',
        artist: 'Vedang, Secrets For Sale, Nanku',
    },
    {
        name: 'Funk Song',
        displayName: 'Funk Song',
        artist: 'Kidjaywest, Talwiinder, Ikath',
    },
    {
        name: 'Thunderclouds',
        displayName: 'Thunderclouds',
        artist: 'Sia, Diplo, Labrinth, LSD',
    },
    {
        name: 'Maroon 5 - Payphone - Fingerstyle Guitar Cover',
        displayName: 'Payphone - Fingerstyle Guitar Cover',
        artist: 'James Bartholomew',
    },
    {
        name: 'Te amo(reprise)',
        displayName: 'Te amo(reprise)',
        artist: 'Pritam, Mohit Chauhan',
    },

];

//Check if Playing
let isPlaying = false;
//Play Song
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
//Pause Song
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play/Pause Event Listener
playBtn.addEventListener('click', ()=> (
    isPlaying ? pauseSong() : playSong())
);

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//On Load - Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e){
    const{duration, currentTime} = e.srcElement;
    //Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration 
    const durationMinutes = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);
    if(durationSecs < 10){
        durationSecs = `0${durationSecs}`;
    }
    //Delay switching duration Element to avoid NaN
    if(durationSecs){
        durationEl.textContent = `${durationMinutes}:${durationSecs}`;
    }
    //Calculate display for current 
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if(currentSecs < 10){
        currentSecs = `0${currentSecs}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSecs}`;
}

//Set Progress Bar 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);