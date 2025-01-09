import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  authorPhoto?: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={
                    review.authorPhoto ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.author}`
                  }
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.author}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mt-2">{review.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
