
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
        'flex items-center justify-between p-5 mb-4 rounded-full cursor-pointer transition-all',
        selected ? 'bg-[#eefaf3] border border-[#17a85e]' : 'bg-gray-50 hover:bg-gray-100',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <span className="mr-4 text-gray-700">{icon}</span>}
        <span className="text-lg font-medium">{label}</span>
      </div>
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center',
        selected ? 'bg-[#17a85e] border-[#17a85e]' : 'border border-gray-300'
      )}>
        {selected && <Check className="w-5 h-5 text-white" />}
      </div>
    </div>
  );
};

export default SurveyOption;
