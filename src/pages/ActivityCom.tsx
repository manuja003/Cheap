import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/AcivitySection/Hero';
import ActivitiesSection from '@/components/AcivitySection/ActivitiesSection';
import DestinationsSection from '@/components/AcivitySection/DestinationsSection';
import GallerySection from '@/components/AcivitySection/GallerySection';
import ContactSection from '@/components/AcivitySection/ContactSection';
import Footer from '@/components/Footer';

const ActivityCom = () => {
  useEffect(() => {
    // Fade-in animation for sections as they come into view
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      document.querySelectorAll('.fade-in-section').forEach((element) => {
        observer.observe(element);
      });
    };

    // Parallax scroll effect
    const parallaxElements = document.querySelectorAll('.parallax-scroll');
    const handleParallaxScroll = () => {
      parallaxElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const offset = elementTop / windowHeight;
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${offset * 50}px)`;
        }
      });
    };

    observeElements();
    window.addEventListener('scroll', handleParallaxScroll);

    return () => {
      window.removeEventListener('scroll', handleParallaxScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <ActivitiesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default ActivityCom;
