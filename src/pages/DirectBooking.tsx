// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const DirectBooking = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path: string) => {
//     console.log(`Navigating to: ${path}`);
//     navigate(path);
//   };

//   return (
//     <div className="min-h-screen relative">
//       {/* Background Image with Overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-8 text-white">Welcome to Cheap Chaser</h1>
        
//         <div className="flex flex-col gap-6 max-w-6xl mx-auto">
//           {/* First Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { title: "Book Now", path: "/bookings", description: "Start planning your next adventure" },
//               { title: "View History", path: "/booking-history", description: "Check your past bookings" },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-opacity-20 transition-all duration-300"
//               >
//                 <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
//                 <p className="mb-4 text-gray-200">{item.description}</p>
//                 <Button
//                   onClick={() => handleNavigation(item.path)}
//                   className="w-full bg-[#2a9d8f] hover:bg-[#2a9d8f] text-white transition-colors"
//                 >
//                   {item.title}
//                 </Button>
//               </div>
//             ))}
//           </div>

//           {/* Second Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { title: "Leave Feedback", path: "/feedback", description: "Share your experience" },
//               { title: "View Ratings", path: "/ratings", description: "See what others are saying" }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-opacity-20 transition-all duration-300"
//               >
//                 <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
//                 <p className="mb-4 text-gray-200">{item.description}</p>
//                 <Button
//                   onClick={() => handleNavigation(item.path)}
//                   className="w-full bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white transition-colors"
//                 >
//                   {item.title}
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectBooking;