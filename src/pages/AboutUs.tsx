import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import pahandi from '../images/pahandi.jpg';
import malsha from '../images/malsha.jpg';
import manuja from '../images/manuja.jpg';
import sinega from '../images/sinega.jpg';
import kisara from '../images/kisara.jpg';
import naduni from '../images/naduni.jpg';


const AboutUs = () => {
  const teamMembers = [
    {
      name: "Thilakshi Wanigasekara",
      role: "Project Manager",
      image: malsha,
      description: "Experienced project manager ensuring smooth development and delivery of features."
    },
    {
      name: "Venuri Kisara",
      role: "Frontend Developer",
      image: kisara,
      description: "UI/UX specialist focused on creating intuitive and responsive user interfaces."
    },
    {
      name: "Sinega Rajendran",
      role: "Frontend Developer",
      image: sinega,
      description: "UI/UX specialist focused on creating intuitive and responsive user interfaces."
    },
    {
      name: "Naduni Peiris",
      role: "Backend Developer",
      image: naduni,
      description: "Database and API expert, Machine Learning, handling server-side operations and data management."
    },
    {
      name: "Pahandi Samarasinghe",
      role: "Backend Developer",
      image: pahandi,
      description: "Database and API expert,Machine Learning, handling server-side operations and data management."
    },
    {
      name: "Manuja Pinasara",
      role: "UX Designer",
      image: manuja,
      description: "Creative designer ensuring the best user experience through thoughtful design solutions."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About CheapChaser</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              CheapChaser is your ultimate companion for exploring the beautiful island of Sri Lanka. 
              Our platform connects travelers with local guides, authentic experiences, and carefully 
              curated itineraries to make your journey memorable and hassle-free.
            </p>
          </motion.div>

          {/* Team Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;