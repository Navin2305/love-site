// Shared Enchantments – Optimized for Smoothness & Performance
function createHearts(count = 100) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💝', '🌹'][Math.floor(Math.random() * 4)];
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heart.style.zIndex = '9999'; // ensure visibility
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 20); // much faster appearance
    }
}

function createConfetti(count = 800) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['💖', '💕', '💝', '🌹', '🌊', '⭐'][Math.floor(Math.random() * 6)];

            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 90vh;
                pointer-events: none;
                font-size: ${18 + Math.random() * 12}px;
                z-index: 9999;
                animation: heartFloat ${3 + Math.random() * 2}s linear forwards;
            `;

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}


function closeSecret(id) {
    document.getElementById(id).style.display = 'none';
    createHearts(5);
}

function updateCountdown() {
    const now = new Date();
    const valentine = new Date('2026-02-14T00:00:00');
    const diff = valentine - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (document.getElementById('countdown')) {
        document.getElementById('countdown').innerHTML = `${days} heartbeats until our Valentine's dance! 💃❤️`;
    }
}

// Progress Pulse – With LocalStorage Sync
function updateProgress() {
    const wins = parseInt(localStorage.getItem('loveWins') || 0);
    const progress = (wins / 5) * 100;
    if (document.getElementById('progressFill')) {
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = `${wins}/5`;
    }
}

// Cursor Trail Magic – Debounced for Performance
function createCursorTrail() {
    const trail = document.getElementById('heartTrail');
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const petal = document.createElement('div');
        petal.innerHTML = '🌹';
        petal.className = 'trail-heart';
        petal.style.left = mouseX + 'px';
        petal.style.top = mouseY + 'px';
        petal.style.fontSize = '10px';
        trail.appendChild(petal);
        setTimeout(() => petal.remove(), 1000);
    });
}

// Stagger Gallery Reveals – Observer-Enhanced
function staggerGallery(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach((item, i) => {
        item.style.animationDelay = `${i * 0.2}s`;
        item.classList.add('animate-in');
    });
}

// Scratch Game Surprise – Fixed, Fluid, & Touch-Ready
function openSurprise() {
    let modal = document.getElementById('surpriseModal');
    if (!modal) {
        const modalHtml = `
            <div id="surpriseModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeSurprise()">&times;</span>
                    <h2 style="color: #e91e63; margin-bottom: 20px;">Scratch to Reveal My Surprise Heart 💝</h2>
                    <p style="font-style: italic; color: #666; margin-bottom: 20px;">Swipe to uncover a hidden moment – just like how you uncover my heart every day. 😘</p>
                    <canvas id="scratchCanvas" width="400" height="300"></canvas>
                    <p class="scratch-message" id="scratchMessage" style="display: none;">
                        I love you sooo much, myy dear Cutieeee pieeee – deeper than secrets, sweeter than scratches. Look what you uncovered!<br>
                        <img src="pic/pic-7.jpeg" alt="Our hidden kiss – scratch-discovered forever." style="width: 100%; border-radius: 15px; margin-top: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
                    </p>
                    <button onclick="closeSurprise()" style="margin-top: 20px;">Close Magic</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('surpriseModal');
    }
    modal.style.display = 'block';
    initScratchGame();
    createConfetti(80);
}

function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    if (modal) modal.style.display = 'none';
}

let scratchCtx = null;
function initScratchGame() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    scratchCtx = canvas.getContext('2d');
    const message = document.getElementById('scratchMessage');
    let isDrawing = false;

    // Silver scratch layer with gradient for depth
    const gradient = scratchCtx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e0e0e0');
    gradient.addColorStop(1, '#d581c4');
    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, canvas.width, canvas.height);

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        return { 
            x: (e.clientX || e.touches[0].clientX) - rect.left, 
            y: (e.clientY || e.touches[0].clientY) - rect.top 
        };
    }

    function draw(e) {
        if (!isDrawing || !scratchCtx) return;
        const pos = getPosition(e);
        scratchCtx.globalCompositeOperation = 'destination-out';
        scratchCtx.lineWidth = 25; // Slightly thicker for easier scratching
        scratchCtx.lineCap = 'round';
        scratchCtx.lineJoin = 'round';
        scratchCtx.strokeStyle = 'rgba(0,0,0,1)';
        scratchCtx.lineTo(pos.x, pos.y);
        scratchCtx.stroke();
        scratchCtx.beginPath();
        scratchCtx.moveTo(pos.x, pos.y);

        // Improved scratch detection: sample more efficiently
        const imageData = scratchCtx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentCount = 0;
        const totalPixels = canvas.width * canvas.height;
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] < 128) transparentCount++;
            if (transparentCount > totalPixels * 0.25) { // Lowered to 25% for quicker reveal
                message.style.display = 'block';
                createHearts(15);
                canvas.style.cursor = 'default'; // Stop scratching once revealed
                break;
            }
        }
    }

    // Mouse events with preventDefault for smoothness
    canvas.addEventListener('mousedown', (e) => { 
        isDrawing = true; 
        draw(e); 
        e.preventDefault(); 
    });
    canvas.addEventListener('mousemove', (e) => { 
        if (isDrawing) draw(e); 
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Touch events, fully prevented for mobile
    canvas.addEventListener('touchstart', (e) => { 
        isDrawing = true; 
        draw(e.touches[0]); 
        e.preventDefault(); 
    });
    canvas.addEventListener('touchmove', (e) => { 
        draw(e.touches[0]); 
        e.preventDefault(); 
    });
    canvas.addEventListener('touchend', () => isDrawing = false);
}

// Eternal Unlock & Slideshow – With Win Validation
function unlockEternal() {
    const wins = parseInt(localStorage.getItem('loveWins') || 0);
    if (wins >= 5) {
        window.location.href = 'eternal.html';
        createConfetti(1000);
        wins=0; // Reset wins for replayability
    } else {
        alert(`So close, my muse! ${5 - wins} more secrets & snaps to claim. I love you sooo much – each puzzle is a testament to us. 😘`);
        createHearts(8);
    }
}

// Eternal Slideshow Init – Crossfade Perfection
if (window.location.pathname.includes('eternal.html')) {
    const slides = document.querySelectorAll('.slideshow img');
    let currentSlide = 0;
    function showSlide(n) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === n));
        currentSlide = n;
    }
    setInterval(() => showSlide((currentSlide + 1) % slides.length), 4000);
    showSlide(0);
    staggerGallery('.slideshow img');
}

// Grand Finale – Eternal Sparkle
function grandFinale() {
    createConfetti(200);
    createHearts(50);
    setTimeout(() => {
        alert('Surprise, love! Real-life quest: Meet me on Valentine\'s day at Afternoon. I\'ve planned stars, secrets and a vow just for us – plus prints of these photos. I love you – endlessly, Navin-style. 🌅❤️ P.S. This site? Yours forever – bookmark the magic.');
    }, 1000);
}

// Intersection Observer for Scroll Magic – Efficient Reveals
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // One-time trigger for perf
        }
    });
}, observerOptions);
document.querySelectorAll('.animate-in, .photo-card, .note, .memory-card').forEach(el => observer.observe(el));

// Page-load Poetry – Async & Robust
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createHearts(50);
        updateCountdown();
        updateProgress();
        setInterval(updateCountdown, 3600); // Daily refresh
        createCursorTrail();
    });
} else {
    createHearts(50);
    updateCountdown();
    updateProgress();
    setInterval(updateCountdown, 3600);
    createCursorTrail();
}