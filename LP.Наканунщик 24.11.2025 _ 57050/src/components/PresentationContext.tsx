import { createContext, useContext } from 'react';

interface PresentationContextType {
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  currentSlide: number;
  totalSlides: number;
}

export const PresentationContext = createContext<PresentationContextType | null>(null);

export function usePresentationContext() {
  const context = useContext(PresentationContext);
  if (!context) {
    console.error('usePresentationContext must be used within PresentationLayout');
    return {
      nextSlide: () => console.warn('nextSlide called but context not available'),
      prevSlide: () => console.warn('prevSlide called but context not available'),
      goToSlide: () => console.warn('goToSlide called but context not available'),
      currentSlide: 0,
      totalSlides: 0,
    };
  }
  return context;
}
