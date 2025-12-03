import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { usePresentationContext } from "./PresentationContext";
import { SparkleButton } from "./SparkleButton";

export function Screen2() {
  const { nextSlide } = usePresentationContext();
  
  // Calculate target date: 3 days from now
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  });
  
  const [timeLeft, setTimeLeft] = useState({ hours: 72, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#ff0055] px-4 md:px-8 py-12 md:py-0 relative overflow-hidden">
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
            <h2 className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight text-[32px] md:text-[48px] lg:text-[60px] font-bold uppercase p-[0px]">
              До сезона<br />
              <span className="text-[#d4ff00]">«давайте уже после праздников»</span><br />
              осталось:
            </h2>
          </motion.div>

          {/* Countdown */}
          <div className="flex flex-row justify-center items-center gap-2 md:gap-4 max-w-4xl mx-auto">
            {[
              { value: String(timeLeft.hours).padStart(2, '0'), label: 'часы', color: '#d4ff00' },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: 'минуты', color: '#00ccff' },
              { value: String(timeLeft.seconds).padStart(2, '0'), label: 'секунды', color: '#ff6b00' },
            ].map((item, index) => (
              <div key={item.label} className="flex flex-row items-center gap-2 md:gap-4">
                {index > 0 && (
                  <div className="text-3xl md:text-9xl text-white mx-0 md:mx-4">:</div>
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
                    className="bg-white rounded-xl md:rounded-3xl p-2 md:p-8 shadow-2xl border-2 md:border-4 border-black relative overflow-hidden"
                  >
                    <div 
                      className="text-3xl md:text-9xl tabular-nums leading-none mb-1 md:mb-2"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>
                    <div className="text-[10px] md:text-xl text-black tracking-wider uppercase">
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
