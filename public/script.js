// Variables globales
let isPlaying = false;
let currentSong = null;
let particlesInstance = null;

// Configuración de partículas
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#ff69b4", "#ff1493", "#ff69b4", "#ff1493"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff69b4",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función de inicialización
function initializeApp() {
    // Inicializar partículas
    initParticles();
    
    // Inicializar cursor personalizado
    initCustomCursor();
    
    // Inicializar navegación
    initNavigation();
    
    // Inicializar efectos interactivos
    initInteractiveEffects();
    
    // Ocultar loading screen después de 3 segundos
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);
}

// Inicializar partículas
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesInstance = particlesJS('particles-js', particlesConfig);
    }
}

// Inicializar cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto hover en botones
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            cursor.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            cursor.classList.remove('cursor-hover');
        }
    });
}

// Inicializar navegación
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Inicializar efectos interactivos
function initInteractiveEffects() {
    // Efectos de clic
    document.addEventListener('click', createClickEffect);
    
    // Efectos de teclado
    document.addEventListener('keydown', handleKeyboardEvents);
    
    // Efectos de scroll
    window.addEventListener('scroll', handleScrollEffects);
}

// Función para ocultar loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Función para crear efectos de clic
function createClickEffect(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.className = 'click-heart';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Función para manejar eventos de teclado
function handleKeyboardEvents(e) {
    switch(e.key.toLowerCase()) {
        case 'h':
            createManyHearts();
            break;
        case 'm':
            playSong('ivonny-bonita');
            break;
        case 'c':
            createManyHearts();
            break;
        case '1':
            scrollToSection('home');
            break;
        case '2':
            scrollToSection('music');
            break;
        case '3':
            scrollToSection('gallery');
            break;
        case '4':
            scrollToSection('message');
            break;
    }
}

// Función para manejar efectos de scroll
function handleScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating-elements');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}

// Función para crear muchos corazones
function createManyHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Función para navegar a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Actualizar navegación
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });
        
        // Actualizar secciones
        const sections = document.querySelectorAll('.section');
        sections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');
    }
}

// Función para reproducir música
function playSong(songId) {
    const audio = document.getElementById(songId);
    
    if (!audio) {
        showAudioOptions(songId);
        return;
    }
    
    // Si ya está reproduciendo esta canción, pausarla
    if (currentSong === songId && isPlaying) {
        pauseSong(songId);
        return;
    }
    
    // Si la canción está pausada, reanudarla
    if (currentSong === songId && !isPlaying) {
        resumeSong(songId);
        return;
    }
    
    // Si hay otra canción reproduciéndose, pausarla primero
    if (currentSong && currentSong !== songId && isPlaying) {
        const currentAudio = document.getElementById(currentSong);
        if (currentAudio) {
            currentAudio.pause();
            updatePlayButton(currentSong, false);
        }
    }
    
    // Verificar si el audio está listo
    if (audio.readyState < 2) {
        showNotification('⏳ Cargando audio...');
        audio.addEventListener('canplay', () => {
            playAudio(audio, songId);
        });
        return;
    }
    
    playAudio(audio, songId);
}

// Función para pausar canción
function pauseSong(songId) {
    const audio = document.getElementById(songId);
    if (audio) {
        audio.pause();
        isPlaying = false;
        updatePlayButton(songId, false);
        showNotification('⏸️ Pausado: ' + getSongName(songId));
        
        // Detener la barra de progreso
        const card = document.querySelector(`[data-song="${songId}"]`);
        if (card) {
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.transition = 'none';
            }
        }
    }
}

// Función para reanudar canción
function resumeSong(songId) {
    const audio = document.getElementById(songId);
    if (audio) {
        audio.play().then(() => {
            isPlaying = true;
            currentSong = songId;
            updatePlayButton(songId, true);
            startProgressBar(songId);
            showNotification('▶️ Reanudando: ' + getSongName(songId));
        }).catch(error => {
            console.error('Error reanudando audio:', error);
            showNotification('❌ Error al reanudar la canción');
        });
    }
}

