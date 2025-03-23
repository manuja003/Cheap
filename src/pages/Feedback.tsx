import FeedbackForm from "@/components/feedback/FeedbackForm";

const Feedback = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white animate-fade-in">Share Your Experience</h1>
        <div className="max-w-2xl mx-auto">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default Feedback;