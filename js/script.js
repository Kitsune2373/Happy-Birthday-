document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Inisialisasi particles.js
    particlesJS.load('particles-js', 'path/to/particles.json', function() {
        console.log('particles.js loaded');
    });

    // Animasi latar belakang dengan canvas
    const canvas = document.getElementById('birthday-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const colors = ['#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff6b6b', '#ff9ff3'];

    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 100;
            this.size = Math.random() * 30 + 10;
            this.speed = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = 0;
            this.angleSpeed = Math.random() * 0.05 - 0.025;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.y -= this.speed;
            this.angle += this.angleSpeed;
            if (this.y < -100) {
                this.y = canvas.height + 100;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function createHearts() {
        for (let i = 0; i < 50; i++) {
            hearts.push(new Heart());
        }
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animateHearts);
    }

    createHearts();
    animateHearts();

    // Countdown timer with smooth animation
    const countDownDate = new Date("2024-09-18T00:00:00").getTime();
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
            launchConfetti();
        }
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Konfeti saat ulang tahun tiba
    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Galeri foto dengan lightbox
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
            document.body.appendChild(lightbox);

            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Animasi scroll smooth untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pesan Ucapan dengan animasi
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        if (name && message) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${name}:</strong> ${message}`;
            li.style.opacity = '0';
            messageList.appendChild(li);

            // Animate the new message
            setTimeout(() => {
                li.style.transition = 'opacity 0.5s ease';
                li.style.opacity = '1';
            }, 10);

            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
        }
    });

    // Musik Latar dengan visualizer
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(bgMusic);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = 'Pause Music';
            audioContext.resume();
        } else {
            bgMusic.pause();
            musicToggle.textContent = 'Play Music';
        }
    });

    function visualize() {
        const canvas = document.getElementById('music-visualizer');
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;

                ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x