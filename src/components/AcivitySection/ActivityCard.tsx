import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface ActivityProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

interface ActivityCardProps {
  activity: ActivityProps;
  index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use a single observer instance
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '100px', // Load earlier before it appears
      threshold: 0, // Triggers when it first appears
    });

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <Link to={`/activity/${activity.id}`} className="block h-full">
      <div
        ref={cardRef}
        className={cn(
          'activity-card h-full bg-white rounded-2xl overflow-hidden transition-all duration-700 fade-in-section hover:shadow-md',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        style={{ transitionDelay: `${index * 50}ms` }} // Reduce delay for smoother transition
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={activity.image}
            alt={activity.title}
            loading="lazy" // Lazy loading for better performance
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              {activity.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <p className="text-white text-xs mb-1">{activity.location}</p>
            <h3 className="text-white text-xl font-semibold">{activity.title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
          <div className="mt-6 flex justify-between items-center">
            <span className="text-primary font-medium text-sm flex items-center gap-1 group">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </span>
            <button 
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={(e) => e.preventDefault()} // Prevent navigation
            >
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
