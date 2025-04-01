
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface SurveyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  sensitive?: boolean;
}

const SurveyInput: React.FC<SurveyInputProps> = ({
  label,
  className,
  prefix,
  sensitive = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <div className="flex items-center mb-2">
          <label className="block text-gray-700">{label}</label>
          {sensitive && (
            <div className="ml-2 tooltip" title="This information is securely transmitted">
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
          )}
        </div>
      )}
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
