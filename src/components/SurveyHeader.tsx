
import React from 'react';
import { PhoneCall } from 'lucide-react';

const SurveyHeader = () => {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/ef5c3412-e2af-4e8a-a7e4-fc724e2a7542.png" 
          alt="Rocket Mortgage Logo" 
          className="h-8" 
        />
      </div>
      <a href="tel:+1234567890" className="text-gray-700">
        <PhoneCall className="w-6 h-6" />
      </a>
    </header>
  );
};

export default SurveyHeader;
