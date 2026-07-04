/* Réinitialisation complète pour le plein écran */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
}

body {
    background: #050505;
    background-image: url('background.png'); 
    background-size: cover;        
    background-position: center;   
    background-repeat: no-repeat;  
    height: 100vh;
    overflow: hidden; 
}

/* Fond assombri pour le contraste */
.background-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(5,5,10,0.9) 100%);
    z-index: 1;
}

/* --- EFFET PARTICULES (FLOTTANTES ET DISCRÈTES) --- */
.particles-container {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    overflow: hidden;
    z-index: 2;
    pointer-events: none; /* Laisse passer les clics de souris */
}

.particle {
    position: absolute;
    bottom: -20px;
    width: 6px;
    height: 6px;
    background: rgba(255, 69, 0, 0.4);
    box-shadow: 0 0 10px #ff4500, 0 0 20px #ff8c00;
    border-radius: 50%;
    animation: floatUp 8s infinite linear;
}

/* Positionnement aléatoire initial et vitesse des particules */
.particle:nth-child(1) { left: 10%; animation-duration: 6s; animation-delay: 0s; }
.particle:nth-child(2) { left: 25%; animation-duration: 9s; animation-delay: 2s; }
.particle:nth-child(3) { left: 40%; animation-duration: 7s; animation-delay: 4s; }
.particle:nth-child(4) { left: 55%; animation-duration: 11s; animation-delay: 1s; }
.particle:nth-child(5) { left: 70%; animation-duration: 8s; animation-delay: 5s; }
.particle:nth-child(6) { left: 85%; animation-duration: 10s; animation-delay: 3s; }
.particle:nth-child(7) { left: 15%; animation-duration: 7.5s; animation-delay: 1.5s; }
.particle:nth-child(8) { left: 48%; animation-duration: 9.5s; animation-delay: 0.5s; }
.particle:nth-child(9) { left: 78%; animation-duration: 6.5s; animation-delay: 2.5s; }

@keyframes floatUp {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translateY(-105vh) scale(0.5); opacity: 0; }
}

/* Grille principale plein écran */
.fullscreen-dashboard {
    position: relative;
    z-index: 3; /* Passe au-dessus des particules */
    height: 100vh;
    width: 100vw;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* --- HAUT DE L'ÉCRAN (Profil Steam inclus) --- */
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}

.player-profile-box {
    display: flex;
    align-items: center;
    gap: 15px;
}

#player-avatar {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    border: 2px solid #ff4500;
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.4);
    background: #111;
}

.server-name {
    font-size: 2.6rem;
    letter-spacing: 2px;
    font-weight: 900;
    text-shadow: 0 0 15px rgba(255, 69, 0, 0.4);
    line-height: 1.1;
}

.highlight { color: #ff4500; }
.player-welcome { color: #bbb; font-size: 1.05rem; margin-top: 3px; }

/* Widget Musique Épuré (Titre Seul) */
.music-dashboard-widget {
    background: rgba(10, 10, 15, 0.85);
    border: 1px solid rgba(255, 69, 0, 0.3);
    padding: 12px 20px;
    border-radius: 8px;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 280px;
}

.music-info { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.music-label { color: #aaa; margin-right: 5px; }
#music-title { color: #ff4500; font-weight: bold; }

/* --- MILIEU DE L'ÉCRAN --- */
.content-area {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    margin: 20px 0;
}

.ticker-box {
    width: 80%;
    max-width: 900px;
    background: rgba(10, 10, 15, 0.75);
    border-left: 5px solid #ff4500;
    padding: 40px;
    border-radius: 8px;
    backdrop-filter: blur(6px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    text-align: center;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ticker-title { color: #ff4500; font-size: 1.6rem; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; font-weight: bold; }
.ticker-text { font-size: 1.2rem; color: #ddd; line-height: 1.6; }

.fade-in-out { animation: fadeEffect 5s infinite ease-in-out; }
@keyframes fadeEffect {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
}

/* --- BAS DE L'ÉCRAN --- */
.bottom-bar { 
    width: 100%; 
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.status-container, .files-container { 
    display: flex; 
    justify-content: space-between; 
    font-size: 0.95rem; 
}

.status-container { color: #fff; font-weight: 600; }
.files-container { color: #aaa; font-size: 0.85rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 4px; }
#map-name, #file-count { color: #ff4500; font-weight: bold; }
#file-current { max-width: 70%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.progress-bar-wrapper { display: flex; align-items: center; gap: 15px; width: 100%; margin-top: 4px; }
.progress-bar-container { flex: 1; height: 18px; background: rgba(20, 20, 25, 0.9); border-radius: 9px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); }
#progress-bar { width: 0%; height: 100%; background: linear-gradient(90deg, #ff4500 0%, #ff7f50 100%); border-radius: 9px; box-shadow: 0 0 15px rgba(255, 69, 0, 0.6); transition: width 0.2s ease-out; }
#progress-percentage { font-size: 1.1rem; font-weight: bold; color: #ff4500; min-width: 50px; text-align: right; } 
