
// Survey Questions Data
const surveyQuestions = [
  {
    id: 'goal',
    title: "What's your goal?",
    type: 'options',
    options: [
      { id: 'refinance', label: 'Refinance', icon: 'fa-solid fa-arrows-rotate' },
      { id: 'buyHome', label: 'Buy a home', icon: 'fa-solid fa-house' },
      { id: 'equity', label: 'Use my equity', icon: 'fa-solid fa-dollar-sign' },
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
    id: 'propertyAddress',
    title: 'What is the property address?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 123 Main St, City, State',
  },
  {
    id: 'idNumber',
    title: 'What is your ID number?',
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. AB123456',
  },
  {
    id: 'contact',
    title: 'How can we contact you?',
    type: 'form',
  },
];

// State management
const state = {
  currentQuestionIndex: 0,
  answers: {},
  loading: true
};

// DOM elements references
const elements = {
  preloader: null,
  preloaderProgressBar: null,
  progress: null,
  questionContainer: null,
  welcomeMessage: null,
  thankYouPage: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM elements
  initElements();
  
  // Setup preloader
  simulateLoading();
  
  // Render the first question
  renderCurrentQuestion();
  
  // Update progress bar
  updateProgressBar();
});

// Initialize DOM element references
function initElements() {
  elements.preloader = document.getElementById('survey-preloader');
  elements.preloaderProgressBar = elements.preloader.querySelector('.progress-bar');
  elements.progress = document.getElementById('survey-progress');
  elements.questionContainer = document.getElementById('question-container');
  elements.welcomeMessage = document.getElementById('welcome-message');
  elements.thankYouPage = document.getElementById('thank-you-page');
}

// Simulate loading for the preloader
function simulateLoading() {
  setTimeout(() => {
    elements.preloaderProgressBar.style.width = '66%';
    
    setTimeout(() => {
      elements.preloaderProgressBar.style.width = '100%';
      
      setTimeout(() => {
        elements.preloader.style.display = 'none';
        state.loading = false;
      }, 500);
    }, 700);
  }, 700);
}

// Update the progress bar based on current question
function updateProgressBar() {
  const progressPercentage = ((state.currentQuestionIndex + 1) / surveyQuestions.length) * 100;
  elements.progress.style.width = `${progressPercentage}%`;
}

// Render the current question
function renderCurrentQuestion() {
  // Clear previous questions
  const previousQuestion = elements.questionContainer.querySelector('.question.active');
  if (previousQuestion) {
    previousQuestion.classList.remove('active');
    previousQuestion.classList.add('exit');
    setTimeout(() => {
      previousQuestion.remove();
    }, 300);
  }
  
  // Show/hide welcome message based on current question
  if (state.currentQuestionIndex === 0) {
    elements.welcomeMessage.style.display = 'block';
  } else {
    elements.welcomeMessage.style.display = 'none';
  }
  
  // Get current question
  const currentQuestion = surveyQuestions[state.currentQuestionIndex];
  
  // Create question element
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  setTimeout(() => {
    questionElement.classList.add('active');
  }, 10);
  
  // Create question header
  const questionHeader = document.createElement('div');
  questionHeader.className = 'question-header';
  
  // Add back button if not the first question
  if (state.currentQuestionIndex > 0) {
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    backButton.addEventListener('click', handleBackClick);
    questionHeader.appendChild(backButton);
  }
  
  // Add question title
  const questionTitle = document.createElement('h2');
  questionTitle.className = 'question-title';
  questionTitle.textContent = currentQuestion.title;
  questionHeader.appendChild(questionTitle);
  
  questionElement.appendChild(questionHeader);
  
  // Render question content based on type
  let contentElement;
  
  switch (currentQuestion.type) {
    case 'options':
      contentElement = renderOptionsQuestion(currentQuestion);
      break;
    case 'input':
      contentElement = renderInputQuestion(currentQuestion);
      break;
    case 'form':
      contentElement = renderFormQuestion();
      break;
    default:
      contentElement = document.createElement('div');
  }
  
  questionElement.appendChild(contentElement);
  
  // Add to container
  elements.questionContainer.appendChild(questionElement);
  
  // Update progress bar
  updateProgressBar();
}

