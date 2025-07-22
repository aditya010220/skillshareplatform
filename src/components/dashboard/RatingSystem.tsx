
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RatingSystemProps {
  sessionId: string;
  partnerId: string;
  onRatingSubmitted?: () => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ 
  sessionId, 
  partnerId, 
  onRatingSubmitted 
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('ratings').insert({
        session_id: sessionId,
        rater_id: user.id,
        rated_id: partnerId,
        rating,
        feedback: feedback.trim() || null,
        is_public: isPublic
      });

      if (error) throw error;

      toast.success('Rating submitted successfully!');
      onRatingSubmitted?.();
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rate Your Experience</h2>
        <p className="text-gray-600">Help us improve the community by sharing your feedback</p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center space-x-2 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star
              className={`w-12 h-12 transition-colors ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>

      {rating > 0 && (
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg font-semibold text-gray-900">
            {rating === 5 && '⭐ Excellent!'}
            {rating === 4 && '👍 Great!'}
            {rating === 3 && '👌 Good!'}
            {rating === 2 && '🤔 Okay'}
            {rating === 1 && '😔 Poor'}
          </p>
        </motion.div>
      )}

      {/* Feedback Text Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Share your experience (optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What did you learn? How was the teaching? Any suggestions for improvement?"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          rows={4}
        />
      </div>

      {/* Privacy Toggle */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <span className="text-sm text-gray-600">Private</span>
        <motion.button
          onClick={() => setIsPublic(!isPublic)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isPublic ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
            animate={{ x: isPublic ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
        <span className="text-sm text-gray-600">Public</span>
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmitRating}
        disabled={rating === 0 || submitting}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all"
        whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
        whileTap={{ scale: rating > 0 ? 0.98 : 1 }}
      >
        {submitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </div>
        ) : (
          'Submit Rating'
        )}
      </motion.button>

      {/* Rating Guidelines */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Rating Guidelines
        </h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>⭐⭐⭐⭐⭐ - Exceptional experience, highly recommend</p>
          <p>⭐⭐⭐⭐ - Great session, learned a lot</p>
          <p>⭐⭐⭐ - Good session, met expectations</p>
          <p>⭐⭐ - Some issues, room for improvement</p>
          <p>⭐ - Poor experience, major issues</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RatingSystem;
