
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface SurveyPreloaderProps {
  isLoading: boolean;
}

const SurveyPreloader: React.FC<SurveyPreloaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setProgress(66);
      
      const finalTimer = setTimeout(() => {
        setProgress(100);
      }, 700);
      
      return () => clearTimeout(finalTimer);
    }, 700);
    
    return () => clearTimeout(timer);
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="w-48 h-48 mb-10">
        <img 
          src="/lovable-uploads/5bb5bae0-0907-41a0-9436-99588a03e4a7.png" 
          alt="House" 
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-3xl font-medium text-gray-800 mb-8">Loading...</p>
      <div className="w-full max-w-md px-8">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default SurveyPreloader;
