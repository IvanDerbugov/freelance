import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";
import { usePresentationContext } from "./PresentationContext";

type Message = {
  text: string;
  isBot: boolean;
};

type ChatStep = "initial" | "business" | "goal" | "ideas" | "email";

export function Screen5() {
  const { nextSlide } = usePresentationContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Привет! Я — AI-помощник «Наканунщика». Давайте прикинем идею для вашей праздничной рассылки? Напишите, какой у вас бизнес.",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<ChatStep>("initial");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let botResponse: Message;

      switch (step) {
        case "initial":
          botResponse = {
            text: `Отлично! ${input} — интересная сфера! 🎉\n\nТеперь подскажите, какая цель у праздничной рассылки?\n(привлечь новых клиентов / поздравить существующих / запустить новый продукт / другое)`,
            isBot: true,
          };
          setStep("business");
          break;

        case "business":
          botResponse = {
            text: "Супер! Сейчас подумаю и предложу идеи... 🤖✨",
            isBot: true,
          };
          setStep("goal");

          setTimeout(() => {
            const ideas = `🎁 КРЕАТИВНЫЕ ИДЕИ ДЛЯ ВАШЕЙ РАССЫЛКИ:\n\n💡 Идея 1: "Новогодний адвент"\nСерия писем с нарастающими бонусами и сюрпризами до праздников\n\n💡 Идея 2: "Подарок под елку"\nСпециальное предложение только для подписчиков с праздничным оформлением\n\n💡 Идея 3: "История года вместе"\nТеплое письмо с достижениями компании и благодарностью клиентам\n\n📧 Хотите получить полный план рассылки на почту? Оставьте свой email.`;
            setMessages((prev) => [...prev, { text: ideas, isBot: true }]);
            setStep("ideas");
          }, 2000);
          return;

        case "ideas":
          botResponse = {
            text: `Отлично! 🚀 Полный план отправлен на ${input}\n\nНаш менеджер свяжется с вами в течение часа, чтобы обсудить детали!`,
            isBot: true,
          };
          setStep("email");
          break;

        default:
          botResponse = { text: "Спасибо! 🎉", isBot: true };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 800);

    setInput("");
  };

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 py-12 md:py-8 relative overflow-hidden">
      {/* Noise Texture */}
      <NoiseTexture />
      
      <ChristmasLights position="top" />
      
      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-[60px] md:space-y-8"
        >
          {/* Heading */}
          <motion.div 
            className="text-center space-y-[60px] md:space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-black mx-4 md:mx-[39px] my-[0px] mt-[60px] md:mt-[0px] p-[0px] text-[28px] md:text-[36px] lg:text-[40px] font-black uppercase">
              Попробуйте нашего AI-ассистента прямо сейчас!
            </h2>
          </motion.div>

          {/* Chat interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-4 border-black overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-[#ff0055] to-[#bb00ff] text-white px-4 md:px-8 py-4 md:py-6 flex items-center justify-between border-b-4 border-black">
              <div className="flex items-center gap-2 md:gap-4">
                <motion.div
                  className="w-3 h-3 md:w-4 md:h-4 bg-[#d4ff00] rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-lg md:text-2xl font-bold">AI НАКАНУНЩИКА</span>
              </div>
              <span className="text-sm md:text-xl">ОНЛАЙН 🟢</span>
            </div>

            {/* Messages */}
            <div className="h-64 md:h-96 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-white to-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl shadow-lg ${
                      message.isBot
                        ? "bg-gradient-to-r from-[#00ccff] to-[#0088ff] text-white"
                        : "bg-black text-white"
                    }`}
                  >
                    <span className="whitespace-pre-line leading-relaxed text-[14px] md:text-[16px]">
                      {message.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 bg-white border-t-4 border-black">
              <div className="flex gap-2 md:gap-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                      e.stopPropagation();
                    }
                  }}
                  placeholder="Пишите сюда... 💬"
                  className="flex-1 border-4 border-black rounded-full text-base md:text-xl px-4 md:px-6 py-3 md:py-4"
                  disabled={step === "goal" || step === "email"}
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#ff0055] hover:bg-[#bb00ff] text-white px-4 md:px-8 rounded-full border-4 border-black"
                  disabled={step === "goal" || step === "email"}
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-6"
          >
            <SparkleButton onClick={nextSlide} className="bg-[#d4ff00] text-black text-[16px] md:text-[20px] px-8 md:px-12">
              Впечатляет! Давайте дальше 🎯
            </SparkleButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
