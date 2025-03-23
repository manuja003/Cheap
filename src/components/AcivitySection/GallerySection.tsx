import React, { useRef, useEffect } from 'react';
import safari from '../../images/wild004.jpg';
import wild02 from '../../images/wild00.jpg';
import wild07 from '../../images/wild.jpg';
import beach from '../../images/form.jpg';
import temp from '../../images/tem00.jpg';
import temp01 from '../../images/tem01.jpg';
import hike from '../../images/hike.jpg';
import dive from '../../images/div.jpg';
import dive01 from '../../images/div01.webp';
import dive02 from '../../images/div02.jpg';
import dive03 from '../../images/div03.jpg';
import dive04 from '../../images/div04.jpg';
import dive05 from '../../images/div05.jpg';
import dive06 from '../../images/div06.jpg';
import cook from '../../images/cook.jpeg';
import cook06 from '../../images/cook06.jpg';
import train05 from '../../images/train05.jpg';
import train06 from '../../images/train06.jpg';
import Ayrweda05 from '../../images/ayu05.png';
import Ayrweda06 from '../../images/ayu06.jpg';


const images = [
  { url: safari, alt: 'Wild Safari in Sri Lanka', size: 'large' },
  { url: wild02, alt: 'Wildlife in Sri Lanka', size: 'small' },
  { url: wild07, alt: 'Elephants in the wild', size: 'small' },
  { url: beach, alt: 'Beach in Sri Lanka', size: 'small' },
  { url: temp, alt: 'Ancient Temple', size: 'small' },
  { url: temp01, alt: 'Historical Buddhist Temple', size: 'large' },
  { url: hike, alt: 'Hiking in Sri Lanka', size: 'small' },
  { url: dive, alt: 'Diving Adventure', size: 'small' },
  { url: dive01, alt: 'Underwater Exploration', size: 'small' },
  { url: dive02, alt: 'Scuba Diving', size: 'large' },
  { url: dive03, alt: 'Coral Reefs', size: 'small' },
  { url: dive04, alt: 'Underwater Biodiversity', size: 'small' },
  { url: dive05, alt: 'Diving into the Deep', size: 'small' },
  { url: dive06, alt: 'Ocean Dive', size: 'small' },
  { url: cook, alt: 'Cooking Sri Lankan Cuisine', size: 'small' },
  { url: cook06, alt: 'Sri Lankan Traditional Food', size: 'small' },
  { url: train05, alt: 'Scenic Train Ride', size: 'large' },
  { url: train06, alt: 'Train through Tea Plantations', size: 'small' },
  { url: Ayrweda05, alt: 'Ayurveda Therapy', size: 'small' },
  { url: Ayrweda06, alt: 'Traditional Ayurvedic Treatment', size: 'large' }
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('animate-slide-up', 'opacity-100');
          galleryRef.current?.classList.add('animate-fade-in', 'opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Visual Journey
          </span>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-6 opacity-0 transition-transform duration-700">
            Sri Lanka <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual showcase of Sri Lanka's breathtaking landscapes, vibrant culture,
            and unforgettable experiences.
          </p>
        </div>

        {/* Image Grid */}
        <div 
  ref={galleryRef}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px] opacity-0 transition-opacity duration-700"
>
  {images.map((image, index) => (
    <div 
      key={index}
      className={`relative rounded-xl overflow-hidden shadow-md transition-all duration-700`}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-900" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>
    </div>
  ))}
</div>


        {/* View All Button */}
        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
            <span>View all photos</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
