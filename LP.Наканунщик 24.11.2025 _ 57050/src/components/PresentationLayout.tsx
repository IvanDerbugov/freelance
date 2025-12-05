import { useState, useEffect, useCallback } from "react";
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

  const nextSlide = useCallback(() => {
    if (isMobile) {
      setCurrentSlide((prev) => {
        const nextIndex = prev < totalSlides - 1 ? prev + 1 : prev;
        setTimeout(() => {
          const nextSlideElement = document.querySelector(`[data-slide-index="${nextIndex}"]`);
          if (nextSlideElement) {
            nextSlideElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);
        return nextIndex;
      });
      return;
    }
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides, isMobile]);

  const prevSlide = useCallback(() => {
    if (isMobile) {
      setCurrentSlide((prev) => {
        const prevIndex = prev > 0 ? prev - 1 : prev;
        setTimeout(() => {
          const prevSlideElement = document.querySelector(`[data-slide-index="${prevIndex}"]`);
          if (prevSlideElement) {
            prevSlideElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);
        return prevIndex;
      });
      return;
    }
    setCurrentSlide((prev) => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, [isMobile]);

  const goToSlide = useCallback((index: number) => {
    if (isMobile) {
      setCurrentSlide(index);
      setTimeout(() => {
        const slideElement = document.querySelector(`[data-slide-index="${index}"]`);
        if (slideElement) {
          slideElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
      return;
    }
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [isMobile, currentSlide]);

  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    let wheelTimeout: NodeJS.Timeout | null = null;
    let lastWheelTime = 0;
    const WHEEL_THROTTLE = 250;
    const MIN_DELTA = 30;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      const deltaY = Math.abs(e.deltaY);
      
      if (deltaY < MIN_DELTA) {
        return;
      }

      if (now - lastWheelTime < WHEEL_THROTTLE) {
        return;
      }

      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }

      wheelTimeout = setTimeout(() => {
        lastWheelTime = now;
      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
      }, 30);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [isMobile, nextSlide, prevSlide]);

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

  // Track scroll position on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const slides = document.querySelectorAll('[data-slide-index]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const slideTop = rect.top + window.scrollY;
        const slideBottom = slideTop + rect.height;

        if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
          setCurrentSlide(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Mobile view: scrollable layout
  if (isMobile) {
    return (
      <PresentationContext.Provider value={{ nextSlide, prevSlide, goToSlide, currentSlide, totalSlides }}>
        <div 
          className="w-full min-h-screen overflow-y-auto"
          style={{
            backgroundImage: "url('figma:asset/31a4c938bf82d3af75e424e787c9c00e17f4033a.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {children.map((child, index) => (
            <div key={index} data-slide-index={index} className="min-h-screen w-full">
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
          backgroundImage: "url('figma:asset/31a4c938bf82d3af75e424e787c9c00e17f4033a.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
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
