import React from 'react';
import GalleryHeader from '@/components/Gallery/GalleryHeader';
import GalleryContainer from '@/components/Gallery/GalleryContainer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GalleryCom = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-background">
        <Navbar/>
      <GalleryHeader />
      <div className="w-full max-w-[1600px] px-4 pb-16">
        <GalleryContainer />
      </div>
      <Footer/>
    </main>
  );
};

export default GalleryCom;
