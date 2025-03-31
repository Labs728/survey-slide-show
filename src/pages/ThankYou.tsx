
import React, { useEffect, useState } from 'react';
import SurveyHeader from '@/components/SurveyHeader';
import SurveyPreloader from '@/components/SurveyPreloader';

const ThankYou = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SurveyPreloader isLoading={loading} />
      
      <SurveyHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <img 
            src="/lovable-uploads/60a84dc7-867a-4d25-adb7-6c60de8e72cf.png" 
            alt="House" 
            className="w-40 h-40 mx-auto mb-4"
          />
          
          <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
          
          <p className="text-xl text-gray-700">
            Thanks for taking your time to answer our survey. Someone will be with you shortly.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
