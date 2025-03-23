import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/DestinationLayout";

const featuredDestinations = [
  {
    id: 1,
    name: "Galle Fort",
    location: "Galle",
    description: "UNESCO World Heritage site with colonial architecture and ocean views.",
    image: "https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg",
  },
  {
    id: 2,
    name: "Mirissa Beach",
    location: "Matara",
    description: "Pristine beaches and prime whale watching destination.",
    image: "https://images.squarespace-cdn.com/content/v1/596b2969d2b85786e6892853/1531738844396-H040L4I7S80ZGQV196K4/DJI_0780.jpg?format=1500",
  },
  {
    id: 3,
    name: "Yala National Park",
    location: "Hambantota",
    description: "Famous wildlife sanctuary with leopards, elephants and diverse bird species.",
    image: "https://adventuresnolimits.com/wp-content/uploads/2023/05/Yala_National_Park_Sri_Lanka_2012-przerobione.jpg",
  }
];

const Index = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const y = useTransform(scrollY, [0, 400], [0, -100]);

  return (
    <Layout>
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/45/a4/71/jungle-beach.jpg?w=1200&h=700&s=1)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <motion.div 
          ref={headerRef}
          className="relative z-10 text-center px-4"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              Explore Southern <br />
              <span className="font-medium">Sri Lanka</span>
            </h1>
            <p className="text-white/90 max-w-xl mx-auto text-lg md:text-xl mb-8">
              Discover the charm and beauty of Galle, Matara, and Hambantota
            </p>
            <NavLink 
              to="/nextDestinations" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg font-medium transition-all duration-300 hover:bg-white/90 transform hover:-translate-y-1"
            >
              Explore Destinations
              <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </NavLink>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="section-title">Featured Destinations</h2>
              <p className="section-subtitle">
                Explore our handpicked selection of the most breathtaking locations in southern Sri Lanka
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDestinations.map((destination, index) => (
              <motion.div 
                key={destination.id}
                className="destination-card h-[400px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="content w-full">
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
            ))}
          </div>

          <div className="text-center mt-12">
            <NavLink 
              to="/nextDestinations" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 transform hover:-translate-y-1"
            >
              View All Destinations
              <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="section-title mb-4">Why Visit Southern Sri Lanka?</h2>
                <p className="text-muted-foreground mb-6">
                  The southern provinces of Sri Lanka offer a perfect blend of history, nature, and culture. From the colonial charm of Galle to the pristine beaches of Matara and the wildlife wonders of Hambantota, this region promises unforgettable experiences.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Rich Cultural Heritage</h3>
                      <p className="text-muted-foreground">Explore historic forts, temples, and colonial architecture that tell the story of Sri Lanka's diverse past.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Pristine Beaches</h3>
                      <p className="text-muted-foreground">Relax on golden beaches with crystal-clear waters, perfect for swimming, surfing, and snorkeling.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Incredible Wildlife</h3>
                      <p className="text-muted-foreground">Encounter leopards, elephants, and diverse bird species in national parks and wildlife sanctuaries.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="h-[250px] rounded-lg overflow-hidden">
                <img 
                  src="https://www.yogawinetravel.com/wp-content/uploads/2019/01/Blue-Beach-Island-Nilwella-Sri-Lanka-drone-photo-2.jpeg" 
                  alt="Sri Lankan beach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] rounded-lg overflow-hidden translate-y-8">
                <img 
                  src="https://t3.ftcdn.net/jpg/04/93/46/70/360_F_493467077_vysZE2etYccPjinpTFzwYkJh2sJ6RC3K.jpg" 
                  alt="Sri Lankan culture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[250px] rounded-lg overflow-hidden translate-y-4">
                <img 
                  src="https://media.istockphoto.com/id/505221662/photo/elephants-in-river.jpg?s=612x612&w=0&k=20&c=pd0-eIKu1knUVrwVJRqfIK8t_aFqSk6vnxnuZLFGvh4=" 
                  alt="Sri Lankan wildlife"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[250px] rounded-lg overflow-hidden">
                <img 
                  src="https://media.istockphoto.com/id/1288609237/photo/spectacular-view-of-the-lion-rock-surrounded-by-green-rich-vegetation-picture-taken-from.jpg?s=612x612&w=0&k=20&c=Rkmk3T6SxqzMPyIOcSkeTLrMlb6aHo3gaQpqCrxBeZM=" 
                  alt="Sri Lankan landmark"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
