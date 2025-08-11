// timer.js - Таймер обратного отсчета до конца недели по московскому времени

class WeeklyTimer {
    constructor(timerElement) {
        this.timerElement = timerElement;
        
        // Правильные селекторы для span элементов
        if (this.timerElement) {
            const spans = this.timerElement.querySelectorAll('span');
            this.daysElement = spans[0];      // Первый span - дни
            this.hoursElement = spans[1];     // Второй span - часы  
            this.minutesElement = spans[2];   // Третий span - минуты
            this.secondsElement = spans[3];   // Четвертый span - секунды
        }
        
        this.interval = null;
        this.init();
    }

    init() {
        if (!this.timerElement) {
            console.warn('Timer element not found');
            return;
        }
        
        // Проверяем, что все элементы найдены
        if (!this.daysElement || !this.hoursElement || !this.minutesElement || !this.secondsElement) {
            console.warn('Timer elements not found');
            return;
        }
        
        this.updateTimer();
        this.startTimer();
    }

    // Получаем время до конца недели (воскресенье 23:59:59)
    getTimeUntilWeekEnd() {
        const now = new Date();
        
        // Получаем московское время (UTC+3)
        const moscowTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
        
        // День недели (0 = воскресенье, 1 = понедельник, ..., 6 = суббота)
        const currentDay = moscowTime.getDay();
        
        // Если сегодня воскресенье и время после 23:59:59, то следующая неделя
        if (currentDay === 0 && moscowTime.getHours() >= 23 && moscowTime.getMinutes() >= 59) {
            // Следующее воскресенье в 23:59:59
            const nextSunday = new Date(moscowTime);
            nextSunday.setDate(moscowTime.getDate() + 7);
            nextSunday.setHours(23, 59, 59, 999);
            return nextSunday.getTime() - moscowTime.getTime();
        }
        
        // Если сегодня воскресенье, то до конца дня
        if (currentDay === 0) {
            const endOfSunday = new Date(moscowTime);
            endOfSunday.setHours(23, 59, 59, 999);
            return endOfSunday.getTime() - moscowTime.getTime();
        }
        
        // Иначе до следующего воскресенья в 23:59:59
        const daysUntilSunday = 7 - currentDay;
        const nextSunday = new Date(moscowTime);
        nextSunday.setDate(moscowTime.getDate() + daysUntilSunday);
        nextSunday.setHours(23, 59, 59, 999);
        
        return nextSunday.getTime() - moscowTime.getTime();
    }

    // Обновляем таймер
    updateTimer() {
        const timeLeft = this.getTimeUntilWeekEnd();
        
        if (timeLeft <= 0) {
            // Время истекло, обновляем на следующую неделю
            this.resetTimer();
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Обновляем элементы таймера
        if (this.daysElement) {
            this.daysElement.textContent = days.toString().padStart(2, '0');
        }
        if (this.hoursElement) {
            this.hoursElement.textContent = hours.toString().padStart(2, '0');
        }
        if (this.minutesElement) {
            this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        }
        if (this.secondsElement) {
            this.secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }

    // Функция тик - обновляет таймер каждую секунду
    tick() {
        this.updateTimer();
    }

    // Сброс таймера (когда время истекло)
    resetTimer() {
        // Останавливаем текущий таймер
        if (this.interval) {
            clearInterval(this.interval);
        }
        
        // Обновляем таймер для новой недели
        this.updateTimer();
        
        // Запускаем таймер заново
        this.startTimer();
    }

    // Запуск таймера
    startTimer() {
        // Обновляем каждую секунду используя функцию tick
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    // Остановка таймера
    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Получение информации о текущем состоянии
    getTimerInfo() {
        const timeLeft = this.getTimeUntilWeekEnd();
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        return {
            days,
            hours,
            minutes,
            seconds,
            totalMilliseconds: timeLeft,
            isExpired: timeLeft <= 0
        };
    }
}

// Инициализация всех таймеров после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Находим все таймеры на странице
    const allTimers = document.querySelectorAll('.timer');
    
    // Создаем экземпляр таймера для каждого найденного элемента
    allTimers.forEach(timerElement => {
        new WeeklyTimer(timerElement);
    });
    
    console.log(`Инициализировано ${allTimers.length} таймеров`);
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeeklyTimer;
}
