import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveFeedback } from "../lib/feedbackService"; // Import the saveFeedback function

interface FeedbackFormProps {
  onSubmit?: (feedback: {
    rating: number;
    country: string;
    age: string;
    comment: string;
  }) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !country || !age || !comment) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const feedbackData = {
      rating,
      country,
      age,
      comment,
      date: new Date().toISOString(), // Add the current date
    };

    try {
      // Save feedback to Firestore
      const docId = await saveFeedback(feedbackData);
      console.log("Feedback saved with ID:", docId);

      // Call the onSubmit prop if it exists
      if (onSubmit) {
        onSubmit(feedbackData);
      }

      // Clear the form after submission
      setRating(0);
      setCountry("");
      setAge("");
      setComment("");

      // Show success toast
      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error("Error saving feedback:", error);

      // Show error toast
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-lg space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="transition-transform hover:scale-110 focus:outline-none"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredStar || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter your country"
          className="bg-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age Range</Label>
        <select
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 rounded-md bg-white/50 border border-gray-200"
        >
          <option value="">Select age range</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45-54">45-54</option>
          <option value="55+">55+</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="bg-white/50 min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">
        Submit Feedback
      </Button>
    </form>
  );
};