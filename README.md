
# Mortgage Survey Application

A responsive, animated survey application built with pure HTML, CSS, and JavaScript. This application presents one question at a time with smooth slide animations between questions.

## Features

- Animated house preloader with progress bar
- Custom header with Rocket Mortgage branding
- Progress indicator showing survey completion percentage
- Animated transitions between questions
- Support for different question types:
  - Options selection (with icons)
  - Input fields (with optional prefix)
  - Form inputs
- Mobile responsive design
- Back button to navigate to previous questions
- Styled with a white, red, and black color scheme
- "Thank You" page after survey submission

## Project Structure

```
├── index.html        # Main HTML file with the application structure
├── styles.css        # CSS styles for the application
├── script.js         # JavaScript code for the survey functionality
└── lovable-uploads/  # Directory containing uploaded images
```

## Setup Instructions

1. Clone the repository or download the project files.
2. Ensure all images are placed in the correct directory:
   - Rocket Mortgage Logo (`/lovable-uploads/06f1ae34-1347-4c18-b83e-1a1565b1e48a.png`)
   - House image for preloader (`/lovable-uploads/5bb5bae0-0907-41a0-9436-99588a03e4a7.png`)
3. Open `index.html` in a web browser to view the application.

## How to Configure the Survey

The survey questions are defined in the `script.js` file as an array of question objects. You can modify this array to add, remove, or edit questions.

### Question Types

#### Options Question

```javascript
{
  id: 'uniqueId',
  title: 'Your question text here?',
  type: 'options',
  options: [
    { id: 'option1', label: 'Option 1 Label', icon: 'fa-solid fa-icon-name' },
    { id: 'option2', label: 'Option 2 Label', icon: 'fa-solid fa-icon-name' },
    // Add more options as needed
  ],
}
```

- `id` - Unique identifier for the question
- `title` - The question text shown to the user
- `type` - Must be `'options'` for selection questions
- `options` - Array of option objects:
  - `id` - Unique identifier for the option
  - `label` - Text displayed for the option
  - `icon` - (Optional) Font Awesome icon class

#### Input Question

```javascript
{
  id: 'uniqueId',
  title: 'Your question text here?',
  type: 'input',
  inputType: 'text', // or 'number', 'email', etc.
  placeholder: 'Placeholder text',
  prefix: '$', // Optional prefix for the input
}
```

- `id` - Unique identifier for the question
- `title` - The question text shown to the user
- `type` - Must be `'input'` for input field questions
- `inputType` - HTML input type (e.g., 'text', 'number', 'email')
- `placeholder` - Placeholder text for the input field
- `prefix` - (Optional) Symbol or text to show before the input value

#### Form Question

```javascript
{
  id: 'uniqueId',
  title: 'Your question text here?',
  type: 'form',
}
```

- `id` - Unique identifier for the question
- `title` - The question text shown to the user
- `type` - Must be `'form'` for form-based questions

The form question type is pre-configured with name, email, and phone fields. If you want different fields, you'll need to modify the `renderFormQuestion()` function in `script.js`.

### Form Submission

By default, the form submission is set up for demo purposes and doesn't actually send data to a server. To connect it to a backend:

1. Open `script.js`
2. Find the `handleSubmitClick()` function
3. Uncomment and modify the `fetch()` call to use your formspree endpoint or custom API
4. Customize the success and error handling as needed

## Customizing the Design

### Colors

The primary colors used in this project are:

- White (`#fff`) - Background and text areas
- Black (`#000` and `#333`) - Buttons and text
- Red (`#ef4444`) - Primary accent color and progress bar
- Green (`#22c55e`) - Selected option background

To change these colors, modify the relevant styles in the `styles.css` file.

### Fonts

The application uses the system font stack:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

To use a custom font:
1. Add the font import to the `<head>` section of `index.html`
2. Update the font-family in the CSS file

### Icons

The project uses Font Awesome for icons. If you want to add different icons:
1. Make sure you have the Font Awesome library linked in the `index.html` file
2. Choose icons from the [Font Awesome website](https://fontawesome.com/icons)
3. Update the icon classes in the question configuration

## Browser Compatibility

This application is designed to work in modern browsers. It uses standard HTML5, CSS3, and ES6+ JavaScript features. For older browser support, consider adding polyfills or using a transpiler like Babel.

## License

This project is provided as-is with no warranty. You are free to modify and use it for personal and commercial projects.

---

For any questions or issues, please open an issue in the repository.
