
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
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Define the base survey questions
const baseQuestions = [
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
];

// Define the refinance specific questions
const refinanceQuestions = [
  {
    id: 'name',
    title: 'What is your full name?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. John Doe',
  },
  {
    id: 'email',
    title: 'What is your email address?',
    type: 'input',
    inputType: 'email',
    placeholder: 'e.g. john@example.com',
  },
  {
    id: 'contactInfo',
    title: 'What is your phone number?',
    type: 'input',
    inputType: 'tel',
    placeholder: 'e.g. (555) 123-4567',
  },
  {
    id: 'mailingAddress',
    title: 'What is your current mailing address?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123 Main St, City, State, ZIP',
  },
  {
    id: 'secondMortgage',
    title: 'Do you have a second mortgage on this property?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'veteran',
    title: 'Are you a veteran or active duty US military?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'workStatus',
    title: 'What is your work status?',
    type: 'select',
    options: [
      { id: 'fullTime', label: 'Full-time' },
      { id: 'partTime', label: 'Part-time' },
      { id: 'selfEmployed', label: 'Self-employed' },
      { id: 'retired', label: 'Retired' },
      { id: 'unemployed', label: 'Unemployed' },
    ],
  },
  {
    id: 'bank',
    title: 'Who do you have your bank with?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. Bank of America',
  },
  {
    id: 'accountNumber',
    title: 'What is your account number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'routingNumber',
    title: 'What is your routing number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'monthlyIncome',
    title: 'What is your monthly income?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 5000',
    prefix: '$',
  },
  {
    id: 'investments',
    title: 'Do you have any investments?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'bankruptcy',
    title: 'Have you had any bankruptcies in the last three years?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'propertyType',
    title: 'What is your property type?',
    type: 'select',
    options: [
      { id: 'singleFamily', label: 'Single Family Home' },
      { id: 'condo', label: 'Condo' },
      { id: 'townhouse', label: 'Townhouse' },
      { id: 'multiFamily', label: 'Multi-Family' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'propertyDescription',
    title: 'How would you describe your property?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 3 bedroom, 2 bath',
  },
  {
    id: 'refinanceReason',
    title: 'Why are you interested in refinancing?',
    type: 'select',
    options: [
      { id: 'lowerRate', label: 'Lower interest rate' },
      { id: 'shortenTerm', label: 'Shorten loan term' },
      { id: 'cashOut', label: 'Cash out equity' },
      { id: 'consolidateDebt', label: 'Consolidate debt' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'ssn',
    title: 'What is your Social Security Number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. XXX-XX-XXXX',
    sensitive: true,
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
    id: 'homeValue',
    title: "What's an estimate of your current home value?",
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 250,000',
    prefix: '$',
  },
  {
    id: 'mortgageRemaining',
    title: 'How much is left on your mortgage?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 150,000',
    prefix: '$',
  },
];

// Define the buy home specific questions
const buyHomeQuestions = [
  {
    id: 'name',
    title: 'What is your full name?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. John Doe',
  },
  {
    id: 'email',
    title: 'What is your email address?',
    type: 'input',
    inputType: 'email',
    placeholder: 'e.g. john@example.com',
  },
  {
    id: 'contactInfo',
    title: 'What is your phone number?',
    type: 'input',
    inputType: 'tel',
    placeholder: 'e.g. (555) 123-4567',
  },
  {
    id: 'mailingAddress',
    title: 'What is your current mailing address?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123 Main St, City, State, ZIP',
  },
  {
    id: 'propertyType',
    title: 'What property type are you looking for?',
    type: 'select',
    options: [
      { id: 'singleFamily', label: 'Single Family Home' },
      { id: 'condo', label: 'Condo' },
      { id: 'townhouse', label: 'Townhouse' },
      { id: 'multiFamily', label: 'Multi-Family' },
      { id: 'other', label: 'Other' },
    ],
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
    id: 'workStatus',
    title: 'What is your work status?',
    type: 'select',
    options: [
      { id: 'fullTime', label: 'Full-time' },
      { id: 'partTime', label: 'Part-time' },
      { id: 'selfEmployed', label: 'Self-employed' },
      { id: 'retired', label: 'Retired' },
      { id: 'unemployed', label: 'Unemployed' },
    ],
  },
  {
    id: 'bank',
    title: 'Who do you have your bank with?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. Bank of America',
  },
  {
    id: 'accountNumber',
    title: 'What is your account number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'routingNumber',
    title: 'What is your routing number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'monthlyIncome',
    title: 'What is your monthly income?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 5000',
    prefix: '$',
  },
  {
    id: 'investments',
    title: 'Do you have any investments?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'propertyDescription',
    title: 'How would you describe your ideal property?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 3 bedroom, 2 bath',
  },
  {
    id: 'veteran',
    title: 'Are you a veteran or active duty US military?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'buyingProcess',
    title: 'Where are you in the home buying process?',
    type: 'select',
    options: [
      { id: 'justStarting', label: 'Just starting to look' },
      { id: 'lookingAtHomes', label: 'Looking at homes' },
      { id: 'foundHome', label: 'Found a home' },
      { id: 'madeOffer', label: 'Made an offer' },
      { id: 'underContract', label: 'Under contract' },
    ],
  },
  {
    id: 'purchaseTimeline',
    title: 'When do you hope to purchase your home?',
    type: 'select',
    options: [
      { id: 'immediately', label: 'As soon as possible' },
      { id: 'oneToThreeMonths', label: '1-3 months' },
      { id: 'fourToSixMonths', label: '4-6 months' },
      { id: 'sevenToTwelveMonths', label: '7-12 months' },
      { id: 'moreThanYear', label: 'More than a year' },
    ],
  },
  {
    id: 'ssn',
    title: 'What is your Social Security Number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. XXX-XX-XXXX',
    sensitive: true,
  },
  {
    id: 'ownedBefore',
    title: 'Have you owned a home in the past three years?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'realEstateAgent',
    title: 'Are you currently working with a real estate agent?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'purchasePrice',
    title: 'What purchase price do you have in mind?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 300,000',
    prefix: '$',
  },
  {
    id: 'downPayment',
    title: 'How much do you plan to use for down payment?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 60,000',
    prefix: '$',
  },
  {
    id: 'bankruptcy',
    title: 'Have you had any bankruptcies in the last three years?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
];

// Define the equity specific questions
const equityQuestions = [
  {
    id: 'name',
    title: 'What is your full name?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. John Doe',
  },
  {
    id: 'email',
    title: 'What is your email address?',
    type: 'input',
    inputType: 'email',
    placeholder: 'e.g. john@example.com',
  },
  {
    id: 'contactInfo',
    title: 'What is your phone number?',
    type: 'input',
    inputType: 'tel',
    placeholder: 'e.g. (555) 123-4567',
  },
  {
    id: 'mailingAddress',
    title: 'What is your current mailing address?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123 Main St, City, State, ZIP',
  },
  {
    id: 'propertyType',
    title: 'What is your property type?',
    type: 'select',
    options: [
      { id: 'singleFamily', label: 'Single Family Home' },
      { id: 'condo', label: 'Condo' },
      { id: 'townhouse', label: 'Townhouse' },
      { id: 'multiFamily', label: 'Multi-Family' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'propertyDescription',
    title: 'How would you describe your property?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 3 bedroom, 2 bath',
  },
  {
    id: 'bank',
    title: 'Who do you have your bank with?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. Bank of America',
  },
  {
    id: 'accountNumber',
    title: 'What is your account number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'routingNumber',
    title: 'What is your routing number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123456789',
    sensitive: true,
  },
  {
    id: 'monthlyIncome',
    title: 'What is your monthly income?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 5000',
    prefix: '$',
  },
  {
    id: 'investments',
    title: 'Do you have any investments?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'secondMortgage',
    title: 'Do you have a second mortgage on this property?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'veteran',
    title: 'Are you a veteran or active duty US military?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'bankruptcy',
    title: 'Have you had any bankruptcies in the last three years?',
    type: 'options',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'ssn',
    title: 'What is your Social Security Number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. XXX-XX-XXXX',
    sensitive: true,
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
    id: 'cashOutAmount',
    title: 'How much cash are you wanting to take out?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 50,000',
    prefix: '$',
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
    id: 'mortgageRemaining',
    title: 'How much is left on your mortgage?',
    type: 'input',
    inputType: 'number',
    placeholder: 'e.g. 150,000',
    prefix: '$',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [animationState, setAnimationState] = useState<'in' | 'out' | 'none'>('in');
  const [loading, setLoading] = useState(true);
  const [surveyQuestions, setSurveyQuestions] = useState([...baseQuestions]);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Formspree URL - replace with your actual URL
  const formspreeUrl = "https://formspree.io/f/YOUR_FORM_ID";

  const progressPercentage = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
  const currentQuestion = surveyQuestions[currentQuestionIndex];

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Update survey questions based on goal selection
  useEffect(() => {
    if (answers.goal) {
      let updatedQuestions = [...baseQuestions];
      
      if (answers.goal === 'refinance') {
        updatedQuestions = [...baseQuestions, ...refinanceQuestions];
      } else if (answers.goal === 'buyHome') {
        updatedQuestions = [...baseQuestions, ...buyHomeQuestions];
      } else if (answers.goal === 'equity') {
        updatedQuestions = [...baseQuestions, ...equityQuestions];
      }
      
      setSurveyQuestions(updatedQuestions);
    }
  }, [answers.goal]);

  const handleOptionSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const isNextButtonDisabled = () => {
    if (!currentQuestion) return true;
    
    if (currentQuestion.type === 'options') {
      return !answers[currentQuestion.id];
    } else if (currentQuestion.type === 'input') {
      return !answers[currentQuestion.id];
    } else if (currentQuestion.type === 'select') {
      return !answers[currentQuestion.id];
    }
    return false;
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      
      if (response.ok) {
        toast.success("Form submitted successfully!");
        navigate('/thank-you');
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex === surveyQuestions.length - 1) {
      await handleFormSubmit();
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
    if (!currentQuestion) return null;

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
                {currentQuestionIndex === surveyQuestions.length - 1 ? 'Submit' : 'Next'}
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
                {currentQuestionIndex === surveyQuestions.length - 1 ? 'Submit' : 'Next'}
              </SurveyButton>
            </div>
          </>
        );

      case 'select':
        return (
          <>
            <Select onValueChange={handleSelectChange} value={answers[currentQuestion.id] || ''}>
              <SelectTrigger className="w-full bg-gray-50 rounded-lg py-4 px-4 text-lg">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-8">
              <SurveyButton
                variant="black"
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
              >
                {currentQuestionIndex === surveyQuestions.length - 1 ? 'Submit' : 'Next'}
              </SurveyButton>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SurveyPreloader isLoading={loading} />
      
      <SurveyHeader />
      
      <div className="w-full h-2 bg-gray-100">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden relative pt-4 pb-16">        
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-6">
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
              title={currentQuestion ? currentQuestion.title : ""}
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
