import { motion } from "motion/react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";
import { usePresentationContext } from "./PresentationContext";

export function Screen3() {
  const { nextSlide } = usePresentationContext();
  
  const problems = [
    { text: "Идеи есть, а рук нет", color: "#ff0055", emoji: "😱" },
    { text: "Креатив застрял в согласованиях", color: "#00ccff", emoji: "🕳️" },
    { text: "Конкуренты уже поздравляют", color: "#ff6b00", emoji: "😤" },
    { text: "«Давайте после праздников»", color: "#bb00ff", emoji: "🤦" },
  ];

  return (
    <div className="w-full flex items-center justify-center bg-[#00ccff] px-4 md:px-8 px-8-400 py-12 md:py-16 py-65-mobile relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-5xl w-full relative z-10 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[60px] md:space-y-16 pb-8 md:pb-0"
        >
          {/* Heading */}
          <motion.div 
            className="space-y-[60px] md:space-y-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight text-center text-[30px] md:text-[30px] lg:text-[30px] font-black uppercase px-4 mt-[60px] md:mt-0">
              Типичный конец года у CMO
            </h2>
          </motion.div>

          {/* Problems grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-black relative overflow-hidden group cursor-pointer"
              >
                {/* Emoji */}
                <div className="text-5xl md:text-7xl mb-3 md:mb-4">
                  {problem.emoji}
                </div>

                {/* Text */}
                <p className="text-black leading-tight text-[18px] md:text-[24px] font-bold font-normal">
                  {problem.text}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{ backgroundColor: problem.color }}
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.15 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <SparkleButton onClick={nextSlide} className="bg-[#d4ff00] text-black text-[18px] md:text-[24px] px-8 md:px-12">
              Наканунщик придумал решение
            </SparkleButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
