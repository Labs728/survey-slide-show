
import React from 'react';

interface SurveyHeaderProps {
  logoSvgPath?: string;
}

const SurveyHeader = ({ logoSvgPath }: SurveyHeaderProps) => {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        {logoSvgPath ? (
          <img 
            src={logoSvgPath} 
            alt="Company Logo" 
            className="h-8" 
          />
        ) : (
          <svg 
            width="160" 
            height="50" 
            viewBox="0 0 420 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-8"
          >
            {/* Rocket Circle */}
            <path 
              d="M65 110C92.6142 110 115 87.6142 115 60C115 32.3858 92.6142 10 65 10C37.3858 10 15 32.3858 15 60C15 87.6142 37.3858 110 65 110Z" 
              fill="white" 
              stroke="#E03642" 
              strokeWidth="20"
            />
            <path 
              d="M65 30C65 30 80 45 80 60C80 75 65 90 65 90" 
              stroke="#E03642" 
              strokeWidth="20" 
              strokeLinecap="round"
            />
            
            {/* Text "Rocket" */}
            <path 
              d="M140 40H160C172 40 180 48 180 60C180 72 172 80 160 80H140V40Z" 
              fill="#E03642"
            />
            <path 
              d="M140 60H160" 
              stroke="white" 
              strokeWidth="3"
            />
            <path 
              d="M190 40V80H200C212 80 220 72 220 60C220 48 212 40 200 40H190Z" 
              fill="#E03642"
            />
            <circle 
              cx="205" 
              cy="60" 
              r="10" 
              fill="white"
            />
            <path 
              d="M230 40H250V80H230V40Z" 
              fill="#E03642"
            />
            <path 
              d="M260 40H280V60H270V80H260V40Z" 
              fill="#E03642"
            />
            <path 
              d="M290 40H320V50H300V55H315V65H300V70H320V80H290V40Z" 
              fill="#E03642"
            />
            <path 
              d="M330 40H350L360 70H370L380 40H400L380 80H350L330 40Z" 
              fill="#E03642"
            />
            
            {/* Text "Mortgage" */}
            <path 
              d="M140 90V130H150L170 105V130H180V90H170L150 115V90H140Z" 
              fill="#E03642"
            />
            <circle 
              cx="200" 
              cy="110" 
              r="20" 
              fill="#E03642"
            />
            <circle 
              cx="200" 
              cy="110" 
              r="10" 
              fill="white"
            />
            <path 
              d="M230 90H250C262 90 270 98 270 110C270 122 262 130 250 130H230V90Z" 
              fill="#E03642"
            />
            <path 
              d="M230 110H250" 
              stroke="white" 
              strokeWidth="3"
            />
            <path 
              d="M280 90V130H290C302 130 310 122 310 110C310 98 302 90 290 90H280Z" 
              fill="#E03642"
            />
            <path 
              d="M320 90H340V100H330V130H320V90Z" 
              fill="#E03642"
            />
            <path 
              d="M350 90H370V100H360V130H350V90Z" 
              fill="#E03642"
            />
            <path 
              d="M380 90H400L410 120H420L430 90H450L430 130H400L380 90Z" 
              fill="#E03642"
            />
            <path 
              d="M380 90H400L410 120H420L430 90H450L430 130H400L380 90Z" 
              fill="#E03642"
            />
          </svg>
        )}
      </div>
    </header>
  );
};

export default SurveyHeader;
