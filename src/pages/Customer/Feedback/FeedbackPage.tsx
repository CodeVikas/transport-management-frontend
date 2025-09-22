import React, { useState } from "react";
import { Star, Send, Smile, Frown, Meh } from "lucide-react";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Feedback Matters!</h2>
          <p className="mt-2 text-gray-600">
            Help us improve by sharing your experience.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`p-2 rounded-full ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-2 space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Frown size={16} />
                  <span>Poor</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Meh size={16} />
                  <span>Average</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Smile size={16} />
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            {/* Feedback Textarea */}
            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your experience..."
                required
              />
            </div>

            {/* Name and Email Fields */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Send size={18} className="mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        ) : (
          // Success Message
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Thank You for Your Feedback!
            </h3>
            <p className="text-gray-600">
              We appreciate your time and will use your feedback to improve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
