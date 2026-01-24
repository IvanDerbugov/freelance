import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
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
    { text: "Разработка концепции и креативов", emoji: "💡", isFree: true },
    { text: "Написание текстов", emoji: "✍️", isFree: false },
    { text: "Дизайн и верстка одного письма", emoji: "🎨", isFree: false },
    { text: "Подготовка и запуск рассылки", emoji: "🚀", isFree: false },
  ];

  return (
    <div 
      className="w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 py-12 md:py-6 overflow-hidden relative"
      style={{
        backgroundColor: '#d4ff00',
        backgroundImage: 'none'
      }}
    >
      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[40px] md:space-y-5"
        >
          {/* Heading */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-black text-[48px] font-black uppercase leading-tight mx-[0px] my-[10px] px-4">
              Пакет «Успеть всё»
            </h2>
          </motion.div>

          {/* Main content - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 md:gap-6">
            {/* Left column - Price & Details */}
            <div className="space-y-4 md:space-y-5 bg-[rgba(0,0,0,0)]">
              {/* Price block */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#00B2FF] rounded-xl md:rounded-2xl p-5 md:p-8 text-center shadow-2xl border-4 border-black relative"
              >
                <div className="space-y-2 md:space-y-3">
                  <div 
                    className="text-white text-[22px] md:text-[32px] lg:text-[38px] font-black leading-tight"
                  >
                    Понравились идеи нашего ИИ-ассистента?
                  </div>
                  <p className="text-white text-[16px] md:text-[22px] leading-[1.45] md:leading-tight px-2 font-semibold">
                    Запустите рассылку по готовой идее и получите скидку <span className="bg-white text-[#00B2FF] px-2 py-0.5 rounded-lg font-semibold">50%</span> на запуск письма, ведь Наканунщик уже сделал креативную часть.
                  </p>
                </div>
              </motion.div>

              {/* Grid for included/not included blocks */}
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {/* What's included */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-2xl border-4 border-black flex-1 relative overflow-visible"
                >
                  {/* Price tag */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 10 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 15,
                      boxShadow: "0 25px 50px -12px rgba(255, 23, 68, 0.5)"
                    }}
                    whileTap={{ 
                      scale: 0.95
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -top-6 -right-6 bg-gradient-to-br from-[#FF1744] to-[#FF5252] px-7 py-4 shadow-2xl border-4 border-black z-10 rounded-2xl cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-white text-[16px] md:text-[18px] font-bold line-through opacity-80">
                        50.000 ₽
                      </div>
                      <div className="text-white text-[24px] md:text-[28px] font-black">
                        25.000 ₽
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-[16px] md:text-[18px] text-black font-black uppercase">Что входит</h3>
                  </div>
                  
                  <ul className="space-y-2 md:space-y-2.5">
                    {included.map((item, index) => (
                      <>
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-2 md:gap-2.5 text-[13px] md:text-[15px] text-black"
                        >
                          {item.isFree ? (
                            <span className="bg-[#d4ff00] text-black px-2 py-0.5 rounded font-bold text-[10px] md:text-[12px] uppercase">FREE</span>
                          ) : (
                            <span className="text-lg md:text-xl">{item.emoji}</span>
                          )}
                          <span className="inline" dangerouslySetInnerHTML={{ __html: item.text.replace(/(\s)(и|в|к|с|на|по|за|из|до|от|о|у|об)\s/gi, '$1$2&nbsp;') }} />
                        </motion.li>
                        {index === 0 && (
                          <div key={`divider-${index}`} className="border-t-2 border-dashed border-gray-300 my-2"></div>
                        )}
                      </>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-2xl border-4 border-black h-fit lg:h-full flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <h3 className="text-[16px] md:text-[18px] text-black font-black uppercase">Оставить заявку</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-3.5 flex-1 flex flex-col">
                <Input
                  placeholder="Ваше имя 👤"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-4 border-black rounded-xl text-[13px] md:text-[15px] px-3 md:px-4 py-2.5 md:py-3 h-auto"
                />
                <Input
                  type="email"
                  placeholder="Email 📧"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-4 border-black rounded-xl text-[13px] md:text-[15px] px-3 md:px-4 py-2.5 md:py-3 h-auto"
                />
                <Input
                  placeholder="Компания 🏢"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="border-4 border-black rounded-xl text-[13px] md:text-[15px] px-3 md:px-4 py-2.5 md:py-3 h-auto"
                />
                <Textarea
                  placeholder="О проекте ✏️"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="border-4 border-black rounded-xl text-[13px] md:text-[15px] px-3 md:px-4 py-2.5 md:py-3 flex-1 resize-none"
                />
                
                <SparkleButton
                  type="submit"
                  className="w-full py-3 md:py-4 text-[16px] md:text-[18px]"
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