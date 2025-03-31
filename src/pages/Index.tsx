import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SurveyQuestion from '@/components/SurveyQuestion';
import SurveyOption from '@/components/SurveyOption';
import SurveyButton from '@/components/SurveyButton';
import SurveyInput from '@/components/SurveyInput';
import { RefreshIcon, HomeIcon, MoneyIcon } from '@/components/icons/SurveyIcons';

const surveyQuestions = [
  {
    id: 'goal',
    title: "What's your goal?",
    type: 'options',
    options: [
      { id: 'refinance', label: 'Refinance', icon: <RefreshIcon /> },
      { id: 'buyHome', label: 'Buy a home', icon: <HomeIcon /> },
      { id: 'equity', label: 'Use my equity', icon: <MoneyIcon /> },
    ],
  },
  {
    id: 'homeValue',
    title: "What's an estimate of your current home value?",
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 250,000',
    prefix: '$',
  },
  {
    id: 'creditScore',
    title: 'How would you rate your credit score?',
    type: 'options',
    options: [
      { id: 'excellent', label: 'Excellent (720+)' },
      { id: 'good', label: 'Good (680-719)' },
      { id: 'fair', label: 'Fair (620-679)' },
      { id: 'poor', label: 'Poor (below 620)' },
    ],
  },
  {
    id: 'contact',
    title: 'How can we contact you?',
    type: 'form',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [animationState, setAnimationState] = useState<'in' | 'out' | 'none'>('in');
  const formRef = useRef<HTMLFormElement>(null);

  const currentQuestion = surveyQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value });
  };

  const isNextButtonDisabled = () => {
    if (currentQuestion.type === 'options') {
      return !answers[currentQuestion.id];
    } else if (currentQuestion.type === 'input') {
      return !answers[currentQuestion.id];
    } else if (currentQuestion.type === 'form') {
      if (formRef.current) {
        const nameInput = formRef.current.elements.namedItem('name') as HTMLInputElement;
        const emailInput = formRef.current.elements.namedItem('email') as HTMLInputElement;
        const phoneInput = formRef.current.elements.namedItem('phone') as HTMLInputElement;
        
        return !(nameInput?.value && emailInput?.value && phoneInput?.value);
      }
      return true;
    }
    return false;
  };

  const handleNext = async () => {
    if (currentQuestionIndex === surveyQuestions.length - 1) {
      if (formRef.current) {
        try {
          const formData = new FormData(formRef.current);
          Object.entries(answers).forEach(([key, value]) => {
            formData.append(key, value);
          });
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/thank-you');
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        }
      }
      return;
    }
    setAnimationState('out');
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnimationState('in');
    }, 300);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'options':
        return (
          <>
            {currentQuestion.options.map((option) => (
              <SurveyOption
                key={option.id}
                icon={option.icon}
                label={option.label}
                selected={answers[currentQuestion.id] === option.id}
                onClick={() => handleOptionSelect(option.id)}
              />
            ))}
            <div className="mt-8">
              <SurveyButton
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
              >
                Next
              </SurveyButton>
            </div>
          </>
        );
      
      case 'input':
        return (
          <>
            <SurveyInput
              label={currentQuestion.title}
              prefix={currentQuestion.prefix}
              placeholder={currentQuestion.placeholder}
              type={currentQuestion.inputType}
              value={answers[currentQuestion.id] || ''}
              onChange={handleInputChange}
            />
            <div className="mt-8">
              <SurveyButton
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
              >
                Next
              </SurveyButton>
            </div>
          </>
        );
      
      case 'form':
        return (
          <form ref={formRef} className="space-y-4">
            <SurveyInput
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
            <SurveyInput
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
            <SurveyInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              required
            />
            <div className="mt-8">
              <SurveyButton
                type="button"
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
              >
                Submit
              </SurveyButton>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-survey-black text-white p-4 text-center">
        <h1 className="text-xl font-bold">Mortgage Survey</h1>
      </header>
      
      <main className="flex-1 flex items-center justify-center overflow-hidden relative">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-survey-red transition-all duration-300" 
            style={{ 
              width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%` 
            }}
          />
        </div>
        
        {currentQuestion.id === 'goal' && (
          <div className="absolute top-12 left-0 right-0 px-4 mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Make a 0% down</h1>
            <h1 className="text-3xl font-bold mb-2">payment and skip the</h1>
            <h1 className="text-3xl font-bold mb-2">mortgage insurance.</h1>
            <h1 className="text-3xl font-bold mb-6">See if you qualify for a</h1>
            <h1 className="text-3xl font-bold">VA loan today!</h1>
          </div>
        )}
        
        <SurveyQuestion 
          title={currentQuestion.id !== 'goal' ? currentQuestion.title : ''} 
          animate={animationState}
        >
          {renderQuestion()}
        </SurveyQuestion>
      </main>
    </div>
  );
};

export default Index;
