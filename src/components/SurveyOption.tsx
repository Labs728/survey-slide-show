
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SurveyOptionProps {
  icon?: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const SurveyOption: React.FC<SurveyOptionProps> = ({
  icon,
  label,
  selected,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-5 mb-4 bg-gray-50 rounded-lg cursor-pointer transition-all',
        'hover:bg-gray-100',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <span className="mr-4">{icon}</span>}
        <span className="text-lg font-medium">{label}</span>
      </div>
      <div className={cn(
        'w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center',
        selected ? 'border-survey-red' : ''
      )}>
        {selected && <Check className="w-4 h-4 text-survey-red" />}
      </div>
    </div>
  );
};

export default SurveyOption;
