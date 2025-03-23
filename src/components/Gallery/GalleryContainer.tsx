import React, { useState } from 'react';
import GalleryItem from './GalleryItem';
import GalleryModal from './GalleryModal';
import { cn } from '@/lib/utils';
import img1 from '../../images/wild00.jpg';
import img5 from '../../images/wild00.jpg';
import img9 from '../../images/wild03.jpg';
import img13 from '../../images/wild01.jpg';
import img18 from '../../images/yala.jpg';
import img22 from '../../images/wild004.jpg';
import img26 from '../../images/wild.jpg';
import img2 from '../../images/form.jpg';
import img6 from '../../images/beach01.jpg';
import img10 from '../../images/beach02.jpg';
import img14 from '../../images/beach003.jpg';
import img19 from '../../images/beach04.webp';
import img23 from '../../images/beach05.jpg';
import img27 from '../../images/beach06.jpg';
import img3 from '../../images/tem00.jpg';
import img7 from '../../images/tem01.jpg';
import img11 from '../../images/tem02.jpg';
import img16 from '../../images/tem03.jpg';
import img24 from '../../images/tem04.jpg';
import img28 from '../../images/tem05.jpg';
import img29 from '../../images/tem06.jpg';
import img4 from '../../images/hike.jpg';
import img8 from '../../images/hike01.jpg';
import img12 from '../../images/hike02.webp';
import img17 from '../../images/hike03.jpg';
import img21 from '../../images/hike04.jpg';
import img25 from '../../images/hike05.jpg';
import img30 from '../../images/hike06.jpg';
import img31 from '../../images/div.jpg';
import img35 from '../../images/div01.webp';
import img39 from '../../images/div02.jpg';
import img51 from '../../images/div03.jpg';
import img52 from '../../images/div05.jpg';
import img32 from '../../images/cook.jpeg';
import img36 from '../../images/cook01.jpg';
import img40 from '../../images/cook02.jpg';
import img43 from '../../images/cook03.jpg';
import img46 from '../../images/cook04.jpg';
import img49 from '../../images/cook05.jpg';
import img33 from '../../images/train.jpg';
import img37 from '../../images/train01.jpg';
import img41 from '../../images/train02.webp';
import img44 from '../../images/train03.jpg';
import img47 from '../../images/train04.jpg';
import img53 from '../../images/train05.jpg';
import img34 from '../../images/ayu.webp';
import img38 from '../../images/ayu01.webp';
import img42 from '../../images/ayu02.jpg';
import img45 from '../../images/ayu03.webp';
import img48 from '../../images/ayu04.avif';
import img50 from '../../images/ayu05.png';
import img54 from '../../images/ayu06.jpg';

