import { motion } from "motion/react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";
import { usePresentationContext } from "./PresentationContext";

export function Screen4() {
  const { nextSlide } = usePresentationContext();
  
  const features = [
    {
      title: "AI-БРИФИНГ",
      description: "Вы заполняете бриф в интерактивном окне прямо на сайте. Наш AI-ассистент задаст правильные вопросы. Мы за минуты получаем всю нужную информацию.",
      emoji: "🤖",
      color: "#ff0055",
    },
    {
      title: "БЫСТРЫЕ КРЕАТИВЫ",
      description: "AI генерирует идеи и тексты, а наш копирайтер доводит их до блеска.",
      emoji: "⚡",
      color: "#00ccff",
    },
    {
      title: "ЧЕЛОВЕЧЕСКАЯ ВЁРСТКА",
      description: "Вкалывают роботы — верстает человек! Никаких кривых шаблонов.",
      emoji: "🎨",
      color: "#ff6b00",
    },
    {
      title: "ГАРАНТИЯ ЗАПУСКА",
      description: "Мы гарантируем, что ваша рассылка уйдет до 25 декабря.",
      emoji: "🎄",
      color: "#bb00ff",
    },
  ];

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#bb00ff] px-4 md:px-8 py-12 md:py-0 relative overflow-hidden">
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-5xl w-full relative z-10 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[60px] md:space-y-8"
        >
          {/* Heading */}
          <div className="space-y-[60px] md:space-y-3">
            <motion.h2 
              className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight text-center text-[28px] md:text-[36px] lg:text-[40px] font-black uppercase px-4 md:px-[63px] py-[0px] mt-[60px] md:mt-[0px] mr-[0px] mb-[20px] md:mb-[30px] ml-[0px]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              «Наканунщик» — самая кинетическая программа для тех, кто хочет успеть до праздников
            </motion.h2>
            <motion.p 
              className="text-white text-center text-[16px] md:text-[20px] drop-shadow-lg max-w-4xl mx-4 md:mx-[184px] leading-snug my-[0px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Это связка AI-ассистента и живого специалиста по email-маркетингу. Скорость машины, душа человека.
            </motion.p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-2xl border-4 border-black relative overflow-hidden group cursor-pointer"
              >
                {/* Emoji */}
                <div className="text-4xl md:text-5xl mb-2">
                  {feature.emoji}
                </div>

                {/* Content */}
                <h3 
                  className="text-[16px] md:text-[18px] mb-2 font-black uppercase"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-black leading-tight text-[14px] md:text-[16px]">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{ backgroundColor: feature.color }}
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center pt-2"
          >
            <SparkleButton onClick={nextSlide} className="bg-[#d4ff00] text-black text-[16px] md:text-[20px] px-8 md:px-12">
              Хочу попробовать и успеть
            </SparkleButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