// Función para reproducir audio
function playAudio(audio, songId) {
    try {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Reproducción exitosa
                isPlaying = true;
                currentSong = songId;
                updatePlayButton(songId, true);
                startProgressBar(songId);
                createMusicEffects();
                
                // Efectos especiales para Ivonny Bonita
                if (songId === 'ivonny-bonita') {
                    createSpecialEffects();
                    showNotification('💕 Ivonny Bonita - Reproduciendo para ti');
                } else {
                    showNotification('🎵 Reproduciendo ' + getSongName(songId));
                }
                
                // Agregar listener para cuando termine la canción
                audio.addEventListener('ended', () => {
                    isPlaying = false;
                    currentSong = null;
                    updatePlayButton(songId, false);
                    showNotification('✅ Canción terminada: ' + getSongName(songId));
                }, { once: true });
                
            }).catch(error => {
                console.error('Error reproduciendo audio:', error);
                showAudioOptions(songId);
            });
        }
    } catch (error) {
        console.error('Error reproduciendo audio:', error);
        showAudioOptions(songId);
    }
}

// Función para mostrar opciones cuando no hay archivos de audio
function showAudioOptions(songId) {
    const songNames = {
        'ivonny-bonita': 'Ivonny Bonita',
        'la-reina-presenta': 'La Reina Presenta',
        'papasito': 'Papasito',
        'latina-foreva': 'LATINA FOREVA',
        'dile-luna': 'Dile Luna',
        'cuando-me-muera-te-olvido': 'Cuando Me Muera Te Olvido',
        'coleccionando-heridas': 'Coleccionando Heridas',
        'un-gatito-me-llamo': 'Un Gatito Me Llamó',
        'amiga-mia': 'Amiga Mía',
        'bandida-entrenada': 'Bandida Entrenada',
        'ese-hombre-es-malo': 'Ese Hombre Es Malo',
        'a-su-boca-la-amo': 'A Su Boca La Amo',
        'verano-rosa': 'Verano Rosa',
        'no-puedo-vivir-sin-el': 'No Puedo Vivir Sin Él',
        'tu-perfume': 'Tu Perfume',
        'fkn-movie': 'FKN Movie',
        'se-puso-linda': 'Se Puso Linda',
        'viajando-por-el-mundo': 'Viajando Por El Mundo',
        'si-antes-te-hubiera-conocido': 'Si Antes Te Hubiera Conocido',
        'tropicoqueta': 'Tropicoqueta'
    };
    
    const songName = songNames[songId] || songId;
    
    // Crear modal con opciones
    const modal = document.createElement('div');
    modal.className = 'audio-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎵 ${songName} - Karol G</h3>
            <p>¿Cómo quieres reproducir esta canción?</p>
            
            <div class="audio-options">
                <button onclick="playFromYouTubeEmbed('${songId}')" class="option-btn youtube-btn">
                    <i class="fab fa-youtube"></i>
                    Reproducir desde YouTube
                </button>
                
                <button onclick="playFromSpotifyEmbed('${songId}')" class="option-btn spotify-btn">
                    <i class="fab fa-spotify"></i>
                    Reproducir desde Spotify
                </button>
                
                <button onclick="playFromSoundCloud('${songId}')" class="option-btn soundcloud-btn">
                    <i class="fab fa-soundcloud"></i>
                    Reproducir desde SoundCloud
                </button>
                
                <button onclick="playWithEffects('${songId}')" class="option-btn effects-btn">
                    <i class="fas fa-magic"></i>
                    Solo Efectos Visuales
                </button>
                
                <button onclick="closeModal()" class="option-btn cancel-btn">
                    <i class="fas fa-times"></i>
                    Cancelar
                </button>
            </div>
            
            <div class="modal-footer">
                <p><strong>💡 Consejo:</strong> Las opciones de reproducción se abrirán en la misma página</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar estilos al modal
    const style = document.createElement('style');
    style.textContent = `
        .audio-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .modal-content h3 {
            color: var(--primary-pink);
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .audio-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        
        .option-btn {
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .youtube-btn {
            background: #ff0000;
            color: white;
        }
        
        .spotify-btn {
            background: #1db954;
            color: white;
        }
        
        .soundcloud-btn {
            background: #ff7700;
            color: white;
        }
        
        .effects-btn {
            background: var(--gradient-primary);
            color: white;
        }
        
        .cancel-btn {
            background: #666;
            color: white;
        }
        
        .option-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .modal-footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #eee;
            font-size: 0.9rem;
            color: #666;
        }
        
        .music-player-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        }
        
        .music-player-content {
            background: white;
            border-radius: 20px;
            padding: 20px;
            max-width: 90%;
            max-height: 90%;
            overflow: auto;
        }
        
        .music-player-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .music-player-header h3 {
            color: var(--primary-pink);
            margin: 0;
        }
        
        .close-player-btn {
            background: var(--primary-pink);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .close-player-btn:hover {
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .audio-options {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                margin: 20px;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función para reproducir desde YouTube embed
function playFromYouTubeEmbed(songId) {
    const songNames = {
        'ivonny-bonita': 'Karol G Ivonny Bonita',
        'la-reina-presenta': 'Karol G La Reina Presenta',
        'papasito': 'Karol G Papasito',
        'latina-foreva': 'Karol G LATINA FOREVA',
        'dile-luna': 'Karol G Dile Luna',
        'cuando-me-muera-te-olvido': 'Karol G Cuando Me Muera Te Olvido',
        'coleccionando-heridas': 'Karol G Coleccionando Heridas',
        'un-gatito-me-llamo': 'Karol G Un Gatito Me Llamó',
        'amiga-mia': 'Karol G Amiga Mía',
        'bandida-entrenada': 'Karol G Bandida Entrenada',
        'ese-hombre-es-malo': 'Karol G Ese Hombre Es Malo',
        'a-su-boca-la-amo': 'Karol G A Su Boca La Amo',
        'verano-rosa': 'Karol G Verano Rosa',
        'no-puedo-vivir-sin-el': 'Karol G No Puedo Vivir Sin Él',
        'tu-perfume': 'Karol G Tu Perfume',
        'fkn-movie': 'Karol G FKN Movie',
        'se-puso-linda': 'Karol G Se Puso Linda',
        'viajando-por-el-mundo': 'Karol G Viajando Por El Mundo',
        'si-antes-te-hubiera-conocido': 'Karol G Si Antes Te Hubiera Conocido',
        'tropicoqueta': 'Karol G Tropicoqueta'
    };
    
    const songName = songNames[songId] || `Karol G ${songId}`;
    
    // Crear overlay con reproductor de YouTube
    const overlay = document.createElement('div');
    overlay.className = 'music-player-overlay';
    overlay.innerHTML = `
        <div class="music-player-content">
            <div class="music-player-header">
                <h3>🎵 ${songName}</h3>
                <button onclick="closeMusicPlayer()" class="close-player-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px;">
                <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
                    src="https://www.youtube.com/embed/?listType=search&list=${encodeURIComponent(songName)}&autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p><strong>💡 Consejo:</strong> Reproduce la canción aquí y disfruta de los efectos visuales en la web principal</p>
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                    <button onclick="playWithEffects('${songId}')" class="option-btn effects-btn">
                        <i class="fas fa-magic"></i>
                        Activar Efectos Visuales
                    </button>
                    <button onclick="openInNewTab('${songName}')" class="option-btn youtube-btn">
                        <i class="fab fa-youtube"></i>
                        Abrir en Nueva Pestaña
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    closeModal();
    showNotification('🎵 Reproduciendo desde YouTube en la misma página');
}

