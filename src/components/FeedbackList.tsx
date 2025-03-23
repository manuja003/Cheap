
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface Feedback {
  id: number;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export const FeedbackList = ({ feedbacks: initialFeedbacks }: FeedbackListProps) => {
  const [countryFilter, setCountryFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const filteredFeedbacks = initialFeedbacks.filter((feedback) => {
    const matchesCountry = countryFilter
      ? feedback.country.toLowerCase().includes(countryFilter.toLowerCase())
      : true;
    const matchesAge = ageFilter ? feedback.age === ageFilter : true;
    const matchesRating = ratingFilter
      ? feedback.rating === parseInt(ratingFilter)
      : true;
    return matchesCountry && matchesAge && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Filter Feedbacks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="countryFilter">Country</Label>
            <Input
              id="countryFilter"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              placeholder="Filter by country"
              className="bg-white/50"
            />
          </div>
          <div>
            <Label htmlFor="ageFilter">Age Range</Label>
            <select
              id="ageFilter"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full p-2 rounded-md bg-white/50 border border-gray-200"
            >
              <option value="">All ages</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55+">55+</option>
            </select>
          </div>
          <div>
            <Label htmlFor="ratingFilter">Rating</Label>
            <select
              id="ratingFilter"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full p-2 rounded-md bg-white/50 border border-gray-200"
            >
              <option value="">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
        </div>
      </div>

      <div className="feedback-grid">
        {filteredFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="glass-card p-6 rounded-lg space-y-4 fade-in"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= feedback.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{feedback.date}</span>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 text-sm text-gray-600">
                <span>{feedback.country}</span>
                <span>•</span>
                <span>{feedback.age}</span>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
