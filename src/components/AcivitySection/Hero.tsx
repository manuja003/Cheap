import React, { useEffect, useRef } from 'react';
import frontimg from "../../../src/images/activity.jpg"

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
    }
    if (subtitleRef.current) {
      setTimeout(() => {
        subtitleRef.current?.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
      }, 300);
    }
    if (imageRef.current) {
      setTimeout(() => {
        imageRef.current?.classList.add('opacity-100', 'scale-100', 'transition-all', 'duration-700');
      }, 600);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-50">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 pt-20 md:pt-0">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Experience the Wonder
            </span>
          </div>
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 opacity-0 translate-y-4"
          >
            Discover the Magic of <span className="text-primary">Sri Lanka</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg opacity-0 translate-y-4"
          >
            From pristine beaches to ancient ruins, lush tea plantations to wildlife safaris,
            explore the endless activities this island paradise has to offer.
          </p>
          <div className="flex space-x-4">
            <a
              href="#activities"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Activities
            </a>
            <a
              href="#destinations"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              View Destinations
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imageRef}
          className="md:w-1/2 mt-12 md:mt-0 opacity-0 scale-95"
        >
          <div className="relative w-full max-w-[700px] mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={frontimg}
                alt="Sri Lanka landscape"
                className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

        </div>

        {/* Scroll Indicator
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#activities" className="flex flex-col items-center text-gray-600">
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div> */}
        </div>
    </section>
  );
};

export default Hero;
