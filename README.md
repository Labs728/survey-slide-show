
# Mortgage Survey Application

This is an animated survey application with a slide-based question interface. It features a responsive design that works well on mobile devices and includes a custom loading screen, navigation, and elegant transitions.

## Features

- Single-question-at-a-time interface with smooth slide animations
- Progress indicator at the top of the survey
- Back button to revisit previous questions
- Mobile-responsive design
- Custom house preloader with animated progress bar
- Multiple question types (options, input fields, forms)
- Beautiful "Thank You" page after submission

## Project Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Adding New Questions

The survey questions are defined in the `surveyQuestions` array in `src/pages/Index.tsx`. You can add, remove, or modify questions by editing this array.

### Question Types

#### Option Questions

For questions with multiple choices:

```javascript
{
  id: 'uniqueId',
  title: 'Your question text here?',
  type: 'options',
  options: [
    { id: 'option1', label: 'Option 1 Text', icon: <YourIconComponent /> }, // Icon is optional
    { id: 'option2', label: 'Option 2 Text' },
    // Add as many options as needed
  ],
}
```

Selected options will automatically be styled with green backgrounds and checkmarks.

#### Input Questions

For questions requiring text/number input:

```javascript
{
  id: 'uniqueId',
  title: 'Your input question text here?',
  type: 'input',
  inputType: 'number', // or 'text', 'email', etc.
  placeholder: 'Placeholder text',
  prefix: '$', // Optional prefix for the input
}
```

#### Form Questions

For multi-input form sections:

```javascript
{
  id: 'contactInfo',
  title: 'Contact information',
  type: 'form',
  // The form fields are defined in the renderQuestion function in Index.tsx
}
```

## Customizing the Preloader

The preloader component in `src/components/SurveyPreloader.tsx` displays a custom house image and an animated progress bar. You can:

1. Replace the house image by updating the image source
2. Adjust animation timing by modifying the setTimeout values
3. Change the styling of the progress bar using Tailwind classes

## Navigation Between Questions

- Forward navigation occurs when clicking the "Next" button
- Backward navigation uses the "Back" button to revisit previous questions
- Users can correct answers by navigating back and selecting different options

## Progress Indicator

The progress bar at the top shows how far the user has advanced in the survey:

1. It automatically updates based on the current question index
2. The width is calculated as: (currentIndex + 1) / totalQuestions * 100%
3. The color is set in the Progress component (default: primary color)

## Form Submission

The form submission process:

1. Collects all question answers into a FormData object
2. Submits the data (currently simulated with a timeout)
3. Redirects to the "Thank You" page

## Mobile Optimization

The application is designed to be fully responsive:

- Flexible layouts using Flexbox
- Media queries for different screen sizes
- Touch-friendly large buttons and input fields
- Proper spacing for mobile devices

## Important Components

- `SurveyQuestion`: Handles the question container and animations
- `SurveyOption`: Renders option-type questions with selection
- `SurveyInput`: Custom input fields with optional prefixes
- `SurveyButton`: Styled buttons for navigation
- `SurveyHeader`: The application header with logo
- `SurveyPreloader`: Loading screen with house image and progress bar
- `Progress`: UI component for progress indicators

## Adding Custom Icons

To add a custom icon for use in questions:

1. Create a new icon component in the `SurveyIcons.tsx` file
2. Import and use it in your question definition
