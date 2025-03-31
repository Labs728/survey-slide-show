
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface SurveyQuestionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  animate?: 'in' | 'out' | 'none';
  onBack?: () => void;
  showBackButton?: boolean;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  title,
  className,
  children,
  animate = 'none',
  onBack,
  showBackButton = false,
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto p-5',
        animate === 'in' && 'animate-slide-in',
        animate === 'out' && 'animate-slide-out',
        className
      )}
    >
      {showBackButton && onBack && (
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 mb-4 hover:text-gray-700 transition-colors"
          aria-label="Go back to previous question"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
      )}
      
      <h2 className="text-2xl sm:text-3xl font-medium mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default SurveyQuestion;
