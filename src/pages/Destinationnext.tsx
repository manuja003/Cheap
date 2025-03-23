import { useState } from "react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Galle Fort",
    location: "Galle",
    description: "UNESCO World Heritage site with colonial architecture and ocean views.",
    image: "https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg",
    category: "Historical"
  },
  {
    id: 2,
    name: "Mirissa Beach",
    location: "Matara",
    description: "Pristine beaches and prime whale watching destination.",
    image: "https://images.squarespace-cdn.com/content/v1/596b2969d2b85786e6892853/1531738844396-H040L4I7S80ZGQV196K4/DJI_0780.jpg?format=1500",
    category: "Beaches"
  },
  {
    id: 3,
    name: "Yala National Park",
    location: "Hambantota",
    description: "Famous wildlife sanctuary with leopards, elephants and diverse bird species.",
    image: "https://adventuresnolimits.com/wp-content/uploads/2023/05/Yala_National_Park_Sri_Lanka_2012-przerobione.jpg",
    category: "Wildlife"
  },
  {
    id: 4,
    name: "Unawatuna Beach",
    location: "Galle",
    description: "Horseshoe-shaped bay with coral reefs and clear waters perfect for snorkeling.",
    image: "https://www.travelmapsrilanka.com/destinations/destinationimages/unawatuna-beach-sri-lanka.jpg",
    category: "Beaches"
  },
  {
    id: 5,
    name: "Tangalle Beach",
    location: "Hambantota",
    description: "Quiet stretch of golden sand beach with turquoise waters.",
    image: "https://insightresortsrilanka.com/wp-content/uploads/2023/10/free-photo-of-tangalle-beach-sri-lanka-drone-view.webp",
    category: "Beaches"
  },
  {
    id: 6,
    name: "Kataragama Temple",
    location: "Hambantota",
    description: "A sacred pilgrimage site for Buddhists, Hindus, and Muslims.",
    image: "https://live.staticflickr.com/4727/39269836121_39932188e0_b.jpg",
    category: "Historical"
  },
  {
    id: 7,
    name: "Bundala National Park",
    location: "Hambantota",
    description: "Important bird sanctuary and wetland ecosystem.",
    image: "https://d2r2v0jxjsbm0p.cloudfront.net/2020/12/bundala-100-2.jpg",
    category: "Wildlife"
  },
  {
    id: 8,
    name: "Weligama Bay",
    location: "Matara",
    description: "Popular surfing destination with gentle waves perfect for beginners.",
    image: "https://duqjpivknq39s.cloudfront.net/2018/12/Mob2.jpg",
    category: "Beaches"
  },
  {
    id: 9,
    name: "Jungle Beach",
    location: "Galle",
    description: "Hidden gem with lush jungle surroundings and clear waters.",
    image: "https://wheretoflow.com/wp-content/uploads/2023/02/jungle-beach-unawatuna-00-1024x768.webp",
    category: "Beaches"
  },
  {
    id: 10,
    name: "Sinharaja Forest Reserve",
    location: "Galle",
    description: "A UNESCO-listed rainforest with rich biodiversity.",
    image: "https://theportuguesetraveler.com/wp-content/uploads/2024/11/waterfall-sinharaja-forest-reserve-rainforest-sri-lanka-9.jpg",
    category: "Wildlife"
  },
  {
    id: 11,
    name: "Blow Hole (Hummanaya)",
    location: "Matara",
    description: "The second-largest blowhole in the world, near Dickwella.",
    image: "https://www.lovesrilanka.org/wp-content/uploads/2020/06/LSL_B2_Hummanaya-Blow-Hole_800x1000.jpg",
    category: "Adventure"
  },
  {
    id: 12,
    name: "Kanneliya Forest Reserve",
    location: "galle",
    description: "A great spot for trekking and nature lovers.",
    image: "https://www.srilankadaytours.com/wp-content/uploads/2024/04/2-12.jpg",
    category: "Adventure"
  },
  {
    id: 13,
    name: "Stilt Fishing in Weligama",
    location: "Matara",
    description: "A traditional fishing method seen along the coast.",
    image: "https://ic.pics.livejournal.com/pushpitha/50334853/1607745/1607745_original.jpg",
    category: "Adventure"
  },
  {
    id: 14,
    name: "Hiriketiya Beach",
    location: "Matara",
    description: "A horseshoe-shaped bay with excellent surf waves.",
    image: "https://travelmadmum.com/wp-content/uploads/2023/07/Hiriketiya-Beach-8-scaled.jpg",
    category: "Beaches"
  },
  {
    id: 15,
    name: "Galle Maritime Museum",
    location: "Galle",
    description: "Displays artifacts from ancient trade routes and shipwrecks.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/be/91/39/interior.jpg?w=1200&h=-1&s=1",
    category: "Historical"
  }
];

const DestinationCard = ({ destination, index }: { destination: typeof destinations[0], index: number }) => {
  return (
    <motion.div 
      className="destination-card h-[400px] relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <img 
        src={destination.image} 
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="content absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 text-primary rounded-full mb-2">
          {destination.category}
        </span>
        <h3 className="text-xl font-medium text-white mb-1">{destination.name}</h3>
        <div className="flex items-center text-white/90 text-sm mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {destination.location}
        </div>
        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{destination.description}</p>
      </div>
    </motion.div>
  );
};

const FilterButton = ({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive 
          ? "bg-teal-600 text-primary-foreground" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Destinations = () => {
  const [filter, setFilter] = useState("All");
  
  const filteredDestinations = filter === "All" 
    ? destinations 
    : destinations.filter(dest => dest.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Explore Southern Sri Lanka
            </h1>
            <p className="text-muted-foreground text-lg">
            Embark on an unforgettable journey through Southern Sri Lanka, where golden beaches meet turquoise waters, ancient temples whisper tales of history, and lush national parks offer breathtaking encounters with wildlife. From the colonial charm of Galle Fort to the serene beauty of Tangalle and the adventure-filled safaris of Yala, this region is a perfect blend of relaxation, culture, and exploration. Whether you're surfing in Hiriketiya, whale watching in Mirissa, or indulging in the rich flavors of Sri Lankan cuisine, every moment in Southern Sri Lanka is a treasure waiting to be discovered.
            </p>
          </motion.div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <FilterButton 
            isActive={filter === "All"} 
            onClick={() => setFilter("All")}
          >
            All
          </FilterButton>
          <FilterButton 
            isActive={filter === "Beaches"} 
            onClick={() => setFilter("Beaches")}
          >
            Beaches
          </FilterButton>
          <FilterButton 
            isActive={filter === "Historical"} 
            onClick={() => setFilter("Historical")}
          >
            Historical
          </FilterButton>
          <FilterButton 
            isActive={filter === "Wildlife"} 
            onClick={() => setFilter("Wildlife")}
          >
            Wildlife
          </FilterButton>
          <FilterButton 
            isActive={filter === "Adventure"} 
            onClick={() => setFilter("Adventure")}
          >
            Adventure & Unique Experiences
          </FilterButton>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredDestinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Destinations;
