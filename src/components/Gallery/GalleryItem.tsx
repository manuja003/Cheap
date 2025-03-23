import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GalleryItemProps {
  image: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  onClick: (image: any) => void;
  className?: string;
}

const GalleryItem = ({ image, onClick, className }: GalleryItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-300 h-full w-full",
        "shadow-sm hover:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-blue-50 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className={cn(
          "h-full w-full object-cover transition-all duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          isHovered ? "scale-105" : "scale-100"
        )}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Overlay Effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )} />

      {/* Caption */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300",
        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}>
        <p className="font-medium">{image.alt}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
