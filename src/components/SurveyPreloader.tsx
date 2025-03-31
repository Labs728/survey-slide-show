
import React from 'react';

interface SurveyPreloaderProps {
  isLoading: boolean;
}

const SurveyPreloader: React.FC<SurveyPreloaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="w-48 h-48 mb-10">
        <img 
          src="/lovable-uploads/60a84dc7-867a-4d25-adb7-6c60de8e72cf.png" 
          alt="House" 
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-3xl font-medium text-gray-800">Loading...</p>
    </div>
  );
};

export default SurveyPreloader;
