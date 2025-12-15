import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { Send, RotateCcw } from "lucide-react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";
import { usePresentationContext } from "./PresentationContext";
import { sendChatMessage } from "../api/chatApi";

type Message = {
  text: string;
  isBot: boolean;
};

const CHAT_STORAGE_KEY = "nakanunshchik_chat_state";

export function Screen5() {
  const { nextSlide } = usePresentationContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Load chat state from localStorage
  const loadChatState = (): { messages: Message[]; input: string } => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          messages: parsed.messages || [],
          input: parsed.input || "",
        };
      }
    } catch (e) {
      console.error("Failed to load chat state:", e);
    }
    return {
      messages: [
        {
          text: "Добрый день! Я Наканунщик из KINETICA. Рад помочь вам с идеями для спецпроекта. Расскажите, пожалуйста, чем занимается ваш бизнес?",
          isBot: true,
        },
      ],
      input: "",
    };
  };

  const initialState = loadChatState();
  const [messages, setMessages] = useState<Message[]>(initialState.messages);
  const [input, setInput] = useState(initialState.input);
  const [isLoading, setIsLoading] = useState(false);
  const [typingDots, setTypingDots] = useState(1);

  // Save chat state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify({
          messages,
          input,
        })
      );
    } catch (e) {
      console.error("Failed to save chat state:", e);
    }
  }, [messages, input]);

  // Prevent wheel event from propagating to parent (to avoid slide navigation)
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    chatContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      chatContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Анимация точек "печатает..."
  useEffect(() => {
    if (!isLoading) {
      setTypingDots(1);
      return;
    }

    const interval = setInterval(() => {
      setTypingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500); // Меняем каждые 500мс

    return () => clearInterval(interval);
  }, [isLoading]);

  // Очистка чата
  const handleClearChat = () => {
    if (confirm('Очистить историю чата?')) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      setMessages([
        {
          text: "Добрый день! Я Наканунщик из KINETICA. Рад помочь вам с идеями для спецпроекта. Расскажите, пожалуйста, чем занимается ваш бизнес?",
          isBot: true,
        },
      ]);
      setInput("");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input.trim(), isBot: false };
    
    // Фильтруем сообщения об ошибках перед отправкой
    const validMessages = messages.filter(msg => 
      !msg.text.includes("Извините, произошла ошибка") && 
      !msg.text.includes("Проверьте консоль браузера")
    );
    
    const updatedMessages = [...validMessages, userMessage];
    setMessages([...validMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Отправляем запрос к API
      const botResponse = await sendChatMessage(updatedMessages);

      if (botResponse) {
        setMessages((prev) => [...prev, botResponse]);
      } else {
        // Обработка ошибки
        const errorMessage: Message = {
          text: "Извините, произошла ошибка при подключении к серверу. Попробуйте еще раз.",
          isBot: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        text: "Извините, произошла ошибка при отправке сообщения. Попробуйте еще раз.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 px-8-400 py-12 md:py-8 py-65-mobile relative overflow-hidden">
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
            <h2 className="text-black mx-4 md:mx-[39px] my-0 mt-[60px] md:mt-0 p-0 text-[30px] md:text-[30px] lg:text-[30px] font-black uppercase">
              Попробуйте нашего AI-ассистента прямо сейчас!
            </h2>
          </motion.div>

          {/* Chat interface */}
          <motion.div
            ref={chatContainerRef}
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
                <span className="text-lg md:text-2xl font-bold">AI Наканунщик</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={handleClearChat}
                  className="text-xs md:text-sm hover:opacity-80 transition-opacity flex items-center gap-1 md:gap-2"
                  title="Очистить чат"
                >
                  <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden md:inline">Очистить</span>
                </button>
                <span className="text-sm md:text-xl">ОНЛАЙН 🟢</span>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="h-64 md:h-96 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-white to-gray-50"
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
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
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] md:max-w-[80%] px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl shadow-lg bg-gradient-to-r from-[#00ccff] to-[#0088ff] text-white">
                    <span className="whitespace-pre-line leading-relaxed text-[14px] md:text-[16px]">
                      печатает{'.'.repeat(typingDots)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div 
              className="p-4 md:p-6 bg-white border-t-4 border-black"
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
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
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  placeholder={isLoading ? "Бот печатает..." : "Пишите сюда... 💬"}
                  className="flex-1 border-4 border-black rounded-full text-base md:text-xl px-4 md:px-6 py-3 md:py-4"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-[#ff0055] hover:bg-[#bb00ff] text-white px-4 md:px-8 rounded-full border-4 border-black"
                  disabled={isLoading}
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