// Función para abrir en nueva pestaña
function openInNewTab(songName) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
    window.open(url, '_blank');
    showNotification('🎵 Abriendo YouTube en nueva pestaña');
}

// Función para reproducir desde Spotify embed
function playFromSpotifyEmbed(songId) {
    const songNames = {
        'ivonny-bonita': 'Ivonny Bonita',
        'la-reina-presenta': 'La Reina Presenta',
        'papasito': 'Papasito',
        'latina-foreva': 'LATINA FOREVA',
        'dile-luna': 'Dile Luna',
        'cuando-me-muera-te-olvido': 'Cuando Me Muera Te Olvido',
        'coleccionando-heridas': 'Coleccionando Heridas',
        'un-gatito-me-llamo': 'Un Gatito Me Llamó',
        'amiga-mia': 'Amiga Mía',
        'bandida-entrenada': 'Bandida Entrenada',
        'ese-hombre-es-malo': 'Ese Hombre Es Malo',
        'a-su-boca-la-amo': 'A Su Boca La Amo',
        'verano-rosa': 'Verano Rosa',
        'no-puedo-vivir-sin-el': 'No Puedo Vivir Sin Él',
        'tu-perfume': 'Tu Perfume',
        'fkn-movie': 'FKN Movie',
        'se-puso-linda': 'Se Puso Linda',
        'viajando-por-el-mundo': 'Viajando Por El Mundo',
        'si-antes-te-hubiera-conocido': 'Si Antes Te Hubiera Conocido',
        'tropicoqueta': 'Tropicoqueta'
    };
    
    const songName = songNames[songId] || songId;
    
    // Crear overlay con reproductor de Spotify
    const overlay = document.createElement('div');
    overlay.className = 'music-player-overlay';
    overlay.innerHTML = `
        <div class="music-player-content">
            <div class="music-player-header">
                <h3>🎵 ${songName} - Karol G</h3>
                <button onclick="closeMusicPlayer()" class="close-player-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <iframe 
                style="border-radius:12px" 
                src="https://open.spotify.com/embed/search/${encodeURIComponent(`Karol G ${songName}`)}?theme=0" 
                width="100%" 
                height="352" 
                frameborder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
            <div style="margin-top: 20px; text-align: center;">
                <p><strong>💡 Consejo:</strong> Reproduce la canción aquí y disfruta de los efectos visuales en la web principal</p>
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                    <button onclick="playWithEffects('${songId}')" class="option-btn effects-btn">
                        <i class="fas fa-magic"></i>
                        Activar Efectos Visuales
                    </button>
                    <button onclick="openSpotifyInNewTab('${songName}')" class="option-btn spotify-btn">
                        <i class="fab fa-spotify"></i>
                        Abrir en Nueva Pestaña
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    closeModal();
    showNotification('🎵 Reproduciendo desde Spotify en la misma página');
}

// Función para abrir Spotify en nueva pestaña
function openSpotifyInNewTab(songName) {
    const url = `https://open.spotify.com/search/${encodeURIComponent(`Karol G ${songName}`)}`;
    window.open(url, '_blank');
    showNotification('🎵 Abriendo Spotify en nueva pestaña');
}

