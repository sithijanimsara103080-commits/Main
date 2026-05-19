/**
 * Premium UI Enhancement System
 * Handles: Custom Cursor, Stardust Particles, Mouse Parallax, and Stats Counter
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initStardust();
    initMouseParallax();
    initRevealAnimations();
});

// 1. Preloader Management
function initPreloader() {
    const preloader = document.getElementById('cosmic-preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('blasting');
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        triggerReveal();
                    }, 1000);
                }, 800); // Supernova growth duration
            }, 1000);
        });
    }
}

// 2. Custom Cursor with Stardust Trail
function initCustomCursor() {
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.className = 'custom-cursor';
    outline.className = 'custom-cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        dot.style.transform = `translate3d(${dotX - 10}px, ${dotY - 10}px, 0)`;
        outline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover scales
    const links = document.querySelectorAll('a, button, .clickable');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => outline.style.transform += ' scale(1.5)');
        link.addEventListener('mouseleave', () => outline.style.transform = outline.style.transform.replace(' scale(1.5)', ''));
    });
}

// 3. Stardust Background Particles
function initStardust() {
    const canvas = document.createElement('canvas');
    canvas.id = 'stardust-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const count = 100;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();
}

// 4. Mouse Parallax for Hero
function initMouseParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 1;
            layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
        });
    });
}

// 5. Staggered Reveal Animations
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

function triggerReveal() {
    const heroElements = document.querySelectorAll('.hero-reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 200 + 400);
    });
}
