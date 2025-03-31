
import React from 'react';
import { cn } from '@/lib/utils';

interface SurveyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
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
        variant === 'primary' ? 'bg-survey-black text-white hover:bg-opacity-90' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SurveyButton;