// Función para reproducir desde SoundCloud
function playFromSoundCloud(songId) {
    const songNames = {
        'ivonny-bonita': 'Karol G Ivonny Bonita',
        'la-reina-presenta': 'Karol G La Reina Presenta',
        'papasito': 'Karol G Papasito',
        'latina-foreva': 'Karol G LATINA FOREVA',
        'dile-luna': 'Karol G Dile Luna',
        'cuando-me-muera-te-olvido': 'Karol G Cuando Me Muera Te Olvido',
        'coleccionando-heridas': 'Karol G Coleccionando Heridas',
        'un-gatito-me-llamo': 'Karol G Un Gatito Me Llamó',
        'amiga-mia': 'Karol G Amiga Mía',
        'bandida-entrenada': 'Karol G Bandida Entrenada',
        'ese-hombre-es-malo': 'Karol G Ese Hombre Es Malo',
        'a-su-boca-la-amo': 'Karol G A Su Boca La Amo',
        'verano-rosa': 'Karol G Verano Rosa',
        'no-puedo-vivir-sin-el': 'Karol G No Puedo Vivir Sin Él',
        'tu-perfume': 'Karol G Tu Perfume',
        'fkn-movie': 'Karol G FKN Movie',
        'se-puso-linda': 'Karol G Se Puso Linda',
        'viajando-por-el-mundo': 'Karol G Viajando Por El Mundo',
        'si-antes-te-hubiera-conocido': 'Karol G Si Antes Te Hubiera Conocido',
        'tropicoqueta': 'Karol G Tropicoqueta'
    };
    
    const songName = songNames[songId] || `Karol G ${songId}`;
    
    // Crear overlay con reproductor de SoundCloud
    const overlay = document.createElement('div');
    overlay.className = 'music-player-overlay';
    overlay.innerHTML = `
        <div class="music-player-content">
            <div class="music-player-header">
                <h3>🎵 ${songName}</h3>
                <button onclick="closeMusicPlayer()" class="close-player-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <iframe 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameborder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/search/sounds?q=${encodeURIComponent(songName)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
            </iframe>
            <div style="margin-top: 20px; text-align: center;">
                <p><strong>💡 Consejo:</strong> Reproduce la canción aquí y disfruta de los efectos visuales en la web principal</p>
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                    <button onclick="playWithEffects('${songId}')" class="option-btn effects-btn">
                        <i class="fas fa-magic"></i>
                        Activar Efectos Visuales
                    </button>
                    <button onclick="openSoundCloudInNewTab('${songName}')" class="option-btn soundcloud-btn">
                        <i class="fab fa-soundcloud"></i>
                        Abrir en Nueva Pestaña
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    closeModal();
    showNotification('🎵 Reproduciendo desde SoundCloud en la misma página');
}

// Función para abrir SoundCloud en nueva pestaña
function openSoundCloudInNewTab(songName) {
    const url = `https://soundcloud.com/search?q=${encodeURIComponent(songName)}`;
    window.open(url, '_blank');
    showNotification('🎵 Abriendo SoundCloud en nueva pestaña');
}

