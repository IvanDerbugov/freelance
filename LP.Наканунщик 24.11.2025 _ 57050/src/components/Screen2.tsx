import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { usePresentationContext } from "./PresentationContext";
import { SparkleButton } from "./SparkleButton";

export function Screen2() {
  const { nextSlide } = usePresentationContext();
  
  const [targetDate] = useState(() => {
    const now = new Date();
    const december15 = new Date(now.getFullYear(), 11, 15, 0, 0, 0, 0);
    
    // Проверяем, прошло ли 15 декабря
    if (now > december15) {
      // Если прошло, используем логику с 72 часами от времени входа
      const STORAGE_KEY = 'nakanunshchik_entry_time';
      const HOURS_72 = 72 * 60 * 60 * 1000; // 72 часа в миллисекундах
      
      // Получаем время входа из localStorage или сохраняем текущее
      let entryTimeStr = localStorage.getItem(STORAGE_KEY);
      let entryTime: Date;
      
      if (entryTimeStr) {
        entryTime = new Date(parseInt(entryTimeStr, 10));
        // Проверяем, что сохраненное время валидно
        if (isNaN(entryTime.getTime())) {
          entryTime = new Date();
          localStorage.setItem(STORAGE_KEY, entryTime.getTime().toString());
        }
      } else {
        entryTime = new Date();
        localStorage.setItem(STORAGE_KEY, entryTime.getTime().toString());
      }
      
      // Вычисляем дату окончания (время входа + 72 часа)
      const endDate = new Date(entryTime.getTime() + HOURS_72);
      return endDate;
    }
    
    // Если 15 декабря еще не наступило, используем старую логику
    return december15;
  });
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#ff0055] px-4 md:px-8 px-8-400 py-12 md:py-0 py-65-mobile relative overflow-hidden">
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-[60px] md:space-y-16"
        >
          {/* Heading */}
          <motion.div 
            className="space-y-[60px] md:space-y-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight text-[30px] md:text-[30px] lg:text-[30px] font-black uppercase p-[0px]">
              До сезона<br />
              <span className="text-[#d4ff00]">«давайте уже после праздников»</span><br />
              осталось:
            </h2>
          </motion.div>

          {/* Countdown */}
          <div className="flex flex-row justify-center items-center gap-2 sm400:gap-2.5 sm550:gap-3 sm700:gap-3.5 md:gap-3 lg1050:gap-4 max-w-4xl mx-auto">
            {[
              { value: String(timeLeft.days).padStart(2, '0'), label: 'дни', color: '#d4ff00' },
              { value: String(timeLeft.hours).padStart(2, '0'), label: 'часы', color: '#00ccff' },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: 'минуты', color: '#ff6b00' },
            ].map((item, index) => (
              <div key={item.label} className="flex flex-row items-center gap-2 sm400:gap-2.5 sm550:gap-3 sm700:gap-3.5 md:gap-3 lg1050:gap-4">
                {index > 0 && (
                  <div className="text-3xl sm400:text-3xl sm550:text-5xl sm700:text-7xl md:text-4xl lg1050:text-9xl text-white mx-0 sm400:mx-1 sm550:mx-3 sm700:mx-3 md:mx-2 lg1050:mx-4">:</div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-1"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="bg-white rounded-xl sm400:rounded-xl sm550:rounded-2xl sm700:rounded-2xl md:rounded-2xl lg1050:rounded-3xl p-2 sm400:p-3 sm550:p-5 sm700:p-6 md:p-4 lg1050:p-8 shadow-2xl border-2 sm400:border-2.5 sm550:border-3 sm700:border-3.5 md:border-3 lg1050:border-4 border-black relative overflow-hidden"
                  >
                    <div 
                      className="text-3xl sm400:text-3xl sm550:text-5xl sm700:text-7xl md:text-4xl lg1050:text-9xl tabular-nums leading-none mb-1 sm400:mb-1 sm550:mb-1.5 sm700:mb-1.5 md:mb-1.5 lg1050:mb-2"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>
                    <div className="text-[10px] sm400:text-xs sm550:text-sm sm700:text-base md:text-sm lg1050:text-xl text-black tracking-wider uppercase">
                      {item.label}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <SparkleButton onClick={nextSlide} className="bg-[#d4ff00] text-black text-[18px] md:text-[24px] px-8 md:px-12">
              Успеть до праздников 🎄
            </SparkleButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
