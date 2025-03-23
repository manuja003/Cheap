import React from 'react';
import { cn } from '@/lib/utils';

interface GalleryHeaderProps {
  className?: string;
}

const GalleryHeader = ({ className }: GalleryHeaderProps) => {
  return (
    <header className={cn("w-full py-16 px-4 text-center bg-primary relative", className)}>
      

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary-foreground uppercase bg-secondary/40 rounded-full mb-4">
          Gallery
        </span>

        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
          CheapChaser Collection
        </h1>

        <p className="text-primary-foreground max-w-2xl mx-auto text-lg">
          A curated gallery showcasing the timeless beauty, depth, and tranquility of Sri Lanka.
        </p>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
    </header>
  );
};

export default GalleryHeader;
