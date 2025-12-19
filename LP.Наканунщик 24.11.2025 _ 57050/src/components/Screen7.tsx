import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";

export function Screen7() {
  const [loading, setLoading] = useState(false);

  const included = [
    { text: "Разработка концепции и креативов", emoji: "💡" },
    { text: "Написание текстов", emoji: "✍️" },
    { text: "Дизайн и верстка одного письма", emoji: "🎨" },
    { text: "Подготовка и запуск рассылки", emoji: "🚀" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      setLoading(true);
      const res = await fetch("https://api.web3forms.com/submit", { 
        method: "POST", 
        body: data 
      });
      const json = await res.json();

      if (json.success) {
        alert("🎉 Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        form.reset();
      } else {
        alert(json.message || "Ошибка отправки. Попробуйте позже.");
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Сеть или сервер недоступны. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 md:px-8 px-8-400 py-12 md:py-16 py-65-mobile overflow-hidden relative" style={{ minHeight: '100vh' }}>
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-6xl w-full relative z-10 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[60px] md:space-y-6 pb-8 md:pb-0"
        >
          {/* Heading */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-black text-[30px] md:text-[30px] lg:text-[30px] font-black uppercase leading-tight mx-0 my-[13px] mt-[60px] md:mt-[13px] mr-[4px] mb-[20px] md:mb-[37px] ml-0 px-4">
              Пакет «Успеть всё»
            </h2>
          </motion.div>

          {/* Main content - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8">
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
                    className="text-white text-[48px] md:text-[56px] lg:text-[80px] tabular-nums font-black leading-none"
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
              
              <form
                action="https://api.web3forms.com/submit"
                method="post"
                className="space-y-3 md:space-y-4"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="access_key" value="acec3a84-ba9a-46af-8ed2-7bbb098102a7" />
                <input type="hidden" name="to_email" value="lead@kinetica.su" />
                <input type="hidden" name="subject" value="Новая заявка - Пакет «Успеть всё»" />
                <Input
                  name="name"
                  placeholder="Ваше имя 👤"
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                      e.stopPropagation();
                    }
                  }}
                  required
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email 📧"
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                      e.stopPropagation();
                    }
                  }}
                  required
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Input
                  name="company"
                  placeholder="Компания 🏢"
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                      e.stopPropagation();
                    }
                  }}
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4 h-auto"
                />
                <Textarea
                  name="message"
                  placeholder="О проекте ✏️"
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                      e.stopPropagation();
                    }
                  }}
                  rows={4}
                  className="border-4 border-black rounded-xl md:rounded-2xl text-[14px] md:text-[16px] px-4 md:px-5 py-3 md:py-4"
                />
                
                <SparkleButton
                  type="submit"
                  className="w-full py-4 md:py-5 text-[18px] md:text-[20px]"
                  disabled={loading}
                  textColor="text-white"
                  hoverScale={1.02}
                  children={loading ? "⏳ Отправляем..." : "🚀 ХОЧУ УСПЕТЬ!"}
                />
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
