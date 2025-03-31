
import React from 'react';
import { cn } from '@/lib/utils';

interface SurveyQuestionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  animate?: 'in' | 'out' | 'none';
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  title,
  className,
  children,
  animate = 'none',
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
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      {children}
    </div>
  );
};

export default SurveyQuestion;
