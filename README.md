
# Mortgage Survey Application

This is an animated survey application with a slide-based question interface. It features a responsive design that works well on mobile devices and includes a custom loading screen, navigation, and elegant transitions.

## Features

- Single-question-at-a-time interface with smooth slide animations
- Progress indicator at the top of the survey
- Back button to revisit previous questions
- Mobile-responsive design
- Custom house preloader
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

## Customizing Styles

The application uses Tailwind CSS for styling. You can modify the colors, spacing, and other design elements by:

1. Editing the component files directly
2. Updating the theme colors in `tailwind.config.ts`
3. Adding custom CSS classes in `src/index.css`

## Implementation Details

### Animation

The slide animations are controlled by:

1. CSS animations defined in `src/index.css`
2. The `animationState` state variable in the Index component

### Navigation

- Forward navigation occurs when clicking the "Next" button
- Backward navigation uses the "Back" button added to the question component

### Form Submission

The form submission process:

1. Collects all question answers into a FormData object
2. Submits the data (currently simulated with a timeout)
3. Redirects to the "Thank You" page

## Adding New Features

### Custom Question Types

To add a new question type:

1. Add a new case in the `renderQuestion` function in `Index.tsx`
2. Create any necessary components
3. Update the `isNextButtonDisabled` function to handle validation for your new question type

### Custom Styling

The project uses a color palette of white, red, and black, with green for selected options. To modify:

1. Update the theme colors in `tailwind.config.ts`
2. Edit component styling directly in their respective files

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
- `SurveyPreloader`: Loading screen with house image
