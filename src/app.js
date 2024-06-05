let songs = [
    {
        title: "Blow",
        artist: "Ed Sheeran (With Chris Stapleton & Bruno Mars)",
        year: 2020,
        duration: "3:31",
        genre: "Rock",
        cover: "Activos/Imagenes/Blow.png",
        file: "Activos/Audios/Ed Sheeran - BLOW (with Chris Stapleton & Bruno Mars).mp3"
    },
    {
        title: "Midas Touch",
        artist: "Kiss Of Life",
        year: 2024,
        duration: "2:49",
        genre: "K-Pop",
        cover: "Activos/Imagenes/KOL.jpg",
        file: "Activos/Audios/KISS OF LIFE (키스오브라이프) - Midas Touch.mp3"
    },
    {
        title: "THE DRIVER",
        artist: "Maneskin",
        year: 2023,
        duration: "3:30",
        genre: "Pop Rock",
        cover: "Activos/Imagenes/maneskin.jpg",
        file: "Activos/Audios/Måneskin - THE DRIVER.mp3"
    },
    {
        title: "Relax, Take it Easy",
        artist: "MIKA",
        year: 2007,
        duration: "3:55",
        genre: "Pop",
        cover: "Activos/Imagenes/MikaCartoonMotion.jpg",
        file: "Activos/Audios/MIKA - Relax, Take It Easy.mp3"
    },
    {
        title: "Lose Control",
        artist: "Teddy Swims",
        year: 2023,
        duration: "3:30",
        genre: "Pop",
        cover: "Activos/Imagenes/teddysw.jpg",
        file: "Activos/Audios/Teddy Swims - Lose Control.mp3"
    },
    {
        title: "Mon Amour",
        artist: "Slimane",
        year: 2024,
        duration: "3:09",
        genre: "Balada",
        cover: "Activos/Imagenes/Slimane.jpeg",
        file: "Activos/Audios/Slimane - Mon Amour.mp3"
    }
];

let currentIndex = 0;
let audio = new Audio();

function login() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (username && email && password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('player').style.display = 'block';
        loadSong(currentIndex);
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function loadSong(index) {
    let song = songs[index];
    document.getElementById('cover').src = song.cover;
    document.getElementById('songTitle').innerText = song.title;
    document.getElementById('songArtist').innerText = song.artist;
    document.getElementById('songYear').innerText = song.year;
    document.getElementById('songDuration').innerText = song.duration;
    document.getElementById('songGenre').innerText = song.genre;
    audio.src = song.file;

    let songInfo = document.getElementById('songInfo');
    songInfo.innerHTML = `
        <h3 id="songTitle">${song.title}</h3>
        <p id="songArtist">${song.artist}</p>
        <p id="songYear">${song.year}</p>
        <p id="songDuration">${song.duration}</p>
        <p id="songGenre">${song.genre}</p>
    `;

    // Añadir botón para agregar a playlist
    let addToPlaylistButton = document.createElement('button');
    addToPlaylistButton.innerText = "Agregar a Playlist";
    addToPlaylistButton.onclick = () => addToPlaylist(index);
    songInfo.appendChild(addToPlaylistButton);
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function muteSong() {
    audio.muted = !audio.muted;
}

function searchSongs() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    let filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query) || 
        song.genre.toLowerCase().includes(query)
    );

    let songList = document.getElementById('songList');
    songList.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        let songItem = document.createElement('div');
        songItem.classList.add('list-group-item');
        songItem.innerText = `${song.title} - ${song.artist}`;
        songItem.onclick = () => {
            currentIndex = songs.indexOf(song);  // Buscar el índice real
            loadSong(currentIndex);
            playSong();
        };
        songList.appendChild(songItem);
    });
}

function toggleSongList() {
    let songList = document.getElementById('songList');
    if (songList.style.display === 'none') {
        songList.style.display = 'block';
    } else {
        songList.style.display = 'none';
    }
}

let playlist = [];

function addToPlaylist(index) {
    playlist.push(songs[index]);
    updatePlaylist();
}

function removeFromPlaylist(index) {
    playlist.splice(index, 1);
    updatePlaylist();
}

function updatePlaylist() {
    let playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
        let playlistItem = document.createElement('div');
        playlistItem.classList.add('list-group-item');
        playlistItem.innerText = `${song.title} - ${song.artist}`;
        playlistItem.onclick = () => removeFromPlaylist(index);
        playlistElement.appendChild(playlistItem);
    });
}