// Función para reproducir solo efectos visuales
function playWithEffects(songId) {
    closeModal();
    
    // Simular reproducción para efectos visuales
    isPlaying = true;
    currentSong = songId;
    
    // Crear efectos especiales
    createMusicEffects();
    
    // Efectos especiales para "Ivonny Bonita"
    if (songId === 'ivonny-bonita') {
        createSpecialEffects();
        showNotification('💕 Ivonny Bonita - Reproduciendo efectos especiales');
    } else {
        showNotification('🎵 Reproduciendo efectos visuales para ' + getSongName(songId));
    }
    
    // Simular duración de canción (3 minutos)
    setTimeout(() => {
        isPlaying = false;
        currentSong = null;
        showNotification('⏹️ Efectos terminados. Reproduce la canción en otra pestaña para sincronizar');
    }, 180000); // 3 minutos
}

// Función para cerrar modal
function closeModal() {
    const modal = document.querySelector('.audio-modal');
    if (modal) {
        modal.remove();
    }
}

// Función para cerrar el reproductor de música
function closeMusicPlayer() {
    const overlay = document.querySelector('.music-player-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Función para obtener nombre de canción
function getSongName(songId) {
    const songNames = {
        'ivonny-bonita': 'Ivonny Bonita',
        'la-reina-presenta': 'La Reina Presenta',
        'papasito': 'Papasito',
        'latina-foreva': 'LATINA FOREVA',
        'dile-luna': 'Dile Luna',
        'cuando-me-muera-te-olvido': 'Cuando Me Muera Te Olvido',
        'coleccionando-heridas': 'Coleccionando Heridas',
        'un-gatito-me-llamo': 'Un Gatito Me Llamó',
        'amiga-mia': 'Amiga Mía',
        'bandida-entrenada': 'Bandida Entrenada',
        'ese-hombre-es-malo': 'Ese Hombre Es Malo',
        'a-su-boca-la-amo': 'A Su Boca La Amo',
        'verano-rosa': 'Verano Rosa',
        'no-puedo-vivir-sin-el': 'No Puedo Vivir Sin Él',
        'tu-perfume': 'Tu Perfume',
        'fkn-movie': 'FKN Movie',
        'se-puso-linda': 'Se Puso Linda',
        'viajando-por-el-mundo': 'Viajando Por El Mundo',
        'si-antes-te-hubiera-conocido': 'Si Antes Te Hubiera Conocido',
        'tropicoqueta': 'Tropicoqueta'
    };
    
    return songNames[songId] || songId;
}

// Función para actualizar botón de reproducción
function updatePlayButton(songId, isPlaying) {
    const card = document.querySelector(`[data-song="${songId}"]`);
    if (card) {
        const playBtn = card.querySelector('.play-btn');
        const icon = playBtn.querySelector('i');
        
        if (isPlaying) {
            icon.className = 'fas fa-pause';
            playBtn.classList.add('playing');
        } else {
            icon.className = 'fas fa-play';
            playBtn.classList.remove('playing');
        }
    }
}

// Función para iniciar barra de progreso
function startProgressBar(songId) {
    const card = document.querySelector(`[data-song="${songId}"]`);
    if (card) {
        const progressFill = card.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
            progressFill.style.transition = 'width 0.1s linear';
            
            let progress = 0;
            const interval = setInterval(() => {
                // Verificar si la canción sigue reproduciéndose
                if (!isPlaying || currentSong !== songId) {
                    clearInterval(interval);
                    return;
                }
                
                progress += 0.1;
                progressFill.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    isPlaying = false;
                    currentSong = null;
                    updatePlayButton(songId, false);
                }
            }, 100);
        }
    }
}

