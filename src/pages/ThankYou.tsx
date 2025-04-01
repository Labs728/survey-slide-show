
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SurveyHeader from '@/components/SurveyHeader';
import SurveyPreloader from '@/components/SurveyPreloader';

interface ThankYouProps {
  logoSvgPath?: string;
  thankYouSvgPath?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ 
  logoSvgPath, 
  thankYouSvgPath 
}) => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show preloader for 1 second
    const preloaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Show content with a slight delay after preloader
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      
      // Show success toast
      toast.success('Thank you for completing our survey!', {
        duration: 5000,
      });
    }, 1200);
    
    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SurveyPreloader isLoading={loading} />
      
      <SurveyHeader logoSvgPath={logoSvgPath} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div 
          className={`max-w-md w-full text-center space-y-8 ${
            showContent ? 'animate-scale-in opacity-100' : 'opacity-0'
          } transition-all duration-500`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
            <div className="w-40 h-40 mx-auto mb-6 relative overflow-hidden rounded-full border-4 border-survey-red bg-gray-50 flex items-center justify-center">
              {thankYouSvgPath ? (
                <img 
                  src={thankYouSvgPath} 
                  alt="Thank You" 
                  className="w-full h-full object-contain animate-fade-in" 
                />
              ) : (
                <div className="text-gray-400 text-center text-sm p-4">
                  <p>Add your SVG here</p>
                  <p className="text-xs mt-2">thankYouSvgPath prop</p>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              Thanks for taking your time to answer our survey. Someone will be with you shortly.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-sm text-gray-600">
                A confirmation has been sent to your email address. Our team will review your information and contact you within 24-48 hours.
              </p>
            </div>
            
            <div className="animate-fade-in mt-8" style={{ animationDelay: '800ms' }}>
              <a 
                href="/" 
                className="inline-block px-8 py-3 bg-survey-red text-white rounded-full font-medium transition-all hover:bg-red-700 hover:shadow-lg"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
