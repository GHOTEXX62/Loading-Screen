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
const musicTitle = document.getElementById('music-title');
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


// --- LOGIQUE DE LA MUSIQUE ALEATOIRE ---
let currentTrackIndex = -1;
let hasStartedPlaying = false; 

function playRandomTrack() {
    if (playlist.length === 0) return;
    
    let newIndex;
    // Si la playlist contient plusieurs morceaux, on évite de rejouer le même à la suite
    if (playlist.length > 1) {
        do {
            newIndex = Math.floor(Math.random() * playlist.length);
        } while (newIndex === currentTrackIndex);
    } else {
        newIndex = 0;
    }
    
    currentTrackIndex = newIndex;
    const track = playlist[currentTrackIndex];
    music.src = track.file;
    musicTitle.innerText = track.title; 
    music.volume = 0.25; // Volume fixé à 25% (idéal pour un fond sonore)
    
    music.play().then(() => {
        hasStartedPlaying = true;
    }).catch(error => {
        console.log("Lecture automatique bloquée. En attente d'une interaction joueur ou GMod.");
    });
}

// Lancement immédiat d'un morceau au hasard au chargement initial
playRandomTrack();

// Sécurité pour forcer la lecture au premier clic ou interaction sur l'écran
document.body.addEventListener('click', () => {
    if (music.paused) { 
        music.play();
        hasStartedPlaying = true;
    }
}, { once: true });

function toggleMusic() {
    if (music.paused) { music.play(); hasStartedPlaying = true; }
}

// Gestion de la boucle infinie : relance un nouveau morceau aléatoire dès que la piste se termine
music.onended = function() { 
    playRandomTrack(); 
};


// --- ASSIGNATION AUTOMATIQUE DES INFOS GARRY'S MOD (Pseudo, Avatar, Map, Fichiers) ---
window.totalFiles = 0;
window.neededFiles = 0;

function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode ) {
    document.getElementById('map-name').innerText = "Map : " + mapname;
    
    // Récupération de l'avatar Steam officiel fourni par l'API GMod
    if (steamid && steamid !== "" && steamid !== "0") {
        document.getElementById('player-avatar').src = "asset://garrysmod/avatars/" + steamid + ".png";
    }
    
    if (!hasStartedPlaying) { toggleMusic(); }
}

// Fonction native appelée par GMod pour transmettre le nom du joueur connecté
function SetPlayerName( name ) {
    if (name && name !== "" && name !== "%" + "s") {
        document.getElementById('player-name').innerText = name;
    }
}

// Sécurité URL alternative pour la détection pseudo & avatar (Utile selon le type de connexion)
const urlParams = new URLSearchParams(window.location.search);
const nameParam = urlParams.get('username') || urlParams.get('name');
if (nameParam) {
    document.getElementById('player-name').innerText = decodeURIComponent(nameParam);
}
const steamParam = urlParams.get('steamid');
if (steamParam && steamParam !== "%s") {
    document.getElementById('player-avatar').src = "asset://garrysmod/avatars/" + steamParam + ".png";
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
