// Фоновая анимация с пролетающими символами кода
(function() {
    // Создаем canvas для фоновой анимации
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'background-animation';
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100%';
    bgCanvas.style.height = '100%';
    bgCanvas.style.zIndex = '-1';
    bgCanvas.style.pointerEvents = 'none';
    bgCanvas.style.opacity = '0.3'; // Полупрозрачность для фона
    document.body.insertBefore(bgCanvas, document.body.firstChild);

    const ctx = bgCanvas.getContext('2d');

    // Устанавливаем размер canvas
    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Те же символы, что и в основной анимации
    const codeSymbols = ['</>', '{}', '=>', '()', '[]', '&&', '||', 'px', '<>', '::'];
    const colorPalette = [
        'rgba(7, 158, 123, 0.6)',   // Акцентный зеленый
        'rgba(255, 255, 255, 0.4)', // Белый
        'rgba(130, 210, 255, 0.5)', // Светло-голубой
        'rgba(0, 230, 230, 0.5)',   // Бирюзовый/Циан
        'rgba(190, 140, 255, 0.5)'  // Светло-фиолетовый
    ];

    // Класс для фоновых частиц
    class BackgroundParticle {
        constructor() {
            this.reset();
            // Начальная позиция может быть где угодно на экране
            this.y = Math.random() * bgCanvas.height;
        }

        reset() {
            // Стартуем с разных сторон экрана
            const side = Math.floor(Math.random() * 4);
            switch(side) {
                case 0: // Сверху
                    this.x = Math.random() * bgCanvas.width;
                    this.y = -50;
                    this.vx = (Math.random() - 0.5) * 1.5;
                    this.vy = 0.3 + Math.random() * 0.8;
                    break;
                case 1: // Справа
                    this.x = bgCanvas.width + 50;
                    this.y = Math.random() * bgCanvas.height;
                    this.vx = -(0.3 + Math.random() * 0.8);
                    this.vy = (Math.random() - 0.5) * 1.5;
                    break;
                case 2: // Снизу
                    this.x = Math.random() * bgCanvas.width;
                    this.y = bgCanvas.height + 50;
                    this.vx = (Math.random() - 0.5) * 1.5;
                    this.vy = -(0.3 + Math.random() * 0.8);
                    break;
                case 3: // Слева
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

            // Если частица вышла за пределы экрана или прожила долго, сбрасываем её
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
            
            // Fade in/out эффект
            let alpha = 1;
            if (this.life < 30) {
                alpha = this.life / 30;
            } else if (this.life > this.maxLife - 30) {
                alpha = (this.maxLife - this.life) / 30;
            }

            // Применяем прозрачность
            const colorWithAlpha = this.color.replace(/[\d.]+\)$/g, (alpha * 0.4) + ')');
            ctx.fillStyle = colorWithAlpha;
            ctx.font = `${this.size}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.text, 0, 0);
            
            ctx.restore();
        }
    }

    // Создаем частицы (не слишком много, чтобы не отвлекать)
    const particles = [];
    const particleCount = Math.floor((bgCanvas.width * bgCanvas.height) / 50000); // Адаптивное количество
    
    function initParticles() {
        particles.length = 0;
        const count = Math.max(10, Math.min(30, particleCount)); // От 10 до 30 частиц
        for (let i = 0; i < count; i++) {
            particles.push(new BackgroundParticle());
        }
    }

    initParticles();
    window.addEventListener('resize', initParticles);

    // Анимация
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

