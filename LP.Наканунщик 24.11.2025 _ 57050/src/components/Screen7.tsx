import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";

export function Screen7() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert("🎉 ЗАЯВКА ПРИНЯТА! Свяжемся в течение часа!");
    }, 500);
  };

  const included = [
    { text: "Разработка концепции и креативов", emoji: "💡" },
    { text: "Написание текстов", emoji: "✍️" },
    { text: "Дизайн и верстка одного письма", emoji: "🎨" },
    { text: "Подготовка и запуск рассылки", emoji: "🚀" },
  ];

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 py-12 md:py-8 overflow-hidden relative">
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[60px] md:space-y-6"
        >
          {/* Heading */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-black text-[36px] md:text-[48px] lg:text-[56px] font-black uppercase leading-tight mx-[0px] my-[13px] mt-[60px] md:mt-[13px] mr-[4px] mb-[20px] md:mb-[37px] ml-[0px] px-4">
              Пакет «Успеть всё»
            </h2>
          </motion.div>

          {/* Main content - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-8">
            {/* Left column - Price & Details */}
            <div className="space-y-6 bg-[rgba(0,0,0,0)]">
              {/* Price block */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#00B2FF] rounded-2xl md:rounded-3xl p-6 md:p-10 text-center shadow-2xl border-4 border-black relative"
              >
                <div className="space-y-2">
                  <motion.div 
                    className="text-white text-[48px] md:text-[64px] lg:text-[80px] tabular-nums font-black leading-none"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    50 000₽
                  </motion.div>
                </div>
              </motion.div>

              {/* What's included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl border-4 border-black"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-[18px] md:text-[20px] text-black font-black uppercase">Что входит</h3>
                </div>
                
                <ul className="space-y-2 md:space-y-3">
                  {included.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2 md:gap-3 text-[14px] md:text-[16px] text-black"
                    >
                      <span className="text-xl md:text-2xl">{item.emoji}</span>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* What's NOT included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xl border-4 border-black"
              >
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="text-[18px] md:text-[20px] text-black font-black uppercase mb-2">Что не входит</h3>
                    <p className="text-[14px] md:text-[16px] text-black leading-relaxed">
                      Только оплата сервиса рассылок, т.к. его стоимость зависит от размера вашей базы. Всё остальное мы уже включили в тариф.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-black h-fit"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <h3 className="text-[18px] md:text-[20px] text-black font-black uppercase">Оставить заявку</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <Input
                  placeholder="Ваше имя 👤"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Input
                  type="email"
                  placeholder="Email 📧"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Input
                  placeholder="Компания 🏢"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Textarea
                  placeholder="О проекте ✏️"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4"
                />
                
                <SparkleButton
                  type="submit"
                  className="w-full py-4 md:py-5 text-[18px] md:text-[20px]"
                  disabled={submitted}
                  textColor="text-white"
                  hoverScale={1.02}
                >
                  {submitted ? "✅ ОТПРАВЛЕНО!" : "🚀 ХОЧУ УСПЕТЬ!"}
                </SparkleButton>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