// Función para crear efectos de música
function createMusicEffects() {
    // Crear partículas musicales
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.innerHTML = '🎵';
            note.className = 'music-note';
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = Math.random() * window.innerHeight + 'px';
            note.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 5000);
        }, i * 200);
    }
}

// Función para crear efectos especiales
function createSpecialEffects() {
    // Efectos dorados para Ivonny Bonita
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.className = 'special-heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.color = '#FFD700';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, i * 100);
    }
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar estilos CSS dinámicos
const dynamicStyles = `
    .click-heart {
        position: fixed;
        pointer-events: none;
        font-size: 24px;
        animation: floatUp 1s ease-out forwards;
        z-index: 1000;
    }
    
    .floating-heart {
        position: fixed;
        pointer-events: none;
        font-size: 20px;
        animation: float 5s ease-in-out infinite;
        z-index: 999;
    }
    
    .music-note {
        position: fixed;
        pointer-events: none;
        font-size: 24px;
        animation: float 5s ease-in-out infinite;
        z-index: 998;
    }
    
    .special-heart {
        position: fixed;
        pointer-events: none;
        animation: specialFloat 7s ease-in-out infinite;
        z-index: 997;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
        font-weight: 600;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
    
    @keyframes specialFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
        }
        25% {
            transform: translateY(-30px) rotate(90deg) scale(1.2);
        }
        50% {
            transform: translateY(-60px) rotate(180deg) scale(1);
        }
        75% {
            transform: translateY(-30px) rotate(270deg) scale(1.2);
        }
    }
    
    .play-btn.playing {
        background: var(--gradient-primary);
        transform: scale(1.1);
    }
    
    .progress-fill {
        background: var(--gradient-primary);
        height: 100%;
        border-radius: 5px;
        transition: width 0.1s linear;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet); 