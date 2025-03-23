import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-gray-200 mb-6">Oops! Page not found</p>
          <a 
            href="/" 
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;