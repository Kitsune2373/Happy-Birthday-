document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization
    AOS.init({
        duration: 1000,
        once: true
    });

    particlesJS.load('particles-js', 'path/to/particles.json', function() {
        console.log('particles.js loaded');
    });

    // Existing canvas animation
    const canvas = document.getElementById('birthday-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ... (rest of the existing Heart class and related functions)

    createHearts();
    animateHearts();

    // Enhanced countdown timer with smooth animation
    const countDownDate = new Date("2024-10-11T00:00:00").getTime();
    const countdownEl = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <span>${days}d</span>
            <span>${hours}h</span>
            <span>${minutes}m</span>
            <span>${seconds}s</span>
        `;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownEl.innerHTML = "<span>Selamat Ulang Tahun!</span>";
            launchCelebration();
        }
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Enhanced celebration when countdown reaches zero
    function launchCelebration() {
        launchConfetti();
        playBirthdaySong();
        showBirthdayMessage();
    }

    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function playBirthdaySong() {
        const birthdaySong = document.getElementById('birthday-song');
        if (birthdaySong) {
            birthdaySong.play();
        }
    }

    function showBirthdayMessage() {
        const messageEl = document.createElement('div');
        messageEl.innerHTML = `
            <h2>Happy Birthday Humaira!</h2>
            <p>Wishing you a day filled with love, joy, and beautiful memories!</p>
        `;
        messageEl.style.position = 'fixed';
        messageEl.style.top = '50%';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translate(-50%, -50%)';
        messageEl.style.background = 'rgba(255, 255, 255, 0.9)';
        messageEl.style.padding = '20px';
        messageEl.style.borderRadius = '10px';
        messageEl.style.zIndex = '1000';
        document.body.appendChild(messageEl);
    }

    // Enhanced gallery with lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-item-info h5').textContent;
            
            const lightbox = document.createElement('div');
            lightbox.innerHTML = `
                <div class="lightbox-overlay">
                    <img src="${imgSrc}" alt="${caption}">
                    <p>${caption}</p>
                    <button class="close-lightbox">&times;</button>
                </div>
            `;
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.background = 'rgba(0, 0, 0, 0.8)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            document.body.appendChild(lightbox);

            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Enhanced smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Enhanced music player
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = 'Pause Music';
            } else {
                bgMusic.pause();
                musicToggle.textContent = 'Play Music';
            }
        });
    }

    // New feature: Dynamic background color
    function changeBackgroundColor() {
        const colors = ['#ffcccb', '#ffd700', '#98fb98', '#87cefa'];
        let currentIndex = 0;

        setInterval(() => {
            document.body.style.backgroundColor = colors[currentIndex];
            currentIndex = (currentIndex + 1) % colors.length;
        }, 10000); // Change every 10 seconds
    }

    changeBackgroundColor();

    // New feature: Animated text for main title
    function animateText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    element.innerHTML += text[i];
                }, i * 100);
            }
        }
    }

    animateText('main-title', 'Happy Birthday, Humaira!');

    // New feature: Interactive wishes
    const wishForm = document.getElementById('wish-form');
    const wishList = document.getElementById('wish-list');

    if (wishForm && wishList) {
        wishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const wishInput = document.getElementById('wish-input');
            if (wishInput.value.trim() !== '') {
                const wish = document.createElement('li');
                wish.textContent = wishInput.value;
                wishList.appendChild(wish);
                wishInput.value = '';
            }
        });
    }
});