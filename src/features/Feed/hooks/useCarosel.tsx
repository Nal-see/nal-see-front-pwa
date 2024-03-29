// useCarousel.ts
import { useState, useEffect } from 'react';
import { CarouselApi } from '@/components/ui/carousel';

const useCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slideCount, setSlideCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    currentSlide,
    slideCount,
    setApi,
  };
};

export default useCarousel;
