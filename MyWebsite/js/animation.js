const canvas = document.getElementById('code-animation');
const ctx = canvas.getContext('2d');

// Увеличиваем размер canvas для создания буферной зоны (отступов)
const padding = 50; // Отступы со всех сторон
canvas.width = 400 + padding * 2;
canvas.height = 300 + padding * 2;

const codeSymbols = ['</>', '{}', '=>', '()', '[]', '&&', '||', 'px'];
const colorPalette = [
    'rgba(7, 158, 123, 0.8)', // Акцентный зеленый
    'rgba(255, 255, 255, 0.8)', // Белый
    'rgba(130, 210, 255, 0.8)', // Светло-голубой
    'rgba(0, 230, 230, 0.8)',   // Бирюзовый/Циан
    'rgba(190, 140, 255, 0.8)'  // Светло-фиолетовый
];
let particles = [];
let targetCoordinates = [];
let animationState = 'chaos'; // Возможные состояния: 'chaos', 'assembling', 'pulsing', 'dispersing'
let pulseFactor = 1;
let pulseDirection = 1;

// --- НОВАЯ ЧАСТЬ: УПРАВЛЕНИЕ ЦИКЛОМ АНИМАЦИИ ---
function animationLoop() {
    switch (animationState) {
        case 'chaos':
            // Через 2.5 секунды хаоса/вихря начинаем сборку
            setTimeout(() => {
                animationState = 'assembling';
            }, 2500);
            break;
        case 'pulsing':
            // Через 3 секунды пульсации начинаем разлет
            setTimeout(() => {
                particles.forEach(p => {
                    // Даем каждой частице новую случайную цель для разлета
                    p.disperseTargetX = Math.random() * canvas.width;
                    p.disperseTargetY = Math.random() * canvas.height;
                });
                animationState = 'dispersing';
            }, 3000);
            break;
        case 'dispersing':
             // Через 3 секунды после начала разлета начинаем новый цикл хаоса
            setTimeout(() => {
                animationState = 'chaos';
                // Запускаем главный цикл снова
                animationLoop();
            }, 3000);
            break;
    }
}

// --- НОВАЯ ЧАСТЬ: ПОЛУЧЕНИЕ КООРДИНАТ ИЗ ТЕКСТА ---
function getTextCoordinates() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Стилизуем наш текст (с учетом padding текст остается в центре)
    tempCtx.fillStyle = '#fff';
    tempCtx.font = 'bold 135px "Trebuchet MS", sans-serif'; // Увеличенный шрифт
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText('И.Д.', canvas.width / 2, canvas.height / 2);

    // Сканируем изображение
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;
    const coordinates = [];

    // Проходим по каждому пикселю. Увеличиваем 'i' на 4, т.к. каждый пиксель это 4 значения (R,G,B,A)
    for (let i = 0; i < data.length; i += 4) {
        // Если пиксель не полностью прозрачный (т.е. является частью текста)
        if (data[i + 3] > 0) {
            const x = (i / 4) % tempCanvas.width;
            const y = Math.floor((i / 4) / tempCanvas.width);
            // Добавляем координаты, только если они находятся в "шахматном порядке" (для разрежения)
            if (x % 4 === 0 && y % 4 === 0) {
                coordinates.push({ x: x, y: y });
            }
        }
    }
    return coordinates;
}

// Перемешиваем массив, чтобы частицы летели в случайные точки фигуры
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

targetCoordinates = shuffle(getTextCoordinates());

// Класс для создания частиц
class Particle {
    constructor(target, index, total) {
        // Инициализируем частицы в виде спирали в центре (для красивого начала)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = (index / total) * Math.PI * 8; // Спираль на 4 оборота
        const radius = (index / total) * 30; // Радиус спирали от 0 до 30
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        
        this.size = 12;
        this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        // Даем начальную скорость "взрыва" от центра + вращение
        const explosionAngle = angle + Math.random() * 0.5;
        const explosionSpeed = 2 + Math.random() * 3;
        this.vx = Math.cos(explosionAngle) * explosionSpeed;
        this.vy = Math.sin(explosionAngle) * explosionSpeed;
        
        this.targetX = target.x;
        this.targetY = target.y;
        this.disperseTargetX = 0; // Новые цели для разлета
        this.disperseTargetY = 0;
        this.angle = angle; // Сохраняем угол для вращения
    }

    update() {
        switch (animationState) {
            case 'assembling':
                this.vx += (this.targetX - this.x) * 0.01;
                this.vy += (this.targetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                // Когда частица почти достигла цели, переходим к пульсации
                if (Math.abs(this.x - this.targetX) < 0.5 && Math.abs(this.y - this.targetY) < 0.5) {
                    if (particles.every(p => Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1)) {
                         animationState = 'pulsing';
                    }
                }
                break;
            case 'pulsing':
                // Остаемся на месте цели
                this.x = this.targetX;
                this.y = this.targetY;
                break;
            case 'dispersing':
                 // Движение к точке разлета
                this.vx += (this.disperseTargetX - this.x) * 0.01;
                this.vy += (this.disperseTargetY - this.y) * 0.01;
                this.vx *= 0.96;
                this.vy *= 0.96;
                break;
            case 'chaos':
            default:
                // Вихревое движение с постепенным замедлением
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                // Добавляем слабую силу к центру (чтобы не улетали далеко)
                const dx = centerX - this.x;
                const dy = centerY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 150) {
                    this.vx += (dx / distance) * 0.05;
                    this.vy += (dy / distance) * 0.05;
                }
                
                // Добавляем вращательное движение (вихрь)
                const rotationForce = 0.02;
                this.vx += -dy * rotationForce / 100;
                this.vy += dx * rotationForce / 100;
                
                // Постепенное замедление (трение)
                this.vx *= 0.985;
                this.vy *= 0.985;
                
                // Отскок от стен (мягкий)
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
            // Применяем пульсацию к координатам относительно центра
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

// Создаем частицы
function init() {
    // Создаем столько частиц, сколько у нас есть целевых точек
    const total = targetCoordinates.length;
    for (let i = 0; i < total; i++) {
        particles.push(new Particle(targetCoordinates[i], i, total));
    }
}

// Цикл анимации
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
animationLoop(); // Запускаем первый цикл 

// Функция для перезапуска анимации (вызывается при переходе на главную)
window.restartCanvasAnimation = function() {
    // Останавливаем текущий цикл (если он запущен)
    animationState = 'chaos';
    
    // Очищаем старые частицы
    particles = [];
    
    // Создаем новые частицы (они будут в центре в виде спирали)
    const total = targetCoordinates.length;
    for (let i = 0; i < total; i++) {
        particles.push(new Particle(targetCoordinates[i], i, total));
    }
    
    // Перезапускаем цикл анимации
    animationLoop();
};