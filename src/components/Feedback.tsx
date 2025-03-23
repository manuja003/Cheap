import { Link } from 'react-router-dom';

const Feedback = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Feedbacks & Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find and read the perfect feedback and reviews for your Sri Lankan adventure.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            to="/feedback"
            className="inline-block bg-[#2a9d8f] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#2a9d8f]/90 transition-colors"
          >
            Browse Feedbacks & Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
