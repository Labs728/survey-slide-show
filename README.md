
# Mortgage Survey Application

This is an animated survey application with a slide-based question interface. It features a responsive design that works well on mobile devices and includes a custom loading screen, navigation, and elegant transitions.

## Features

- Single-question-at-a-time interface with smooth slide animations
- Dynamically changing survey questions based on user's goal (Refinance, Buy a Home, or Use Equity)
- Progress indicator at the top of the survey
- Back button to revisit previous questions
- Mobile-responsive design
- Custom house preloader with animated progress bar
- Multiple question types (options, input fields, select dropdowns)
- Beautiful "Thank You" page after submission
- Form submission via Formspree

## Project Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Update the Formspree URL in `src/pages/Index.tsx` with your form ID
4. Start the development server:
```bash
npm run dev
```

## Configuring Formspree

1. Go to [Formspree](https://formspree.io/) and create a new form
2. Replace the `formspreeUrl` variable in `src/pages/Index.tsx` with your form endpoint URL
3. Test your submission to ensure data is being received properly

## Survey Flow

The application dynamically adjusts questions based on the user's goal selection:

1. All users start with the same initial question about their goal
2. Depending on selection (Refinance, Buy a Home, Use Equity), specific questions are presented
3. Each path collects relevant information needed for that particular mortgage process
4. All data is submitted to Formspree at the end of the survey

## Question Types

### Option Questions

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

### Input Questions

For questions requiring text/number input:

```javascript
{
  id: 'uniqueId',
  title: 'Your input question text here?',
  type: 'input',
  inputType: 'number', // or 'text', 'email', 'tel', etc.
  placeholder: 'Placeholder text',
  prefix: '$', // Optional prefix for the input
  sensitive: true, // Optional flag for sensitive data
}
```

### Select Questions

For dropdown selection questions:

```javascript
{
  id: 'uniqueId',
  title: 'Your dropdown question here?',
  type: 'select',
  options: [
    { id: 'option1', label: 'Option 1 Text' },
    { id: 'option2', label: 'Option 2 Text' },
    // Add as many options as needed
  ],
}
```

## Sensitive Information Handling

Questions collecting sensitive information (like SSN, account numbers) are marked with an alert icon. These fields should be properly secured during transmission with HTTPS.

## Form Submission

The form submission process:

1. Collects all question answers into a single object
2. Submits the data to Formspree endpoint
3. Shows success/error toast notification
4. Redirects to the "Thank You" page upon successful submission

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
