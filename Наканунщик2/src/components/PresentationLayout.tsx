import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Circle } from "lucide-react";
import { PresentationContext } from "./PresentationContext";

interface PresentationLayoutProps {
  children: React.ReactNode[];
}

export function PresentationLayout({ children }: PresentationLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const totalSlides = children.length;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Only enable presentation navigation on desktop
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIsScrolling(true);
        nextSlide();
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setIsScrolling(true);
        prevSlide();
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      if (Math.abs(e.deltaY) > 10) {
        setIsScrolling(true);
        
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSlide, isMobile, isScrolling]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Mobile view: scrollable layout
  if (isMobile) {
    return (
      <PresentationContext.Provider value={{ nextSlide, prevSlide, goToSlide, currentSlide, totalSlides }}>
        <div 
          className="w-full min-h-screen overflow-y-auto"
          style={{
            backgroundColor: '#d4ff00',
            backgroundImage: 'none'
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="min-h-screen w-full">
              {child}
            </div>
          ))}
        </div>
      </PresentationContext.Provider>
    );
  }

  // Desktop view: presentation mode
  return (
    <PresentationContext.Provider value={{ nextSlide, prevSlide, goToSlide, currentSlide, totalSlides }}>
      <div 
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundColor: '#d4ff00',
          backgroundImage: 'none'
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {children[currentSlide]}
          </motion.div>
        </AnimatePresence>

      {/* Slide indicators */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-black transition-all ${
                index === currentSlide
                  ? "bg-[#cc0000] scale-125"
                  : "bg-white hover:bg-[#ffcc00]"
              }`}
            />
          </button>
        ))}
      </div>


      </div>
    </PresentationContext.Provider>
  );
}