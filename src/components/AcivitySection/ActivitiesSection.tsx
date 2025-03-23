
import React, { useState, useEffect, useRef } from 'react';
import ActivityCard from './ActivityCard';
import { activitiesData } from '@/data/activitiesData';

const ActivitiesSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filteredActivities, setFilteredActivities] = useState(activitiesData);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const filters = ['All', 'Adventure', 'Cultural', 'Relaxation', 'Water Sports', 'Culinary', 'Wellness'];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredActivities(activitiesData);
    } else {
      setFilteredActivities(activitiesData.filter(activity => activity.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('animate-slide-up');
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
    <section id="activities" ref={sectionRef} className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Experience Sri Lanka
          </span>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-6">
            <p>Unforgettable</p> <span className="text-primary">Activities</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From thrilling adventures to cultural immersions, discover the diverse experiences
            Sri Lanka has to offer for every type of traveler.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredActivities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
