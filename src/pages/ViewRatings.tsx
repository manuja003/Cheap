import { useState } from "react";

interface Rating {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

const ViewRatings = () => {
  // Mock data - replace with actual API call
  const [ratings] = useState<Rating[]>([
    {
      id: "1",
      bookingId: "B001",
      rating: 5,
      comment: "Amazing experience! The hotel was perfect and the activities were well organized.",
      userName: "John Doe",
      date: "2024-02-01"
    },
    {
      id: "2",
      bookingId: "B002",
      rating: 4,
      comment: "Great service and beautiful location. Would recommend!",
      userName: "Jane Smith",
      date: "2024-02-02"
    }
  ]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white animate-fade-in">Customer Reviews</h1>
        
        <div className="grid gap-6 max-w-4xl mx-auto">
          {ratings.map((rating) => (
            <div 
              key={rating.id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md animate-fade-in"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{rating.userName}</h3>
                  <p className="text-sm text-gray-600">Booking ID: {rating.bookingId}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < rating.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{rating.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(rating.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewRatings;