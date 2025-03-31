
import React from 'react';
import { cn } from '@/lib/utils';

interface SurveyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'black';
  children: React.ReactNode;
}

const SurveyButton: React.FC<SurveyButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'w-full py-4 px-6 rounded-full font-medium transition-all text-lg',
        variant === 'primary' ? 'bg-survey-red text-white hover:bg-survey-red/90' : 
        variant === 'black' ? 'bg-survey-black text-white hover:bg-black/90' :
        'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SurveyButton;
