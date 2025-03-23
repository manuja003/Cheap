
import React, { useRef, useEffect } from 'react';

const destinations = [
  {
    id: 'kandy',
    name: 'Kandy',
    description: 'The cultural capital, home to the Temple of the Sacred Tooth Relic and surrounded by misty hills.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    description: 'An ancient rock fortress with frescoes and water gardens, often called the "Eighth Wonder of the World".',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
  },
  {
    id: 'galle',
    name: 'Galle',
    description: 'A historic fort city with Dutch colonial architecture, boutique shops, and picturesque beaches.',
    image: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed'
  }
];

const DestinationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('animate-slide-up');
          
          cardsRef.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
              }, 300 + index * 150);
            }
          });
          
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="destinations" 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Popular Places
          </span>
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-6 opacity-0 transform translate-y-8"
          >
            Top <span className="text-primary">Destinations</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore Sri Lanka's most captivating locations, each offering unique experiences 
            and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 relative rounded-2xl overflow-hidden group h-[500px] shadow-lg"
            >
              <div className="absolute inset-0">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="text-white text-2xl font-bold mb-3">{destination.name}</h3>
                <p className="text-white/90 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {destination.description}
                </p>
                <a
                  href={`#${destination.id}`}
                  className="inline-flex items-center gap-2 text-white bg-primary/80 backdrop-blur-sm hover:bg-primary px-5 py-2 rounded-full transition-colors"
                >
                  <span>Explore</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
