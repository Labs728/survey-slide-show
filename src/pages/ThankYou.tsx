
import React from 'react';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 mx-auto mb-6 bg-survey-red rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thanks for taking your time to answer our survey, someone will be with you shortly.
        </p>
        <div className="w-24 h-1 bg-survey-red mx-auto rounded-full"></div>
      </div>
    </div>
  );
};

export default ThankYou;
