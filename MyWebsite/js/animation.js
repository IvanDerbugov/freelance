const canvas = document.getElementById('code-animation');
const ctx = canvas.getContext('2d');

const padding = 50;
canvas.width = 400 + padding * 2;
canvas.height = 300 + padding * 2;

const codeSymbols = ['</>', '{}', '=>', '()', '[]', '&&', '||', 'px'];
const colorPalette = [
    'rgba(7, 158, 123, 0.8)',
    'rgba(255, 255, 255, 0.8)',
    'rgba(130, 210, 255, 0.8)',
    'rgba(0, 230, 230, 0.8)',
    'rgba(190, 140, 255, 0.8)'
];
let particles = [];
let targetCoordinates = [];
let animationState = 'chaos';
let pulseFactor = 1;
let pulseDirection = 1;

function animationLoop() {
    switch (animationState) {
        case 'chaos':
            setTimeout(() => {
                animationState = 'assembling';
            }, 2500);
            break;
        case 'pulsing':
            setTimeout(() => {
                particles.forEach(p => {
                    p.disperseTargetX = Math.random() * canvas.width;
                    p.disperseTargetY = Math.random() * canvas.height;
                });
                animationState = 'dispersing';
            }, 3000);
            break;
        case 'dispersing':
            setTimeout(() => {
                animationState = 'chaos';
                animationLoop();
            }, 3000);
            break;
    }
}

function getTextCoordinates() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = '#fff';
    tempCtx.font = 'bold 135px "Trebuchet MS", sans-serif';
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText('И.Д.', canvas.width / 2, canvas.height / 2);

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;
    const coordinates = [];

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
            const x = (i / 4) % tempCanvas.width;
            const y = Math.floor((i / 4) / tempCanvas.width);
            if (x % 4 === 0 && y % 4 === 0) {
                coordinates.push({ x: x, y: y });
            }
        }
    }
    return coordinates;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

targetCoordinates = shuffle(getTextCoordinates());

class Particle {
    constructor(target, index, total) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = (index / total) * Math.PI * 8;
        const radius = (index / total) * 30;
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        
        this.size = 12;
        this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        const explosionAngle = angle + Math.random() * 0.5;
        const explosionSpeed = 2 + Math.random() * 3;
        this.vx = Math.cos(explosionAngle) * explosionSpeed;
        this.vy = Math.sin(explosionAngle) * explosionSpeed;
        
        this.targetX = target.x;
        this.targetY = target.y;
        this.disperseTargetX = 0;
        this.disperseTargetY = 0;
        this.angle = angle;
    }

    update() {
        switch (animationState) {
            case 'assembling':
                this.vx += (this.targetX - this.x) * 0.01;
                this.vy += (this.targetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                if (Math.abs(this.x - this.targetX) < 0.5 && Math.abs(this.y - this.targetY) < 0.5) {
                    if (particles.every(p => Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1)) {
                         animationState = 'pulsing';
                    }
                }
                break;
            case 'pulsing':
                this.x = this.targetX;
                this.y = this.targetY;
                break;
            case 'dispersing':
                this.vx += (this.disperseTargetX - this.x) * 0.01;
                this.vy += (this.disperseTargetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                break;
            case 'chaos':
            default:
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                const dx = centerX - this.x;
                const dy = centerY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 150) {
                    this.vx += (dx / distance) * 0.05;
                    this.vy += (dy / distance) * 0.05;
                }
                
                const rotationForce = 0.02;
                this.vx += -dy * rotationForce / 100;
                this.vy += dx * rotationForce / 100;
                
                this.vx *= 0.985;
                this.vy *= 0.985;
                
                if (this.x < padding) this.vx += 0.1;
                if (this.x > canvas.width - padding) this.vx -= 0.1;
                if (this.y < padding) this.vy += 0.1;
                if (this.y > canvas.height - padding) this.vy -= 0.1;
                break;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        let x = this.x;
        let y = this.y;

        if (animationState === 'pulsing') {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            x = centerX + (this.x - centerX) * pulseFactor;
            y = centerY + (this.y - centerY) * pulseFactor;
        }

        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.text, x, y);
    }
}

function init() {
    const total = targetCoordinates.length;
    for (let i = 0; i < total; i++) {
        particles.push(new Particle(targetCoordinates[i], i, total));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(animationState === 'pulsing') {
        pulseFactor += 0.001 * pulseDirection;
        if (pulseFactor > 1.05 || pulseFactor < 0.95) {
            pulseDirection *= -1;
        }
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();
animationLoop();

window.restartCanvasAnimation = function() {
    animationState = 'chaos';
    
    particles = [];
    
    const total = targetCoordinates.length;
    for (let i = 0; i < total; i++) {
        particles.push(new Particle(targetCoordinates[i], i, total));
    }
    
    animationLoop();
};