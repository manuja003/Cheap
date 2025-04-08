import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackList } from "@/components/FeedbackList";
import Navbar from "@/components/Navbar";

interface Feedback {
  id: number;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

const Index = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      rating: 5,
      country: "United States",
      age: "25-34",
      comment: "Amazing experience! The tour guide was very knowledgeable and friendly.",
      date: "2024-02-20",
    },
    {
      id: 2,
      rating: 4,
      country: "UK",
      age: "35-44",
      comment: "Great service, but could improve the transportation arrangements.",
      date: "2024-02-19",
    },
  ]);

  const handleSubmitFeedback = (newFeedback: {
    rating: number;
    country: string;
    age: string;
    comment: string;
  }) => {
    const feedback: Feedback = {
      id: feedbacks.length + 1,
      ...newFeedback,
      date: new Date().toISOString().split('T')[0],
    };
    setFeedbacks([feedback, ...feedbacks]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        {/* Full page background with overlay */}
        <div 
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-16">
          <div className="hero-section">
            <div className="container mx-auto px-4 py-20 text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
                Share Your Journey
              </h1>
              <p className="text-xl md:text-2xl mb-8 fade-in">
                Help others plan their perfect trip with your valuable feedback
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/90 rounded-lg shadow-xl p-8 mb-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Submit Your Feedback</h2>
                  <p className="text-gray-600">
                    Your feedback helps us improve and helps other travelers make better decisions
                  </p>
                </div>

                <div className="mb-16">
                  <FeedbackForm onSubmit={handleSubmitFeedback} />
                </div>
              </div>

              <div className="bg-white/90 rounded-lg shadow-xl p-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Recent Feedback</h2>
                  <p className="text-gray-600">
                    See what other travelers are saying about their experiences
                  </p>
                </div>

                <FeedbackList feedbacks={feedbacks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;