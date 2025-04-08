import FeedbackForm from "@/components/feedback/FeedbackForm";
import Navbar from "@/components/Navbar";

const Feedback = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        {/* Background Image with Overlay */}
        <div 
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
          <div className="bg-white/90 rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Share Your Experience</h1>
            <div className="max-w-2xl mx-auto">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;