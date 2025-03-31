
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SurveyQuestion from '@/components/SurveyQuestion';
import SurveyOption from '@/components/SurveyOption';
import SurveyButton from '@/components/SurveyButton';
import SurveyInput from '@/components/SurveyInput';
import SurveyHeader from '@/components/SurveyHeader';
import SurveyPreloader from '@/components/SurveyPreloader';
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
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const currentQuestion = surveyQuestions[currentQuestionIndex];

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleBack = () => {
    if (currentQuestionIndex === 0) return;
    
    setAnimationState('out');
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev - 1);
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
                variant={currentQuestionIndex === 0 ? 'primary' : 'black'}
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
              label=""
              prefix={currentQuestion.prefix}
              placeholder={currentQuestion.placeholder}
              type={currentQuestion.inputType}
              value={answers[currentQuestion.id] || ''}
              onChange={handleInputChange}
            />
            <div className="mt-8">
              <SurveyButton
                variant="black"
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
                variant="black"
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
      <SurveyPreloader isLoading={loading} />
      
      <SurveyHeader />
      
      <main className="flex-1 flex flex-col overflow-hidden relative pt-4 pb-16">
        <div className="fixed top-[52px] left-0 w-full h-1 bg-gray-200 z-10">
          <div 
            className="h-full bg-survey-red transition-all duration-300" 
            style={{ 
              width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%` 
            }}
          />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-10">
          {currentQuestionIndex === 0 && (
            <div className="text-center mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Make a 0% down</h1>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">payment and skip the</h1>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">mortgage insurance.</h1>
              <h1 className="text-2xl sm:text-3xl font-bold">See if you qualify for a</h1>
              <h1 className="text-2xl sm:text-3xl font-bold">VA loan today!</h1>
            </div>
          )}
          
          <div className="w-full max-w-md mx-auto">
            <SurveyQuestion 
              title={currentQuestion.title} 
              animate={animationState}
              onBack={handleBack}
              showBackButton={currentQuestionIndex > 0}
            >
              {renderQuestion()}
            </SurveyQuestion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