// Expanded gallery data with 50+ images
const galleryImages = [
  { id: 1, src: img1, alt: "Sri Lanka", width: 2432, height: 3648 },
  { id: 2, src: img2, alt: "Sri Lanka", width: 3880, height: 2586 },
  { id: 3, src: img3, alt: "Sri Lanka", width: 4480, height: 6720 },
  { id: 4, src: img4, alt: "Sri Lanka", width: 3857, height: 2571 },
  { id: 5, src: img5, alt: "Sri Lanka", width: 5616, height: 3744 },
  { id: 6, src: img6, alt: "Sri Lanka", width: 6240, height: 4160 },
  { id: 7, src: img7, alt: "Sri Lanka", width: 6000, height: 4000 },
  { id: 8, src: img8, alt: "Sri Lanka", width: 3456, height: 5184 },
  { id: 9, src: img9, alt: "Sri Lanka", width: 4330, height: 2886 },
  { id: 10, src: img10, alt: "Sri Lanka", width: 4501, height: 3001 },
  { id: 11, src: img11, alt: "Sri Lanka", width: 5304, height: 7952 },
  { id: 12, src: img12, alt: "Sri Lanka", width: 3456, height: 4320 },
  { id: 13, src: img13, alt: "Sri Lanka", width: 5472, height: 3648 },
  { id: 14, src: img14, alt: "Sri Lanka", width: 4256, height: 2832 },
  { id: 15, src: img16, alt: "Sri Lanka", width: 3648, height: 5472 },
  { id: 16, src: img17, alt: "Sri Lanka", width: 5616, height: 3744 },
  { id: 17, src: img18, alt: "Sri Lanka", width: 5184, height: 3456 },
  { id: 18, src: img19, alt: "Sri Lanka", width: 6000, height: 4000 },
  { id: 19, src: img21, alt: "Sri Lanka", width: 2448, height: 3264 },
  { id: 20, src: img22, alt: "Sri Lanka", width: 2048, height: 1365 },
  { id: 21, src: img23, alt: "Sri Lanka", width: 6016, height: 4016 },
  { id: 22, src: img24, alt: "Sri Lanka", width: 5297, height: 4393 },
  { id: 23, src: img25, alt: "Sri Lanka", width: 3840, height: 2160 },
  { id: 24, src: img26, alt: "Sri Lanka", width: 4256, height: 2832 },
  { id: 25, src: img27, alt: "Sri Lanka", width: 2268, height: 4032 },
  { id: 26, src: img28, alt: "Sri Lanka", width: 6000, height: 4000 },
  { id: 27, src: img29, alt: "Sri Lanka", width: 3264, height: 2176 },
  { id: 28, src: img30, alt: "Sri Lanka", width: 2048, height: 1365 },
  { id: 29, src: img31, alt: "Sri Lanka", width: 2500, height: 1667 },
  { id: 30, src: img32, alt: "Sri Lanka", width: 4256, height: 2832 },
  { id: 31, src: img33, alt: "Sri Lanka", width: 6016, height: 4016 },
  { id: 32, src: img34, alt: "Sri Lanka", width: 5456, height: 3632 },
  { id: 33, src: img35, alt: "Sri Lanka", width: 5472, height: 3648 },
  { id: 34, src: img36, alt: "Sri Lanka", width: 3648, height: 5472 },
  { id: 35, src: img37, alt: "Sri Lanka", width: 3560, height: 2912 },
  { id: 36, src: img38, alt: "Sri Lanka", width: 3872, height: 2589 },
  { id: 37, src: img39, alt: "Sri Lanka", width: 3819, height: 2546 },
  { id: 38, src: img40, alt: "Sri Lanka", width: 5184, height: 3456 },
  { id: 39, src: img41, alt: "Sri Lanka", width: 3456, height: 5184 },
  { id: 40, src: img42, alt: "Sri Lanka", width: 5760, height: 3840 },
  { id: 41, src: img43, alt: "Sri Lanka", width: 3456, height: 5184 },
  { id: 42, src: img44, alt: "Sri Lanka", width: 4608, height: 3072 },
  { id: 43, src: img45, alt: "Sri Lanka", width: 2000, height: 1333 },
  { id: 44, src: img46, alt: "Sri Lanka", width: 3840, height: 5760 },
  { id: 45, src: img47, alt: "Sri Lanka", width: 5472, height: 3648 },
  { id: 46, src: img48, alt: "Sri Lanka", width: 3264, height: 4896 },
  { id: 47, src: img49, alt: "Sri Lanka", width: 2268, height: 4032 },
  { id: 48, src: img50, alt: "Sri Lanka", width: 3840, height: 2160 },
  { id: 49, src: img51, alt: "Sri Lanka", width: 4501, height: 3001 },
  { id: 50, src: img52, alt: "Sri Lanka", width: 5304, height: 7952 },
  { id: 51, src: img53, alt: "Sri Lanka", width: 3866, height: 2174 },
  { id: 52, src: img54, alt: "Sri Lanka", width: 3456, height: 4320 },
];

interface GalleryContainerProps {
  className?: string;
}

const GalleryContainer = ({ className }: GalleryContainerProps) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: any) => {
    console.log("Opening modal for:", image);
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cn("w-full p-4", className)}>
      {/* ✅ Pinterest-Style Masonry Layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg border border-primary-300 break-inside-avoid transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-primary-500"

          >
            <GalleryItem image={image} onClick={openModal} />
          </div>
        ))}
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentImage={selectedImage}
        images={galleryImages}
      />
    </div>
  );
};

export default GalleryContainer;