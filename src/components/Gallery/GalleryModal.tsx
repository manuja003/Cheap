import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: any;
  images: any[];
}

const GalleryModal = ({ isOpen, onClose, currentImage, images }: GalleryModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  useEffect(() => {
    console.log("Modal Open?", isOpen, "Current Image:", currentImage, "Images:", images);

    if (currentImage && images.length > 0) {
      const index = images.findIndex(img => img.id === currentImage.id);
      setImageIndex(index >= 0 ? index : 0);
    }
  }, [currentImage, images]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageIndex]);

  if (!isOpen || !images || images.length === 0 || imageIndex < 0) return null;

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setImageIndex((imageIndex - 1 + images.length) % images.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setImageIndex((imageIndex + 1) % images.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose}
      tabIndex={0}
    >
      <div 
        className="relative max-w-3xl w-full bg-white rounded-lg shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4 text-gray-100 bg-black/40 hover:bg-black/60 rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg">
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
          <img
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            className={cn(
              "w-full h-auto object-contain transition-all duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              isAnimating && direction === 'next' ? "animate-fade-in-right" : "",
              isAnimating && direction === 'prev' ? "animate-fade-in-left" : ""
            )}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black/40 hover:bg-black/60 rounded-full"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black/40 hover:bg-black/60 rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
