import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold text-primary">
              CheapChaser
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/destinations">Destinations</NavLink>
            <NavLink to="/activity">Activities</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            <a
              href="https://cheapchasertravel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Need Consultation?
            </a>

            {/* Login Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsAuthMenuOpen(!isAuthMenuOpen);
                  setIsSignUpMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
              >
                <LogIn size={20} />
              </button>


              {isAuthMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">Login as:</div>
                  <Link to="/login/traveler" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Traveler</Link>
                  <Link to="/login/guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Guide</Link>
                  <Link to="/login/activity-provider" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Activity Provider</Link>
                  <Link to="/login/hotel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hotel Owner</Link>
                </div>
              )}
            </div>

            {/* Sign Up Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSignUpMenuOpen(!isSignUpMenuOpen);
                  setIsAuthMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
              >
                <UserPlus size={20} />
              </button>

              {isSignUpMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">Sign Up as:</div>
                  <Link to="/signup/traveler" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Traveler</Link>
                  <Link to="/signup/guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Guide</Link>
                  <Link to="/signup/activity-provider" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Activity Provider</Link>
                  <Link to="/signup/hotel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hotel Owner</Link>
                </div>
              )}
            </div>

            <Link
              to="https://4c83-34-48-19-102.ngrok-free.app/"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Plan My Trip
            </Link>

            {/* Profile Icon */}
            <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
              <User size={20} />
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink to="/destinations">Destinations</MobileNavLink>
              <MobileNavLink to="/activity">Activities</MobileNavLink>
              <MobileNavLink to="/gallery">Gallery</MobileNavLink>
              <MobileNavLink to="/about">About Us</MobileNavLink>
              <MobileNavLink to="/contact">Contact</MobileNavLink>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-2 space-y-1">
                  <p className="px-3 py-2 text-sm font-medium text-gray-500">Login as:</p>
                  <MobileNavLink to="/login/traveler">Traveler</MobileNavLink>
                  <MobileNavLink to="/login/guide">Guide</MobileNavLink>
                  <MobileNavLink to="/login/activity-provider">Activity Provider</MobileNavLink>
                  <MobileNavLink to="/login/hotel">Hotel Owner</MobileNavLink>
                </div>
                <div className="px-2 space-y-1 mt-4">
                  <p className="px-3 py-2 text-sm font-medium text-gray-500">Sign Up as:</p>
                  <MobileNavLink to="/signup/traveler">Traveler</MobileNavLink>
                  <MobileNavLink to="/signup/guide">Guide</MobileNavLink>
                  <MobileNavLink to="/signup/activity-provider">Activity Provider</MobileNavLink>
                  <MobileNavLink to="/signup/hotel">Hotel Owner</MobileNavLink>
                </div>
              </div>
              <Link
                to="https://4c83-34-48-19-102.ngrok-free.app/"
                className="block w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors mt-4"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;