// Render options type question
function renderOptionsQuestion(question) {
  const container = document.createElement('div');
  
  // Create options container
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';
  
  // Create each option
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.dataset.id = option.id;
    
    // Check if option is selected
    if (state.answers[question.id] === option.id) {
      optionElement.classList.add('selected');
    }
    
    // Add option icon if exists
    if (option.icon) {
      const iconElement = document.createElement('div');
      iconElement.className = 'option-icon';
      iconElement.innerHTML = `<i class="${option.icon}"></i>`;
      optionElement.appendChild(iconElement);
    }
    
    // Add option label
    const labelElement = document.createElement('div');
    labelElement.className = 'option-label';
    labelElement.textContent = option.label;
    optionElement.appendChild(labelElement);
    
    // Add click event
    optionElement.addEventListener('click', () => {
      handleOptionSelect(question.id, option.id);
      
      // Toggle selected class
      document.querySelectorAll(`.option`).forEach(el => {
        el.classList.remove('selected');
      });
      optionElement.classList.add('selected');
      
      // Move to next question after a short delay
      setTimeout(() => {
        handleNextClick();
      }, 500);
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  container.appendChild(optionsContainer);
  
  // Add next button
  const buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '2rem';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'survey-button';
  
  // Add primary class if first question
  if (state.currentQuestionIndex === 0) {
    nextButton.classList.add('primary');
  }
  
  nextButton.textContent = 'Next';
  nextButton.disabled = !state.answers[question.id];
  nextButton.addEventListener('click', handleNextClick);
  
  buttonContainer.appendChild(nextButton);
  container.appendChild(buttonContainer);
  
  return container;
}

// Render input type question
function renderInputQuestion(question) {
  const container = document.createElement('div');
  
  // Create input container
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'input-wrapper';
  
  // Add prefix if exists
  if (question.prefix) {
    const prefixElement = document.createElement('span');
    prefixElement.className = 'input-prefix';
    prefixElement.textContent = question.prefix;
    inputWrapper.appendChild(prefixElement);
  }
  
  // Create input element
  const input = document.createElement('input');
  input.className = 'survey-input';
  if (question.prefix) {
    input.classList.add('with-prefix');
  }
  input.type = question.inputType || 'text';
  input.placeholder = question.placeholder || '';
  input.value = state.answers[question.id] || '';
  
  // Add input event
  input.addEventListener('input', (e) => {
    handleInputChange(question.id, e.target.value);
    updateNextButtonState(nextButton, e.target.value);
  });
  
  inputWrapper.appendChild(input);
  inputContainer.appendChild(inputWrapper);
  container.appendChild(inputContainer);
  
  // Add next button
  const buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '2rem';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'survey-button';
  nextButton.textContent = 'Next';
  nextButton.disabled = !state.answers[question.id];
  nextButton.addEventListener('click', handleNextClick);
  
  buttonContainer.appendChild(nextButton);
  container.appendChild(buttonContainer);
  
  return container;
}

// Render form type question
function renderFormQuestion() {
  const container = document.createElement('div');
  
  // Create form
  const form = document.createElement('form');
  form.className = 'contact-form';
  
  // Name field
  const nameGroup = createFormGroup('name', 'Full Name', 'text', 'John Doe', true);
  form.appendChild(nameGroup);
  
  // Email field
  const emailGroup = createFormGroup('email', 'Email', 'email', 'john@example.com', true);
  form.appendChild(emailGroup);
  
  // Phone field
  const phoneGroup = createFormGroup('phone', 'Phone', 'tel', '(555) 123-4567', true);
  form.appendChild(phoneGroup);
  
  container.appendChild(form);
  
  // Add submit button
  const buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '2rem';
  
  const submitButton = document.createElement('button');
  submitButton.className = 'survey-button';
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', handleSubmitClick);
  
  // Initial validation
  function checkFormValidity() {
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const phoneInput = form.elements.phone;
    
    submitButton.disabled = !(nameInput.value && emailInput.value && phoneInput.value);
  }
  
  // Add input listeners to all inputs
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', checkFormValidity);
  });
  
  checkFormValidity();
  
  buttonContainer.appendChild(submitButton);
  container.appendChild(buttonContainer);
  
  return container;
}

// Helper function to create form groups
function createFormGroup(name, label, type, placeholder, required = false) {
  const group = document.createElement('div');
  group.className = 'form-group';
  
  const labelElement = document.createElement('label');
  labelElement.className = 'form-label';
  labelElement.htmlFor = name;
  labelElement.textContent = label;
  group.appendChild(labelElement);
  
  const input = document.createElement('input');
  input.className = 'survey-input';
  input.id = name;
  input.name = name;
  input.type = type;
  input.placeholder = placeholder;
  if (required) {
    input.required = true;
  }
  
  group.appendChild(input);
  
  return group;
}

// Event Handlers
function handleOptionSelect(questionId, optionId) {
  state.answers[questionId] = optionId;
}

function handleInputChange(questionId, value) {
  state.answers[questionId] = value;
}

function updateNextButtonState(button, value) {
  button.disabled = !value;
}

function handleNextClick() {
  if (state.currentQuestionIndex < surveyQuestions.length - 1) {
    state.currentQuestionIndex++;
    renderCurrentQuestion();
  }
}

function handleBackClick() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex--;
    renderCurrentQuestion();
  }
}

function handleSubmitClick() {
  // Get form data
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  if (form.checkValidity()) {
    // Collect form data
    const formData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      ...state.answers
    };
    
    // You can uncomment this to use formspree or replace with your own endpoint
    /*
    fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        showThankYouPage();
      } else {
        alert('There was an error submitting your survey. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting your survey. Please try again.');
    });
    */
    
    // For demo purposes, just show thank you page
    console.log('Survey submitted with data:', formData);
    showThankYouPage();
  } else {
    // Trigger browser's form validation
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.click();
  }
}

function showThankYouPage() {
  // Show the thank you page
  elements.thankYouPage.classList.remove('hidden');
}
