
import React from 'react';
import { PhoneCall } from 'lucide-react';

const SurveyHeader = () => {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/06f1ae34-1347-4c18-b83e-1a1565b1e48a.png" 
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
