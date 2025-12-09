import {
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ChristmasLights } from "./ChristmasLights";
import { NoiseTexture } from "./NoiseTexture";
import { SparkleButton } from "./SparkleButton";
import { usePresentationContext } from "./PresentationContext";
import { useState, useEffect } from "react";
import starBurst from "figma:asset/199b0c9df4900b8c0ca721bd47970251ffed136c.png";
import christmasCharacter from "figma:asset/140cec68fe81e6fc55cc24ecfa9f4e3bd7ff0e43.png";

export function Screen1() {
  const { nextSlide } = usePresentationContext();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateZValue = useMotionValue(0);

  useEffect(() => {
    if (isMobile) {
      rotateXValue.set(4);
      rotateYValue.set(-1.5);
      rotateZValue.set(-1);
    }
  }, [isMobile, rotateXValue, rotateYValue, rotateZValue]);

  const rotateXDesktop = useTransform(
    mouseY,
    [0, window.innerHeight],
    [10, -10],
  );
  const rotateYDesktop = useTransform(
    mouseX,
    [0, window.innerWidth],
    [-10, 10],
  );
  const rotateZDesktop = useTransform(
    mouseX,
    [0, window.innerWidth],
    [-5, 5],
  );

  const rotateX = isMobile ? rotateXValue : rotateXDesktop;
  const rotateY = isMobile ? rotateYValue : rotateYDesktop;
  const rotateZ = isMobile ? rotateZValue : rotateZDesktop;

  // Opposite movement for character
  const characterXMobile = useTransform(
    mouseX,
    [0, window.innerWidth],
    [5 + 5, 5 - 5],
  );
  const characterYMobile = useTransform(
    mouseY,
    [0, window.innerHeight],
    [-9.2 + 5, -9.2 - 5],
  );

  const characterXDesktop = useTransform(
    mouseX,
    [0, window.innerWidth],
    [20, -20],
  );
  const characterYDesktop = useTransform(
    mouseY,
    [0, window.innerHeight],
    [20, -20],
  );

  const characterX = isMobile ? characterXMobile : characterXDesktop;
  const characterY = isMobile ? characterYMobile : characterYDesktop;

  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  const [titleSparkles, setTitleSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = [];
      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 2,
          delay: Math.random() * 2,
          duration: Math.random() * 1.5 + 1,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate sparkles for title
    const generateTitleSparkles = () => {
      const newSparkles = [];
      for (let i = 0; i < 25; i++) {
        newSparkles.push({
          id: Date.now() + i + 1000,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 3,
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 1,
        });
      }
      setTitleSparkles(newSparkles);
    };

    generateTitleSparkles();
    const interval = setInterval(generateTitleSparkles, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-8 px-8-400 py-12 md:py-0 py-65-mobile relative overflow-hidden">
      {/* Noise Texture */}
      <NoiseTexture />

      {/* Christmas Lights */}
      <ChristmasLights position="top" />

      <div className="max-w-5xl w-full relative z-10 mt-8 md:mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-[60px] md:space-y-12"
        >
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-[25px] md:space-y-8"
          >
            <div className="relative inline-block">
              <h1 className="text-[rgb(0,0,0)] leading-none font-bold text-[35px]-380 text-[42px]-380 text-[49px]-430 md:text-[90px] lg:text-[120px] lg:text-[150px] p-[0px] m-[0px]" style={{ fontWeight: 800 }}>
                НАКАНУНЩИК
              </h1>

              {/* Sparkles on title */}
              {titleSparkles.map((sparkle) => (
                <motion.div
                  key={sparkle.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.8, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: sparkle.duration,
                    delay: sparkle.delay,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width={sparkle.size * 3}
                    height={sparkle.size * 3}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                  >
                    <path
                      d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>

            <h2 className="text-black max-w-4xl mx-4 md:mx-[273px] leading-tight text-[20px] md:text-[30px] lg:text-[30px] my-0 md:my-[-42px] font-normal md:font-black">
              Сервис скоростного запуска email-проектов для
              директоров по маркетингу от KINETICA
            </h2>
          </motion.div>

          {/* Star burst decoration with character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center relative"
          >
            {/* Star with mouse tracking and sparkles */}
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                rotateZ,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <img
                src={starBurst}
                alt=""
                className="w-[364px] md:w-[450px] lg:w-[605px] h-auto m-[0px] mx-[0px] my-[8px] md:my-[17px]"
              />

              {/* Sparkles on star */}
              {sparkles.map((sparkle) => (
                <motion.div
                  key={sparkle.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: sparkle.duration,
                    delay: sparkle.delay,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width={sparkle.size * 3}
                    height={sparkle.size * 3}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,1)]"
                  >
                    <path
                      d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            <motion.img
              src={christmasCharacter}
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[169px] md:w-[220px] lg:w-[280px] h-auto"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                x: characterX,
                y: characterY,
              }}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SparkleButton
              onClick={nextSlide}
              className="text-[16px] md:text-[20px] px-8 md:px-12"
              textColor="text-white"
            >
              Расскажите 🎁
            </SparkleButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}