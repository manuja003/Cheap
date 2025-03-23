import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const DirectBooking = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Book Directly with Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and book the perfect accommodation or activity for your Sri Lankan adventure.
          </p>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/bookings')}
            className="bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white px-8 py-6 rounded-lg text-lg"
          >
            Browse Hotels & Activities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DirectBooking;
