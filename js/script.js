/**
 * ==========================================================================
 * EXPÉRIENCE DIGITALE : JOYEUX ANNIVERSAIRE, PAPA
 * Interaction, Ambiance Sonore Générative, Particules & Transitions
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. SÉLECTEURS DU DOM
  // ------------------------------------------------------------------------
  const introScreen = document.getElementById('intro-screen');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const mainExperience = document.getElementById('main-experience');
  const experienceNav = document.getElementById('experience-nav');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const printLetterBtn = document.getElementById('print-letter-btn');
  const printFinalBtn = document.getElementById('print-final-btn');
  const restartViewBtn = document.getElementById('restart-view-btn');
  const interactiveHeart = document.getElementById('interactive-heart');
  const currentDateBadge = document.getElementById('current-date-badge');
  const letterDateDisplay = document.getElementById('letter-date-display');
  const canvas = document.getElementById('ambient-canvas');

  // Icônes du son et du thème
  const iconSoundOff = document.querySelector('.icon-sound-off');
  const iconSoundOn = document.querySelector('.icon-sound-on');
  const iconSun = document.querySelector('.icon-sun');
  const iconMoon = document.querySelector('.icon-moon');

  // ------------------------------------------------------------------------
  // 2. FORMATTAGE AUTOMATIQUE DE LA DATE EN FRANÇAIS
  // ------------------------------------------------------------------------
  try {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('fr-FR', options);
    if (letterDateDisplay) {
      letterDateDisplay.textContent = formattedDate;
    }
  } catch (e) {
    console.warn('Date formatting exception:', e);
  }

  // ------------------------------------------------------------------------
  // 3. TRANSITION DE L'ÉCRAN D'OUVERTURE
  // ------------------------------------------------------------------------
  function openExperience() {
    // 1. Déclenche une petite vibration haptique sur mobile si supportée
    if (navigator.vibrate) {
      try { navigator.vibrate(40); } catch (e) {}
    }

    // 2. Fade out de l'écran d'ouverture
    introScreen.classList.add('dismissed');

    // 3. Activation du contenu principal et de la barre d'outils
    setTimeout(() => {
      mainExperience.classList.add('active');
      mainExperience.removeAttribute('aria-hidden');
      experienceNav.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Initier l'ambiance sonore si autorisée
      initAudio();
      playGentleTone(523.25, 1.2); // Douce note de bienvenue (Do5)
    }, 400);
  }

  openSurpriseBtn.addEventListener('click', openExperience);

  // ------------------------------------------------------------------------
  // 4. ANIMATION AU DÉFILEMENT (INTERSECTION OBSERVER)
  // ------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => revealObserver.observe(item));

  // ------------------------------------------------------------------------
  // 5. AMBIANCE SONORE ÉMOTIONNELLE GÉNÉRATIVE (Web Audio API)
  //    Zéro fichier audio externe requis : fonctionnement 100% hors-ligne
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isAudioPlaying = false;
  let ambientInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Joue une note douce et feutrée (harmonieuse, type piano ambient / cloche lointaine)
  function playGentleTone(freq, duration = 2.5) {
    if (!audioCtx || !isAudioPlaying) return;
    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Filtre passe-bas chaud pour un son très soyeux et non agressif
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, audioCtx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Web Audio note error:', e);
    }
  }

  // Suite d'accords doux et apaisants (Gamme pentatonique chaleureuse)
  const warmScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  let noteIndex = 0;

  function startAmbientAtmosphere() {
    isAudioPlaying = true;
    updateAudioIcons();
    
    // Joue une première note immédiatement
    playGentleTone(warmScale[2], 3.0);

    // Boucle d'ambiance avec légères variations calmes
    ambientInterval = setInterval(() => {
      if (!isAudioPlaying) return;
      const note = warmScale[noteIndex % warmScale.length];
      playGentleTone(note, 3.2);
      noteIndex = (noteIndex + Math.floor(Math.random() * 2) + 1) % warmScale.length;
    }, 2800);
  }

  function stopAmbientAtmosphere() {
    isAudioPlaying = false;
    updateAudioIcons();
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  }

  function updateAudioIcons() {
    if (isAudioPlaying) {
      iconSoundOff.classList.add('hidden');
      iconSoundOn.classList.remove('hidden');
      audioToggleBtn.setAttribute('aria-label', "Couper l'ambiance sonore");
    } else {
      iconSoundOff.classList.remove('hidden');
      iconSoundOn.classList.add('hidden');
      audioToggleBtn.setAttribute('aria-label', "Activer l'ambiance sonore douce");
    }
  }

  audioToggleBtn.addEventListener('click', () => {
    initAudio();
    if (isAudioPlaying) {
      stopAmbientAtmosphere();
    } else {
      startAmbientAtmosphere();
    }
  });

  // ------------------------------------------------------------------------
  // 6. GESTION DU THÈME VISUEL (Nocturne / Vélin d'art)
  // ------------------------------------------------------------------------
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    } else {
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    }
    localStorage.setItem('papa_theme', theme);
  }

  // Restaurer préférence utilisateur
  const savedTheme = localStorage.getItem('papa_theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // ------------------------------------------------------------------------
  // 7. BOUTON D'IMPRESSION & SOUVENIR (PDF / Tirage papier)
  // ------------------------------------------------------------------------
  function triggerPrint() {
    // Si l'écran d'intro est encore là, on ouvre directement le contenu
    if (!introScreen.classList.contains('dismissed')) {
      openExperience();
    }
    setTimeout(() => {
      window.print();
    }, 250);
  }

  printLetterBtn.addEventListener('click', triggerPrint);
  printFinalBtn.addEventListener('click', triggerPrint);

  // ------------------------------------------------------------------------
  // 8. RECOMMENCER L'EXPÉRIENCE
  // ------------------------------------------------------------------------
  restartViewBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      mainExperience.classList.remove('active');
      mainExperience.setAttribute('aria-hidden', 'true');
      experienceNav.classList.remove('active');
      introScreen.classList.remove('dismissed');
      
      // Réinitialiser les animations de reveal
      revealItems.forEach(item => item.classList.remove('revealed'));
    }, 400);
  });

  // ------------------------------------------------------------------------
  // 9. CŒUR INTERACTIF (Effet de chaleur & étincelles dorées)
  // ------------------------------------------------------------------------
  function spawnFloatingHeart(e) {
    const rect = interactiveHeart.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    
    // Alterne entre cœurs et petites étincelles
    const symbols = ['❤️', '✨', '💛', '🕊️'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--rand-x', `${(Math.random() - 0.5) * 80}px`);

    document.body.appendChild(heart);

    // Jouer une note carillon douce
    if (audioCtx && isAudioPlaying) {
      playGentleTone(783.99, 1.5); // Sol5
    }

    // Nettoyage du DOM
    setTimeout(() => {
      heart.remove();
    }, 1800);
  }

  interactiveHeart.addEventListener('click', spawnFloatingHeart);
  interactiveHeart.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      spawnFloatingHeart(e);
    }
  });

  // ------------------------------------------------------------------------
  // 10. CANVAS AMBIANT : PARTICULES D'ÉTOILES ET POUSSIÈRE DORÉE
  // ------------------------------------------------------------------------
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = 45; // Optimisé pour zéro latence même sur mobile

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio || width;
      canvas.height = height * window.devicePixelRatio || height;
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    class StarParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedY = Math.random() * 0.35 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.008;
        this.twinkleFactor = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.twinkleFactor += this.twinkleSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.twinkleFactor) * 0.25;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight 
          ? `rgba(161, 124, 42, ${Math.max(0, this.alpha * 0.6)})` 
          : `rgba(243, 229, 171, ${Math.max(0, this.alpha)})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new StarParticle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    resizeCanvas();
    initParticles();
    animate();
  }
});
