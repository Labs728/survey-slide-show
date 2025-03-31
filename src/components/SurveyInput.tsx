
import React from 'react';
import { cn } from '@/lib/utils';

interface SurveyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

const SurveyInput: React.FC<SurveyInputProps> = ({
  label,
  className,
  prefix,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-500 text-lg">
            {prefix}
          </span>
        )}
        <input
          className={cn(
            'w-full bg-gray-50 rounded-lg py-4 px-4 text-lg',
            prefix && 'pl-8',
            'focus:outline-none focus:ring-2 focus:ring-survey-red/20 focus:border-survey-red',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default SurveyInput;
