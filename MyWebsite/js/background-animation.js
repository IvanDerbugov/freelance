(function() {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'background-animation';
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100%';
    bgCanvas.style.height = '100%';
    bgCanvas.style.zIndex = '-1';
    bgCanvas.style.pointerEvents = 'none';
    bgCanvas.style.opacity = '0.3';
    document.body.insertBefore(bgCanvas, document.body.firstChild);

    const ctx = bgCanvas.getContext('2d');

    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const codeSymbols = ['</>', '{}', '=>', '()', '[]', '&&', '||', 'px', '<>', '::'];
    const colorPalette = [
        'rgba(7, 158, 123, 0.6)',
        'rgba(255, 255, 255, 0.4)',
        'rgba(130, 210, 255, 0.5)',
        'rgba(0, 230, 230, 0.5)',
        'rgba(190, 140, 255, 0.5)'
    ];

    class BackgroundParticle {
        constructor() {
            this.reset();
            this.y = Math.random() * bgCanvas.height;
        }

        reset() {
            const side = Math.floor(Math.random() * 4);
            switch(side) {
                case 0:
                    this.x = Math.random() * bgCanvas.width;
                    this.y = -50;
                    this.vx = (Math.random() - 0.5) * 1.5;
                    this.vy = 0.3 + Math.random() * 0.8;
                    break;
                case 1:
                    this.x = bgCanvas.width + 50;
                    this.y = Math.random() * bgCanvas.height;
                    this.vx = -(0.3 + Math.random() * 0.8);
                    this.vy = (Math.random() - 0.5) * 1.5;
                    break;
                case 2:
                    this.x = Math.random() * bgCanvas.width;
                    this.y = bgCanvas.height + 50;
                    this.vx = (Math.random() - 0.5) * 1.5;
                    this.vy = -(0.3 + Math.random() * 0.8);
                    break;
                case 3:
                    this.x = -50;
                    this.y = Math.random() * bgCanvas.height;
                    this.vx = 0.3 + Math.random() * 0.8;
                    this.vy = (Math.random() - 0.5) * 1.5;
                    break;
            }

            this.size = 14 + Math.random() * 10;
            this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.life = 0;
            this.maxLife = 100 + Math.random() * 200;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.life++;

            if (this.x < -100 || this.x > bgCanvas.width + 100 || 
                this.y < -100 || this.y > bgCanvas.height + 100 ||
                this.life > this.maxLife) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            let alpha = 1;
            if (this.life < 30) {
                alpha = this.life / 30;
            } else if (this.life > this.maxLife - 30) {
                alpha = (this.maxLife - this.life) / 30;
            }

            const colorWithAlpha = this.color.replace(/[\d.]+\)$/g, (alpha * 0.4) + ')');
            ctx.fillStyle = colorWithAlpha;
            ctx.font = `${this.size}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.text, 0, 0);
            
            ctx.restore();
        }
    }

    const particles = [];
    const particleCount = Math.floor((bgCanvas.width * bgCanvas.height) / 50000);
    
    function initParticles() {
        particles.length = 0;
        const count = Math.max(10, Math.min(30, particleCount));
        for (let i = 0; i < count; i++) {
            particles.push(new BackgroundParticle());
        }
    }

    initParticles();
    window.addEventListener('resize', initParticles);

    function animate() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
})();

