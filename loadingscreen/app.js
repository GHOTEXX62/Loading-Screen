// --- CONFIGURATION DES INFOS EN CONTINU (Avec Staff, VIP, Astuces...) ---
const infosList = [
    { title: "📜 Règle d'or", text: "Respectez impérativement le FearRP, le PainRP et la cohérence de vos rôles en toutes circonstances." },
    { title: "🛡️ L'Équipe du Staff", text: "Un problème en jeu ? Notre équipe de modération est à votre écoute ! N'hésitez pas à ouvrir un ticket via le menu." },
    { title: "⚔️ Propriétés", text: "Le Propskill, Propblock, Proppush ou Propclimb sont interdits et lourdement sanctionnés par le staff." },
    { title: "💎 Avantages VIP", text: "Devenez membre VIP pour débloquer des métiers exclusifs, des véhicules de luxe inédits et soutenir le projet !" },
    { title: "📢 Communauté", text: "Rejoignez notre Discord officiel (discord.gg/votreserveur) pour suivre l'actualité des mises à jour !" },
    { title: "💡 Astuce Légale", text: "Consultez le menu F4 en jeu pour acheter des imprimantes à billets (money printers) et générer du cash passivement." }
];

// --- CONFIGURATION DE LA PLAYLIST MUSIQUE ---
const playlist = [
    { file: "musique1.mp3", title: "PhonkWave - Cyber Street" },
    { file: "musique2.mp3", title: "LoFi Chill - DarkRP Night" },
    { file: "musique3.mp3", title: "Synthwave - Neon Pursuit" }
];

// Récupération des éléments HTML
const music = document.getElementById('loading-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const musicTitle = document.getElementById('music-title');
const volumeIcon = document.getElementById('volume-icon');
const volumeSlider = document.getElementById('volume-slider');
const newsContainer = document.getElementById('news-container');

// --- LOGIQUE DU DÉFILEMENT DES TEXTES ---
let currentInfoIndex = 0;

function updateInfos() {
    const info = infosList[currentInfoIndex];
    newsContainer.innerHTML = "";
    setTimeout(() => {
        newsContainer.innerHTML = `
            <div class="fade-in-out">
                <div class="ticker-title">${info.title}</div>
                <div class="ticker-text">${info.text}</div>
            </div>
        `;
    }, 50);
    currentInfoIndex = (currentInfoIndex + 1) % infosList.length;
}
updateInfos();
setInterval(updateInfos, 5000);


// --- LOGIQUE DE LA MUSIQUE ---
let currentTrackIndex = -1;
let hasStartedPlaying = false; 

function playTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    music.src = track.file;
    musicTitle.innerText = track.title; 
    music.volume = volumeSlider.value; 
    
    music.play().then(() => {
        playPauseBtn.innerHTML = "<span>⏸️</span> Pause";
        hasStartedPlaying = true;
    }).catch(error => {
        playPauseBtn.innerHTML = "<span>▶️</span> Lecture";
    });
}

const randomIndex = Math.floor(Math.random() * playlist.length);
playTrack(randomIndex);

document.body.addEventListener('click', () => {
    if (!hasStartedPlaying && music.paused) { toggleMusic(); }
}, { once: true });

function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            playPauseBtn.innerHTML = "<span>⏸️</span> Pause";
            hasStartedPlaying = true;
        });
    } else {
        music.pause();
        playPauseBtn.innerHTML = "<span>▶️</span> Lecture";
    }
}

function nextMusic() {
    if (playlist.length <= 1) return;
    let newIndex;
    do { newIndex = Math.floor(Math.random() * playlist.length); } while (newIndex === currentTrackIndex);
    playTrack(newIndex);
}

function changeVolume(val) {
    music.volume = val;
    if (parseFloat(val) === 0) { volumeIcon.innerText = "🔇"; }
    else if (parseFloat(val) < 0.4) { volumeIcon.innerText = "🔈"; }
    else { volumeIcon.innerText = "🔊"; }
}

music.onended = function() { nextMusic(); };


// --- LOGIQUE DES RACCOURCIS CLAVIER ---
window.addEventListener('keydown', (event) => {
    // Si l'utilisateur appuie sur ESPACE -> Musique suivante
    if (event.code === "Space") {
        event.preventDefault(); // Évite de faire défiler la page web par défaut
        nextMusic();
    }
    // Si l'utilisateur appuie sur la touche M -> Coupe / Remet le son
    if (event.code === "KeyM") {
        if (music.volume > 0) {
            window.lastVolume = music.volume; // Garde en mémoire le volume avant coupure
            volumeSlider.value = 0;
            changeVolume(0);
        } else {
            let restoreVol = window.lastVolume || 0.25;
            volumeSlider.value = restoreVol;
            changeVolume(restoreVol);
        }
    }
});


// --- ASSIGNATION AUTOMATIQUE DES INFOS GARRY'S MOD (Pseudo, Avatar, Map, Fichiers) ---
window.totalFiles = 0;
window.neededFiles = 0;

function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode ) {
    document.getElementById('map-name').innerText = "Map : " + mapname;
    
    // Récupération automatique de l'avatar officiel et du pseudo Steam via l'API Web de GMod
    if (steamid) {
        document.getElementById('player-avatar').src = "asset://garrysmod/avatars/" + steamid + ".png";
    }
    
    if (!hasStartedPlaying) { toggleMusic(); }
}

// GMod possède une fonction interne pour récupérer le pseudo du joueur
function SetPlayerName( name ) {
    if(name && name !== "") {
        document.getElementById('player-name').innerText = name;
    }
}

function SetStatusChanged( status ) {
    document.getElementById('status-text').innerText = status;
    if (!hasStartedPlaying) { toggleMusic(); }
}

function SetFilesTotal( total ) {
    window.totalFiles = Math.max(0, total);
    updateProgressBar();
}

function SetFilesNeeded( needed ) {
    window.neededFiles = Math.max(0, needed);
    updateProgressBar();
}

function DownloadingFile( fileName ) {
    document.getElementById('file-current').innerText = "Téléchargement : " + fileName;
}

function updateProgressBar() {
    let total = window.totalFiles;
    let needed = window.neededFiles;
    
    if (!total || total <= 0) {
        document.getElementById('progress-bar').style.width = "0%";
        document.getElementById('progress-percentage').innerText = "0%";
        document.getElementById('file-count').innerText = "Fichiers : 0 / 0";
        return;
    }

    let downloaded = Math.max(0, total - needed);
    let percentage = Math.floor((downloaded / total) * 100);
    if (percentage > 100) percentage = 100;

    document.getElementById('progress-bar').style.width = percentage + "%";
    document.getElementById('progress-percentage').innerText = percentage + "%";
    document.getElementById('file-count').innerText = "Fichiers : " + downloaded + " / " + total;
}